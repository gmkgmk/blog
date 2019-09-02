# 基础查询
/*
 语法:
 SELECT 查询列名 FROM 表面
 
 特点:
 
 1.查询列表可以是:表中的的字段,常量值,表达式,函数;
 2.查询的结果可以是一个虚拟的表格;
*/

USE myemployees;

#1.查询表中的单个字段
SELECT
	last_name 
FROM
	employees;
	
#2.查询表中的多个字段
SELECT
	last_name,
	salary,
	email 
FROM
	employees;
	
#3.查询所有字段
SELECT
	* 
FROM
	employees;
	
	#4.查询常量值
	SELECT 100;
	
	#5.查询表达式;
	SELECT 100%98;
	
	#6.查询函数
	SELECT VERSION();
	
	#7.起别名;
	/**
		1,便于理解;
		2.如果要查询的字段有重名的情况,使用别名可以区分开来;
	*/
	
	# 方式一:使用as
	SELECT 100%98 as 结果;
	SELECT last_name AS 姓,first_name AS 名 FROM employees;
	
	# 方式二:使用空格
	SELECT last_name 姓,first_name 名 FROM employees;
	
	#注:特殊名词加双引号
	
	
	#8.去重
	#案例:查询员工表里所有的部门编号
	SELECT DISTINCT department_id FROM employees;
	
	
	#9; +号的作用
	/*
	运算符
	如果转换失败则将字符型转换为0
	只要一方为null;则结果肯定为null;
	
	字符串拼接使用concat
	*/
	
	SELECT CONCAT(first_name,last_name) AS 姓名
	FROM employees;
	
	
	
