## 什么是 http 协议

http 协议又叫超文本传输协议,他和购房协议,租房协议一样都是一种协议,一般是一式两份或者多份,http 协议主要为了解决不同计算机之间语言不同无法相互识别的问题,

http 是基于请求和响应,他一般由客户端发出一个请求到服务器端的指定端口,一般是 80 或者 433;然后服务器收到请求后,会进行对应的响应;

请求部分分为请求行,请求头,空行,主体;相应部分分为相应行,相应头,空行,主体

请求行由请求方法 请求路径 请求协议这几个基本信息组成

请求头是以 key:value 的形式呈现的,这块是前端比较常用的信息,最基础的是必须要有 host 指定主机位置,然后如果是 post 请求的话,还需要指定 content-length 和 content-type 一般是 application/json,application/x-www-form-urlencode

_扩展剩余的请求头:cache-control expires e-tag last-modified cookie date content-encoding_

主体就是请求内容;

响应信息和请求信息差不多,就响应行的格式有差异,为协议,状态码,状态信息,其他大同小异

## 关于缓存

缓存分为强缓存和协商缓存
强缓存发生在请求之前,协商缓存发生在请求时

一般是由 expires 和 cache-control 控制
expires 是 http/1.0 版本出现:格式:周 日 月 年 时 分 秒 GMT: Sat 20 Oct 2018 00:00:00 GMT
对比当前时间是否超过缓存的时间,如果没有超过则使用的本地缓存,但是他是根据本地时间来进行校验,可能会发生缓存错误的情况

所以为了弥补缺陷从 http/1.1 新增了 cache-control,一起存在时优先级会先于 expires,现在大多数网页已经放弃 expires 该用 cache-control

常用的几个值有
no-store 不进行缓存
no-cache 不管本地资源是否过期都去服务器校验,(表明跳过强缓存，强制进入协商策略),仍然会缓存再本地
must-revalidate 如果本地资源有效则用本地资源,如果本地资源无效则进入协商策略
max-age 表示希望资源缓存多少秒
public/private 是否在代理服务器缓存 private 只在客户端缓存,public 会在客户端和代理服务器都缓存

如果强缓存命中则直接读取本地缓存并返回 200;

如果强缓存没有命中则进入协商缓存阶段

协商缓存需要向服务器发送请求

协商缓存由 ETag 和服务器上次修改时间决定
第一次请求时服务器相应头会返回 ETag 和 last-modified-since
第二次请求时客户端请求头会带上 if-modified-since 和 if-none-match 字段,他的值分别为 last-modified-since 和 ETag 的值;
用来在服务器端校验文件是否已经修改

ETag 的优先级高于 Last-Modified。

last-modified 是服务器文件最后修改时间,是产生于 http/1.0,因为他只能到秒级,如果更换太频繁的话没办法检测,所以 http/1.1 新增了 etag

如果协商缓存成功返回 304 和空的主体 则代表本地资源没有过期,直接使用本地资源
如果没有就读取服务器新的资源

扩展:
缓存分为按类型还可以分为

- 缓存存储策略
- 缓存过期策略
- 缓存对比策略

  在没有提供任何浏览器缓存过期策略的情况下，浏览器遵循一个*启发式缓存过期策略*：
  根据响应头中 2 个时间字段 **Date 和 Last-Modified** 之间的时间差值，取其值的 10%作为缓存时间周期。

## 常见的请求头

accept 头
host 服务器信息
date 时间
user-agent 客户端信息
content-type application/x-www-from-urlencode application/json 主体类型
content-length 主体长度
content-encoding 压缩方式
last-modified-since 协商缓存
if-none-match 协商缓存
expires 强缓存
Cache-Control 强缓存
server 服务器
Connection 连接状态
referer 防盗链
strict-transport-security 多少时间内必须使用 https 进行请求
