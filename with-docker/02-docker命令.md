# 二.docker 命令

## 镜像

### docker images

Options:

-a : 列出本地所有的镜像(含中间镜像层)

-q:只显示镜像 ID.

--digests:显示镜像的摘要信息

--no-trunc:显示完整的镜像信息

### docker search :从 docker 仓库查询 docker 镜像

options :

-s number(点赞数): docker search -s 30 nginx 查找点赞数超过 30 的 nginx 镜像

--no-trunc:不截断输出

--automated :只列出 annotated build 类型的镜像

#### docker pull 某个 xxx 镜像的名字:[版本号]

docker pull nginx === docker pull nginx:latest(没有版本号代表最新版本)

#### docker rmi 某个 xxx 镜像的名字:[版本号]

docker rmi -f 镜像 ID :删除单个

docker rmi -f 镜像名 1:TAG 镜像名 2:TAG:删除多个

docker rmi -f \$(docker images -qa):删除全部

### 容器:(简易版的 Linux 环境)

**有镜像才能创建容器,这是根本前提**

新建并启动容器 : **docker run [OPTIONS] IMAGE [COMMAND] {ARG...]**

OPTIONS:

--name = '容器新名字':为容器制定一个名称

-d:后台运行容器,并返回容器 ID,也即启动守护式容器

-i:以交互模式运行容器,通常与-t 同时使用

-t:为容器重新分配一个伪输入终端;通常与-i 同时使用;

-P:随机端口映射;

-p:指定端口映射,有以下四种格式

​ ip:hostPort:containerPort

​ ip::containerPort

​ hostPort:containerPort

​ containerPort

### _启动式交互_

docker run **-it** --name serverName imagesName

### 列出所有正在运行的所有容器:**docker ps [OPTIONS]**

OPTIONS:

-a: 列出当前所有正在运行的容器+历史上运行过的

-i:显示最近创建的容器

-n N:显示最近 N 个创建的容器

-q :静默模式,只显示容器编号

--no-trunc:不截断输出

### 退出容器

1. exit 容器停止退出
2. Ctrl(Control) + Q + p 容器不停止退出

### 启动容器

docker start 容器 ID

### 重启容器

docker restart 容器 ID

### 停止容器

docker stop 容器 ID

### 强制关闭容器

docker kill 容器 ID

### 删除已停止的容器

docker rm 容器 ID 删除已关闭的

docker rm -f 容器 ID 删除未关闭的

docker rm -f \$(docker ps -qa) 删除全部

docker ps -a -q | xargs docker rm
