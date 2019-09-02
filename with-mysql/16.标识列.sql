#标识列
/*
又称为子增长列

含义:可以不用手动的插入值,系统提供默认的序列值

特点:
1.标式列不一定和主键搭配,但要求必须是一个key
2.一个表最多只有一个标识列
3.标示列的类型只能是数值型
4.标式列可以通过 SET auto_increment_increment = 3 设置步长
也可以手动插入设置起始值

*/
-- 一.创建表时设置标识列
CREATE TABLE tab_identity(
	id INT PRIMARY KEY auto_increment,
	NAME VARCHAR(20)
)


二.修改表时设置标识列
ALTER TABLE tab_identity MODIFY COLUMN id INT PRIMARY KEY auto_increment;

三.修改表时删除标识列
ALTER TABLE tab_identity MODIFY COLUMN id INT PRIMARY KEY;
