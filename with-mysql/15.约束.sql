#常见约束
/*
含义:一种限制,用于限制表中的数据,为了保证表中的数据的准确和可靠性


分类: 六大约束
		NOT NULL	非空约束,用于保证该字段的值不能为空
							比如姓名,学号等.
		DEFAULT   默认约束,用于保证该字段有默认值
							比如性别
		PRIMARY KEY 主键约束,用于保证该字段的值具有唯一性,并且非空
								比如学号,员工编号等.
		UNIQUE		唯一约束,用于保证该字段的值具有唯一性,但是可以为空
							比如座位号
		CHECK			检查约束[mysql中不支持],比如年龄,性别
		FOREIGN   外键,用于限制两个表的关系,用于保证该字段的值必须来自与主表的关联列的值
							在从表添加外键约束,用于引用主表中某列的值
							比如学生表的专业编号,员工表的部门编号

添加约束的时机:
	1.创建表时,
	2.修改表时,
		
约束的添加分类
	列级约束
				六大约束语法上都支持,但外键的约束没有效果
	表记约束
				除了非空,默认,其他都支持
		
*/

CREATE TABLE 表名(
	字段名  字段类型  列级约束,
	字段名  字段类型,
	表级约束
)


-- 一.创建表时添加约束

#1.添加列级约束

CREATE DATABASE studnets;

USE studnets


CREATE TABLE stuinfo(
	id INT PRIMARY KEY,#主键
	stuName VARCHAR(20) NOT NULL,#姓名
	gender CHAR(1)	CHECK(gender='男' OR gender='女'),#检查
	age INT DEFAULT 18,#默认
	majorId	INT REFERENCES major(id)
)



CREATE TABLE major(
	id INT PRIMARY KEY,
	majorName VARCHAR(20)
)

SHOW INDEX	FROM stuInfo


DROP TABLE	IF EXISTS stuInfo;


# 2.添加表级约束
/*
语法:在各个字段的最下面
[CONSTRAINT 约束名] 约束类型(字段名)


*/
CREATE TABLE  stuInfo(
	id 	INT,
	stuName VARCHAR(20),
	gender CHAR(1),
	seat INT,
	age	INT,
	majorId INT,
	
	CONSTRAINT pk PRIMARY KEY(id),#主键
	CONSTRAINT ug UNIQUE(seat),# 唯一键
	CONSTRAINT ck CHECK(gender='男' OR gender='女')#检查 
)


/*
外键
要求:
1.要求在从表设置外键关系
2.从表的外键列的类型和主表的关联列的类型要求一致或兼容,名称无要求
3.主键的关联键必须是一个key(一般是主键或唯一)
4.插入数据时,先插入主表再插入从表,删除数据时,应先删除从表再删除主表

*/


-- 二.修改表时添加约束

-- 1.添加非空约束
ALTER TABLE stuInfo MODIFY COLUMN stuName VARCHAR(20) NOT NULL
-- 2.添加默认约束 
ALTER TABLE stuInfo MODIFY COLUMN age INT DEFAULT 18;
-- 3.添加主键
ALTER TABLE stuInfo MODIFY COLUMN id INT PRIMARY KEY;
-- 4.添加唯一键
ALTER TABLE stuInfo MODIFY COLUMN id INT UNIQUE;
-- 5.添加外键
ALTER TABLE stuInfo ADD FOREIGN KEY(marjoId) REFERENCES major(id)

-- 三.修改表时删除约束

-- 1.删除非空约束
ALTER TABLE stuInfo MODIFY COLUMN stuName VARCHAR(20) NULL
-- 直接清空即可

















