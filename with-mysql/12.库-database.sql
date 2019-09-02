/*
数据定义语言

库和表的管理

一.库的管理
创建,修改,删除
二.表的管理
创建,修改,删除

创建:CREATE
修改:ALTER
删除:DROP



*/

-- 创建库
-- 语法:
-- CREATE DATABASE (IF NOT EXISTS) 库名
CREATE DATABASE IF NOT EXISTS books

-- 修改库
ALTER DATABASE books CHARACTER SET gbk

-- 删除库
DROP DATABASE IF EXISTS books;


