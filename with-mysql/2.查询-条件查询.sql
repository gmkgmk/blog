#条件查询;
/*

	SELECT 
		查询列表
	FROM
		表名
	WHERE
		筛选条件;
		
1,按条件表达式
条件运算符  > <  = != <> >= <=
2.逻辑表达式
逻辑运算符 && || ! 		
					and or not 
3.模糊查询
	like
		 语句:SELECT * FROM employees WHERE last_name LIKE '%a%'
		 特点:
				一般和通配符搭配使用
						通配符:
							% 任意多个字符,包含0个字符
							_ 任意单个字符   转译“_\_%”
							
	BETWEEN AND
		语句: SELECT * FROM employees WHERE BETWEEN 100 AND 200
		包含连接值
		
	IN
		语句:SELECT * FROM employees WHERE job_id IN("a,b,c,d")
		
		
	IS NULL(IS NOT NULL)

ESCAPE ---  指定转译符

安全等于 <=>


*/