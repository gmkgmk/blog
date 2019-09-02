-- 视图

/*
含义:虚拟表,和普通表一样使用
一种虚拟存在的表,行和列的数据来自定义视图的查询中使用的表
并且是在使用视图时动态生成的,只保存了sql逻辑,不保存查询结果



*/

-- 例
CREATE VIEW v1
AS
SELECT name,age
FROM studnets s
INNER JOIN major m 
ON s.major = m.id

-- 一.创建视图

/*
语法:
CREATE VIEW 视图名
AS 
查询语句
*/

USE myemployees


-- 查询姓名号中包含a字符的员工名,部门名和工种信息
-- 1.创建视图
CREATE VIEW myV1
AS
SELECT last_name,department_name,job_title
FROM employees e
INNER JOIN departments d
ON e.department_id = d.department_id
INNER JOIN jobs j
ON e.job_id = j.job_id
-- 2.使用视图
SELECT * FROM myV1
WHERE last_name LIKE "%a%"


-- 2.视图修改

-- 方式一
/*
CREATE OR REPLACE VIEW 视图名
AS
查询语句;

*/
SELECT * FROM myV1

CREATE OR REPLACE VIEW myV1
AS
SELECT * 
FROM jobs

-- 方式二
/*
ALTER VIEW 视图名
AS
查询语句

*/

-- 3.视图删除

/*
语法:
DROP VIEW 视图名,视图名,...;
*/

-- 4.查看视图
DESC myV1

SHOW CREATE VIEW myV1


-- 5.视图更新

-- 插入

INSERT INTO myV1 VALUES('张无忌','Acc','front')

-- 修改

UPDATE myV1 SET last_name='张飞' WHERE last_name='张无忌'

-- 删除

DELETE FROM myV1 WHERE last_name='张飞'













