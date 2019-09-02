/*

语法:
	CREATE TABLE 表名(
		列名 列的类型[(长度)约束],
		列名 列的类型[(长度)约束],
		...
		列名 列的类型[(长度)约束]
	)
	
	
*/

-- 案例:创建表
CREATE TABLE IF	NOT EXISTS book(
	ids INT,#编号
	bName VARCHAR(20),#图书名
	price DOUBLE,#价格
	authorId INT #作者编号
)
DESC book




-- 表的修改
/*
ALTER TABLE 表名 ADD|DROP|MODIFY|CHANGE COLUMN 列名 [列类型(约束)]
*/
-- 1.修改列名
ALTER TABLE book CHANGE COLUMN bName sName VARCHAR(20);

-- 2.修改列的类型
ALTER TABLE book MODIFY COLUMN sName INT;

-- 3.添加新列
ALTER TABLE book ADD COLUMN count INT; 

-- 4.删除列
ALTER TABLE book DROP COLUMN count;

-- 5.修改表名
ALTER TABLE book RENAME TO books;

DESC books


-- 表的删除

DROP TABLE IF EXISTS book

SHOW TABLES


-- 通用写法
DROP DATABASE IF EXISTS 旧库名;
CREATE DATABASE 新库名;

DROP TABLE IF EXISTS 旧表名;
CREATE TABLE 表名();


-- 表的复制
-- 1.仅仅复制表的结构

CREATE TABLE copy like book;

-- 2.复制表的结构+数据

CREATE TABLE copy
SELECT * FROM book;

-- 3.只复制部分数据
CREATE TABLE copy
SELECT id,au_name
FROM book
WHERE nation="中国"

-- 4.仅仅复制某些字段
CREATE TABLE copy
SELECT id,au_name
FROM book
WHERE 1=2;