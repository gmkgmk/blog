/*
一.插入语句

语法:
方式一
INSERT INTO 表名(列名,...)
VALUES(值1,...);
方式二
INSERT INTO 表名
SET 列名=值,列名=值,...


两种方式
1.方式一支持插入多行,方式二不支持
INSERT INTO students(id,NAME,sex)
VALUES(12,'张飞1',NULL),
(13,'张飞2',0),
(14,'张飞3',NULL),

2.方式一支持子查询,方式二不支持
INSERT INTO students(id,NAME,sex)
SELECT 15,'张飞4',1

*/

#1.插入的值的类型要与列的类型一致或兼容
#2.不可以为null的列必须插入值,可以为null的列是如何插入值?
#方式一:填充NULL
INSERT INTO students(id,NAME,sex)
VALUES(12,'张飞',NULL)
#方式二:不写列名
INSERT INTO students(id,NAME)
VALUES(12,'张飞')
#3.列的顺序可以颠倒,但是必须以一一对应
#4.列数和值的个数必须一致
#5.可以省略列名,默认所有列,而且列的顺序和表中列的顺序一致
INSERT INTO studens
VALUES(12,'张飞')


