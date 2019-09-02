/*
子查询
出现在其他语句中的select语句,称为子查询或者内查询 


分类 :
按位置分
	SELECT 后面
					标量子查询
	FROM 后面
					表子查询
	WHERE 或者 HAVING 后面  ⭐️
					标量子查询  (单行)✅
					列子查询    (多行)✅
					
					行子查询
					
			特点:
				1.子查询放在小括号内
				2.子查询一般放在条件的右侧
				3.标量子查询,一般搭配着单行操作符使用(> < >= <=  = <>)
					列子查询一般搭配多行操作符 (IN ANY/SOME ALL)
				4.子查询的执行优先于主查询执行,主查询条件用到了子查询的结果
	EXISTS 后面
					表子查询
					
					
按功能(结果集的行列不同)
	标量子查询(结果集只有一行一列)
	列子查询(结果集有一列多行)
	行子查询(结果集有一行多列)
	表子查询(结果集一般有多行多列)
*/


-- 一.在 WHERE 后面

-- 标量子查询
-- 案例 1:谁的工资比Abel高?
#第一步:查询Abel工资
SELECT salary
FROM employees
WHERE last_name = "Abel"
#第二部:查询员工信息:满足工资大于第一步的结果
SELECT * 
FROM employees
WHERE salary>(
	SELECT salary
  FROM employees
  WHERE last_name = "Abel"	
)

-- 可以支持多个子查询
使用 WHERE (查询一) AND (查询二)


-- 列子查询(多行子查询)
-- 案例1;返回location_id是1400或1700的部门中所有的员工姓名
#第一步:查询location_id是1400或者1700的部门编号
SELECT DISTINCT  department_id , location_id
FROM departments
WHERE location_id IN(1400,1700)

#第二步:查询员工姓名,要求部门号是第一步中的某一个
SELECT last_name
FROM employees
WHERE department_id IN(
	SELECT DISTINCT  department_id
	FROM departments
	WHERE location_id IN(1400,1700)
)


-- 行子查询(结果一行多列或者多行多列)
-- 案例:查询员工编号最小并且工资最高的员工信息
SELECT *
FROM employees
WHERE (employee_id,salary)=(
	SELECT MIN(employee_id),MAX(salary)
	FROM employees
)


-- 二.SELECT 后面

#案例:查询每个部门的员工个数

SELECT d.*, (
	SELECT COUNT(*) 
	FROM employees e
	WHERE e.department_id = d.department_id
) 个数
FROM departments d


#案例:查询员工号 = 102 的部门名
SELECT (
	SELECT department_name
	FROM departments d
	INNER JOIN employees e
	ON d.department_id = e.department_id
	WHERE e.employee_id = 102
) 部门名



-- 三.FROM 后面
-- 将子查询结果充当一张表,要求必须起别名
-- 案例:查询每个部门的平均工资的工资等级
SELECT avg_salary.*, j.grade_level
FROM (
	 SELECT AVG(salary) ag
	 FROM employees
	 GROUP BY employee_id
) avg_salary
INNER JOIN job_grades j
ON avg_salary.ag BETWEEN lowest_sal AND highest_sal

-- 四.放在EXISTS后面
-- EXISTS:是否存在
/*
语法:
EXISTS(完整的查询的语句)
结果:
1(存在)或者0
*/
SELECT EXISTS (SELECT employee_id FROM employees WHERE salary = 9000)




-- 练习题:
1.查询和Zlotkey相同部门的员工姓名与工资

SELECT last_name 员工姓名, salary 工资
FROM employees 
WHERE department_id = (
	SELECT department_id
	FROM employees
	WHERE last_name = "Zlotkey"
)

2.查询工资比公司平均工资水平高的员工的员工号,姓名和工资


SELECT job_id,last_name,salary
FROM employees
WHERE salary > (
	SELECT AVG(salary)
	FROM employees
)

3.查询各部门中工资比本部门平均工资高的员工的员工号,姓名和工资
SELECT job_id,last_name,salary

SELECT job_id,last_name,salary, e.department_id
FROM employees e
INNER JOIN(
	SELECT AVG(salary) sa, department_id
	FROM employees
	GROUP BY department_id
) ag
ON e.department_id = ag.department_id
WHERE ag.sa<e.salary


4.查询和姓名中包含字母u的员工在相同部门的员工的员工号和姓名

SELECT last_name,employee_id
FROM employees
WHERE	department_id  IN (
	SELECT DISTINCT department_id
	FROM employees
	WHERE last_name LIKE "%u%"
)



5.查询在部门的location_id为1700的部门工作的员工的员工号
SELECT employee_id
FROM employees
WHERE department_id = ANY(
	SELECT DISTINCT department_id
	FROM  departments d
	WHERE d.location_id = 1700
)
ORDER BY employee_id DESC

6.查询管理者是King的员工姓名和工资

SELECT last_name,salary
FROM employees
WHERE manager_id IN (
	SELECT employee_id
	FROM employees
	WHERE last_name = "K_ing"
)

7.查询工资最高的员工的姓名,要求first_name和last_name显示为一列,列名为姓.名

SELECT CONCAT(first_name,last_name) "姓.名"
FROM employees
WHERE salary = (
	SELECT MAX(salary)
	FROM employees
)






