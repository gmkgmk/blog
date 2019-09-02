-- 常见的数据类型
/*
数值型:
		整型:
				TINYINT	1
				SMALLINT 2
				MEDIUMINT 3
				INT INTEGER 4
				BIGINT 8
		小数:
				定点型 
						DEC 8
						DECIMAL 8
				浮点数 
						FLOAT 4
						DOUBLE 8
字符型:
		较短的文本:CHAR, VARCHAR
		较长的文本:TEXT,BLOB(较长的二进制)

*/

/*
原则:
所选择的类型越简单越好,能保存数值的类型越小越好
*/

/*
一.整型
分类:
TINYINT	1
SMALLINT 2
MEDIUMINT 3
INT/INTEGER 4
BIGINT 8

特点:	
	1.如何设置无符号和有符号
	CREATE TABLE tab_int(
		ti INT UNSIGNED
	)
	
	如果不设置无符号默认都是有符号, 加  UNSIGNED 设置无符号
	
	2.插入的数值超过范围会报out of range 并插入临界值
	3.如果不设置长度,会有默认的长度,
	4.长度代表显示的是该列的最大宽度,如果不够可以用零填充,必须加ZEROFILL 自动填充零(加零ZEROFILL自动变为有符号)
*/

/*
二.小数
分类:
1.浮点型
FLOAT 4
DOUBLE 8
FLOAT(M,D)
DOUBLE(M,D)

2.定点型
DEC(M,D)
DECIMAL(M,D)

特点:
a.M:整数部位+小数部位    D:小数部位
如果超过,则加入临界值
b.M和D都可以省略
如果是DECIMAL,则M默认为10,D默认为0
如果是FLOAT和DOUBLE,则会根据插入的数值的精度来决定精度
c.定点型的精确度较高,如果要求较高,如货币运算等则考虑使用
*/

/*
三.字符型

较短的文本:
CHAR(M)
VARCHAR(M)

M代表最多的字符数,CHAR可以省略,默认为一,VARCHAR不能省略

CHAR 代表固定长度的字符
VARCHAR 代表可变长度的字符

CHAR 效率 高于 VARCHAR(如性别等使用CHAR)

较长的文本:
TEXT
BLOB(较大的二进制)


*/


/*
四.日期型
分类
date 	只保存日期
time 	只保存时间
year  只保存年
DATETIME	8 保存日期+时间
TIMESTAMP(受时区和版本影响,使用较多) 4 保存日期+时间
*/
CREATE TABLE tab_date(
	t1 DATETIME,
	t2 TIMESTAMP
)

INSERT INTO tab_date VALUES(now(),now())








