/*
事务:
一个或一组sql语句组成一个执行单元,这个执行单元要么全部执行,要么全部不执行

特性:ACID
1.原子性
事务是不可再拆分的,要么都发生,要么都不发生
2.一致性
事务必须使数据库从一个一致性的状态变幻到另一个一致性状态
3.隔离型
事务执行不受其他事务的干扰
4.持久性
事务一旦提交,操作是永久性的


事务的创建:

隐式的事务:事务没有明显的开启和结束的标记
比如 INSERT, UPDATE, DELETE 语句

显示的事务:事务有明显的开启和结束的标记
前提:必须先设置自动提交功能为禁用

SET autocommit = 0;

步骤1:开启事务

SET autocommit = 0;
START TRANSACTION 可选的

步骤2:编写事务中的sql语句(SELECT, INSERT, UPDATE, DELETE)
语句1;
语句2;
...

步骤3:结束事务
COMMIT 提交事务
ROLLBACK 回滚事务

SAVEPOINT 节点名,设置节点


事务的隔离级别:
											脏读   幻读  不可重复读
READ UNCOMMITTED			✅     ✅     ✅
READ COMMITTED        ❌     ✅     ✅
REPEATABLE READ     	❌     ❌     ✅
SERIALIZABLE					❌     ❌     ❌


mysql中默认REPEATABLE READ  
oracle 中默认READ COMMITTED  

查看隔离级别
SELECT @@tx_isolation
设置隔离级别
SET SESSION|GLOBAL  TRANSACTION ISOLATION LEVEL 隔离级别


*/

-- 查看引擎
SHOW ENGINES


CREATE TABLE accout(
	id INT PRIMARY KEY auto_increment,
	balance INT DEFAULT 0,
	username VARCHAR(20) NOT NULL
)

INSERT INTO accout VALUES(10,1000,'张无忌')
INSERT INTO accout VALUES(20,1000,'刘德华')

SELECT * FROM accout
-- 使用步骤
SET autocommit = 0;
START TRANSACTION;

UPDATE accout SET balance = 1000 WHERE id=10;
UPDATE accout SET balance = 1000 WHERE id=20;

ROLLBACK
COMMIT ;


-- SAVEPOINT
SET autocommit=0;
START TRANSACTION;
DELETE FROM accout WHERE id=10;
SAVEPOINT a; #设置保存点 
DELETE FROM accout WHERE 	id=20;
ROLLBACK TO a; #回滚到保存点








