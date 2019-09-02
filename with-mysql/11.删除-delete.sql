/*

方式一:
	DELETE
	
	1.单表的删除
		DELETE FROM 表名 WHERE 筛选条件
	2.多表的删除
	
	92语法
		DELETE 表1的别名,表2的别名
		FROM 表1 别名,表2 别名
		WHERE 连接条件
		and 筛选条件
	
	99语法
		DELETE 表1的别名,表2的别名
		FROM 表1别名
		INNER|LEFT|RIGHT| JOIN 表2 别名
		ON 连接条件
		WHERE 连接条件
		and 筛选条件
	
方式二
	TRUNCATE TABLE 表名

*/