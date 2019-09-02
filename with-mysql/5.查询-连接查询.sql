/*

多表查询

笛卡尔乘积
表一有M行,表二有N行,结果为M*N行

发生原因:没有连接条件

按年代分
	92连接
	99连接:所有内连+外连接(左+右)+交叉连接

按功能分类
	内连接 INNER
		等值连接
		非等值连接
		自连接
	外连接
		左外连接 LEFT OUTER
		右外连接 RIGHT OUTER
		全外连接 FULL OUTER
交叉连接  CROSS

99语法:
		SELECT 查询列表
		FROM 表1 别名 [连接条件]
		JOIN 表2 别名 on 连接条件
		WHERE 筛选条件
		GROUP BY
		HAVING
		ORDER BY
*/

-- 一.92标准
-- 1.等值连接
/*
1.多表等值连接的结果为多表的交集部分
2.至少需要n-1个连接条件
3.多表顺序没有要求
4.一般要给表区别名
5.可以搭配所有条件,排序,分组等
*/




#案例1:查询女神名称对应的男生
SELECT Name,boyName
FROM boys,beauty
WHERE beauty.boyFriend_id = boyds.id

#案例2:查询员工们和对应的部门名

SELECT first_name 姓, last_name 名, salary 工资,department_name 部门
FROM	employees,departments
WHERE employees.department_id = departments.department_id

/*
可以起名别,提高语句简介度,区分重名字段
区别名后,原名不可使用
*/
#案例3:查询员工名,工种号,工种名(��名
SELECT e.last_name 员工姓名,j.job_id 工种抬头, j.job_title 工种名
FROM employees e,jobs j
WHERE e.job_id = j.job_id


#加筛选
#案例:有奖金的员工名,部门名
SELECT last_name 员工名, department_name 员工名,commission_pct 奖金率

FROM departments d, employees e
WHERE e.department_id = d.department_id
AND e.commission_pct IS NOT NULL

#案例 查询城市名中第二个字符为o的部门名和城市名
SELECT department_name 部门名, city 城市名
FROM departments d, locations l
WHERE d.location_id = l.location_id
AND city LIKE "_o%"

#增加分组
#案例:查询每个城市的部门个数
SELECT city 城市, COUNT(*) 数量
FROM locations l, departments d
WHERE l.location_id = d.location_id
GROUP BY city

#案例:查询有奖金的每个部门的部门名和部门的领导编号和该部门的最低工资
SELECT department_name 部门名, d.manager_id 领导编号, MIN(salary) 最低工资
FROM departments d,employees e
WHERE e.department_id = d.department_id
AND e.commission_pct IS NOT NULL
GROUP BY department_name, d.man


#排序
#案例:查询每个工种的工种名和员工的个数,并且按员工个数降序
SELECT job_title 工种名, COUNT(*) 个数
FROM jobs j, employees e
WHERE j.job_id = e.job_id
GROUP BY j.job_title
ORDER BY COUNT(*) DESC



#案例:查询员工名,部门名,所在城市
SELECT last_name 员工名, department_name 部门名, city 城市
FROM employees e, departments d, locations l
WHERE e.department_id = d.department_id
AND l.location_id = d.location_id
AND city LIKE "s%"







#2.非等值连接
#案例:查处员工的工资和工资级别

SELECT salary 工资, grade_level 工资等级
FROM employees e, job_grades j
WHERE salary BETWEEN j.lowest_sal AND j.highest_sal
AND grade_level LIKE "A"


#3.自连接
#案例:员工名和上级的名称
SELECT e.employee_id 员工id,e.last_name 员工姓名, m.employee_id 领导id, m.last_name 领导姓名
FROM employees e, employees m
WHERE e.manager_id = m.employee_id



#练习题
#一.显示员工表的最大工资,工资平均值
SELECT MAX(salary) 最大工资, AVG(salary) 工资平均值
FROM employees
 
 #二.查询员工表的employee_id,job_id,last_name,按department_id降序,salary升序
 SELECT employee_id,job_id,last_name,salary,department_id
 FROM employees
 ORDER BY department_id DESC, salary ASC
 
 
 #三.查询员工表的job_id中包含a和e的,并且a在e前面
 SELECT job_id
 FROM employees
 WHERE job_id LIKE "%a%e%"


#二.99标准

-- 一)等值连接
-- 1.查询员工名和部门名
SELECT last_name department_name
FROM employees e
INNER JOIN departments d
ON e.department_id = d.department_id
-- 2.查询名字中包含e的员工名和工种名
SELECT last_name 员工名, e.job_id 工种名
FROM employees e
INNER JOIN jobs j
ON e.job_id = j.job_id
WHERE last_name LIKE "%e%"
-- 3.查询部门个数大于3的城市名和部门个数
SELECT COUNT(department_id) 部门个数, city 城市名
FROM locations l
INNER JOIN departments d
on d.location_id = l.location_id
GROUP BY city
HAVING COUNT(department_id) > 3



#二.外连接
应用场景:用于查询一个表中有另一个表没有的记录
特点
1.外连接的查询结果为主表的所有记录
		如果从表中有和他匹配的,则显示从表的值
		如果从表中没有和他匹配的,则限制null
		外连接的查询结果 = 内连接结果+主要中有而从表没有的记录
2.左外连接	left  JOIN左边的是主表
  右外连接 right JOIN右变的是主表
3. 左外右外交换两个表顺序可以达到同样效果 
4. 全外连接 = 内连接结果 + 表1有表2没有 + 表2有表1没有的 FULL OUTER
5. 交叉连接 笛卡尔乘积 CROSS


