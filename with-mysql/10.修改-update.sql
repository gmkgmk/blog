/*
1.修改单表的记录

语法:
UPDATE 表名
SET 列=新值,列=新值,...
WHERE 筛选条件


2.修改多表的记录

语法:
	92语法:
		UPDATE 表1 别名,表2 别名
		SET 列=值,...
		WHERE 连接条件
		AND 筛选条件
		
	99语法:
		UPDATE 表1 别名
		INNER|LEFT|RIGHT| JOIN 表2 别名
		ON 连接条件
		set 列=值...
		WHERE 筛选条件

*/