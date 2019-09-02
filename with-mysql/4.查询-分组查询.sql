/**

分组查询:

语法
		SELECT 分组函数, 列(要求出现在group by 的后面)
		FROM 表名
		[WHERE]
		GROUP BY 分组的列表1,分组的列表2
		[ORDER BY]

要求
		查询列表必须特殊,要求是分组函数和GROUP BY后出现的字段
		
		HAVING 分组查询后再条件筛选
	
		也可以添加排序
*/

#案例:按员工姓名的长度分组,查询每一组的员工个数,筛选员工个数>5的有哪些
SELECT  COUNT(*), LENGTH(last_name) len_name
FROM employees
GROUP BY len_name
HAVING COUNT(*) >5

# 按多个字段分组
# 查询每个部门每个工种的员工的平均工资
SELECT AVG(salary),department_id,job_id
FROM employees
GROUP BY department_id,job_id

-- 添加排序
-- 案例:查询每个部门每个工种的员工的平均工资,并且按平均工资的高低排序

SELECT AVG(salary),department_id,job_id
FROM employees
WHERE department_id IS NOT NULL
GROUP BY job_id,department_id
HAVING AVG(salary)>10000
ORDER BY AVG(salary) DESC









