/*
分页查询
语法:
		SELECT 查询列表
		FROM 表
		[JOIN type JOIN 表2
		ON 连接条件
		WHERE 筛选条件
		GROUP BY 分组字段
		HAVING 分组后的筛选
		ORDER BY 排序的字段]
		LIMIT [OFFSET],size;
		
		
		OFFSET 要显示条目的起始索引(起始索引从0开始)
		size 要显示的条目个数
		
特点:
	1.LIMIT 语句放在查询语句的最后
	2.公式
		要显示的椰树 page,每页条目数size
			SELECT 查询列表
			FROM 表
			LIMIT (page-1)*size,size
	
*/

# 案例1:查询前五条员工信息
SELECT * FROM employees LIMIT 0,5
SELECT * FROM employees LIMIT 5


# 案例2:查询第11条--第25条
SELECT * FROM employees LIMIT 10,15



# 案例3:有奖金的员工信息,并且工资较高的前10名显示出来
SELECT * FROM employees
WHERE commission_pct IS NOT NULL 
ORDER BY salary DESC
LIMIT 10









