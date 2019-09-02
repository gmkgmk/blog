# 二.react点击事件系统-react



前面一篇总结了了解react点击事件需要知道的js基础知识:

1. dom2级事件(addEventListener)
2. 事件流(冒泡,捕获)
3. 事件委托
4. event对象(target,currentTarget)

这篇主要介绍react事件系统的组成(以点击事件为例)

那么,我们已经有了原生事件系统又为什么react 还需要实现一个事件系统呢?

官方代码注释阐述如下

> –*React**事件使用了事件委托的机制，一般事件委托的作用都是为了减少页面的注册事件数量，减少内存开销，优化浏览器性能，**React**这么做也是有这么一个目的，除此之外，也是为了能够更好的管理事件，实际上，**React**中所有的事件最后都是被委托到了* *document**这个顶级**DOM**上*
>
> –*既然所有的事件都被委托到了* *document**上，那么肯定有一套管理机制，所有的事件都是以一种先进先出的队列方式进行触发与回调*
>
> –*既然都已经接管事件了，那么不对事件做些额外的事情未免有些浪费，于是* *React**中就存在了自己的 合成事件**(**SyntheticEvent**)**，**合成事件由对应的* *EventPlugin**负责合成，不同类型的事件由不同的* *plugin**合成，例如* *SimpleEvent* *Plugin**、**TapEvent* *Plugin**等*
>
> –*为了进一步提升事件的性能，使用了* *EventPluginHub**这个东西来负责合成事件对象的创建和销毁*





##	react事件系统三个阶段

- **事件注册**
- **事件分发**
- **事件执行**



### 事件注册

1. 真实dom上面添加__reactInternalInstance开头的属性保存对应的虚拟dom;

2. 真实dom添加__reactEventHandlers开头的属性保存对应的事件



![image-20190726105613955](/Users/guo/Library/Application Support/typora-user-images/image-20190726105613955.png)

具体信息可以通过控制台打印当前节点信息看到(选择绑定事件的node,然后 [$0] 打印查看)

![image-20190726111348536](/Users/guo/Library/Application Support/typora-user-images/image-20190726111348536.png)

这里可以看到点击事件和虚拟Dom的详细信息,这两个信息都保存到了**真实dom**的属性上面,触发的时候只要能够获取到真实dom,就可以获取到节点信息;

3. 所有事件都会被委托到document上;

   收集到点击事件后,react会通过事件委托在document绑定事件,需要注意的是**react将事件是绑定到document上,并且是冒泡阶段,所以他应该是document里最后一个执行的事件,所有的原生事件都会先于react的绑定事件触发(绑定到document冒泡阶段的事件看绑定的选后顺序),如果原生事件调用了event.stoppropagation组织事件传播,那么react的事件也将不会触发,**



### 事件分发

1. 查找触发事件的DOM(event.target) => reactComponent(__ reactInternalInstance)

   1.因为已经在document上绑定了点击事件,所以每次点击document都会有事件触发,

   2.每次点击都可以获取事件的event对象,通过**event.target**对象可以获取到触发当前事件的节点,通过节点可以获取到对应的虚拟dom;

2. 开始事务(批量更新-isBatchingUpdates)

   接下来会开始一个事务,首先看一下什么是事务

> 事务（Transaction），一般是指要做的或所做的事情。在计算机[术语](https://baike.baidu.com/item/术语)中是指访问并可能更新数据库中各种[数据项](https://baike.baidu.com/item/数据项/3227309)的一个程序执行单元(unit)。事务通常由[高级数据库](https://baike.baidu.com/item/高级数据库/1439366)操纵语言或编程语言（如SQL，C++或Java）书写的[用户程序](https://baike.baidu.com/item/用户程序/7450916)的执行所引起，并用形如**begin transaction**和**end transaction**语句（或[函数调用](https://baike.baidu.com/item/函数调用/4127405)）来界定。事务由事务开始(**begin transaction**)和事务结束(**end transaction**)之间执行的全体操作组成。

​	简单的说就是开始一件事,由开始事件和收尾事件组成,其中会做一些操作;

事件系统里重要的一点就是isBatchingUpdates的改变,这个状态决定的是setState是否批量更新,也就是常说的setState是否异步;

回忆一下,**setState是在什么时候异步的?**

 a.生命周期里设置state;

 b.事件系统里设置state;

在事件触发的时候开启一个事务,这时候将isBatchingUpdates设置为true,当setState的时候发现这个变量为true就直接将setState操作加入队列,而不是立即执行,等到事务结束,isBatchingUpdates为true,才开始处理这个事件里面的setState操作,所以看到的表现就是setState为异步的,操作后面再次获取state仍然是没有更新的.

**需要注意的是在原生事件和在react事件里通过定时器setState(应该是包括微任务)是立即执行的,因为当触发的时候事务已经结束**

3. 获取组件事件

   在这个阶段,还会获取自身事件和父组件事件,组成一个数组,

   通过event.target获取到触发事件的节点,然后根据event.path获取触发节点到document节点的所有节点,然后通过真实节点上__reactEventHandlers可以获取绑定的所有事件



#### 事件执行

1. 生成合成事件 (选择适合的plugin)

   通过事件获取react对应提供的事件插件,不同的事件插件处理不同(一般是SyntheticEvent)



   SyntheticEvent具体做了什么如下(有道翻译直接翻译SyntheticEvent注释))

   > 1.合成事件由事件插件分派，通常是响应顶级事件委托处理程序。
   >
   > 2.这些系统通常应该使用池来减少垃圾收集的频率。系统应该检查“isPersistent”，以确定事件在被分派后是否应该释放到池中。需要持久事件的用户应该调用“persist”。
   >
   > 3.合成事件(和子类)通过规范浏览器特性实现DOM Level 3 events API。子类不一定要实现DOM接口;自定义特定于应用程序的事件也可以子类化它。



2. 从合成事件对象池中获取对象event

   a.react重写了event对象,里面是react自己实现的一些状态,他的属性和原生是一样的,如果想要查看原生的事件,可以通过event.nativeEvent获取原生的事件event对象

   b.event对象对preventDefault和stopPropagation也进行了对应的处理,因为是模拟事件系统,如果只是调用原生事件的preventDefault和stopPropagation无法达到需要的结果;

   c.每次使用后event对象会被放入事件池,避免每次点击都创建一个event对象,可以使用isPersistent避免回收,所以点击事件里通过异步获取event对象将全部为空

3. 拿到event对象,开始执行函数

   a.首先通过获得到的虚拟dom,循环获取父节点(可以通过查看元素,虚拟dom上有一个**dom.return**属性获取父组件),**这里获取到的是的react组件树**

   b.因为点击事件是绑定到document上面的,react通过**正反循**环节点列表,模拟了点击事件和冒泡事件;

   如果查询到节点上面有绑定对应的事件,然后执行(进入包裹容错等)



#### 执行后清理工作

​	执行后关闭事务,进行更新流程,和点击事件有关的:

1. event对象引用清理,event对象放入事件池(isPersistent)

2. isBatchingUpdates修改



