/*
语法:SELECT 函数名(参数列表) FROM 表

1单行函数
如:concat length ifnull
2.分组函数
功能:用于统计(聚合函数)



单行函数

length :字节长度
upper,lower大小写
substr 索引从一开始,截取字符长度
instr 返回第一次出现的起始索引,如没有返回0
trim 去除空格或者指定字符 trim('a' FROM 'aaa123aaa')
lpad 用制定的字符实现左填充指定长度,唱过从右边截断
rpad 右填充 同上,相反;
replace 替换

日期函数
STR_TO_DATE(str,format)
DATE_FORMAT(date,format)
DATEDIFF(expr1,expr2)

流程控制
if函数
IF(expr1,expr2,expr3)

case 函数
 CASE case_value
	WHEN when_value THEN
		statement_list
	ELSE
		statement_list
END CASE;

 */
