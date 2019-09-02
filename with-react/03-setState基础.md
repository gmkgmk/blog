

# setState基础



```js
setState(updater[, callback])
```

这是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式



### 同步异步

众所周知,setState更新状态默认情况下并不是立即更新,**而是进行批处理**,也就是人们常说的异步,同步;

是否立即更新主要是isBatchingUpdates变量所决定

**当isBatchingUpdates为true,setState不会立即更新,会将队列放入一个数组**
**当isBatchingUpdates为false时,会立即更新待更新的队列**

一般表现为在生命周期钩子和react事件函数中,batchUpdates为true,也就是不会立即更新,

而定时器,原生事件函数里面batchUpdates为false会立即更新;



```js
 class Username extends React.Component {
        constructor() {
          super();
          this.state = {
            num: 0
          };
        }
        onClickHandle(e) {
          this.setState({
            num: this.state.num + 1
          });
          console.log(this.state.num)
        }
 }
```

如上所示,log出来的的值永远会是setState之前的值,因为log的时候isBatchingUpdates为true,state并未更新,只是加入队列,所以console出来的是点击事件开始之前的值;

### 带来的好处

**无论setState()你在React事件处理程序中执行多少组件调用多少次，它们在事件结束时只会产生一次重新渲染**。这样会大大提升**性能**.

### 合并顺序

更新始终**按其发生的顺序浅层合并**。因此，如果第一次更新是`{a: 10}`，第二次更新，`{b: 20}`第三次更新`{a: 30}`，则呈现状态将是`{a: 30, b: 20}`。对同一状态键的更新更新



再看一看下面这个题

![image-20190731112253505](/Users/guo/work/overNote/image/image-20190731112253505.png)

log出来的值为0023

第一次log因为isBatchingUpdates为true(生命周期钩子中),state并未立即更新,所以log出来的为生命周期钩子开始之前的state,所以为0;

```js
setState({val:0+1})
```

第二次log同第一次一样

```js
setState({val:0+1})
```

第三次log 的时候生命周期已经结束(定时器为一下宏任务,所以isBatchingUpdates为false),这时能并不是批量更新,而是立即更新.所以能获取到最新的值;

```js
setState({val:1+1})
```

第四次log同第三次

```js
setState({val:2+1})
```

所以结果为0023;



所以setState一个对象不一定是获取到最新的值

但是如果需要每次都获取最新的值该怎么做呢?

```js
setState(updater[, callback])
```

这个时候就应该使用第二种方式,根据函数获取最新的值

```js
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```

通过函数可以获取到最新的state和props,就可以解决这个问题

上面的问题可以改一下

![image-20190731114922569](/Users/guo/work/overNote/image/image-20190731114922569.png)

log出来的值为0034;

因为第一二次setState都获取到了最新的值,都对state进行了加一的操作(但是他仍然是批量更新的)

**但是为什么会出现这样的效果呢,明明都是在事务之中,都是批量更新,出现的情况却不同?**

试想一下,在一个点击事件中,有新的setState就加入一个数组;

```js
this.setState({value:value+1}) ===> [{value:value+1}]
this.setState({value:value+1}) ===> [{value:value+1},{value:value+1}]
```

如果是函数,则如下

```js
this.setState({value:value+1}) ===> [{value:value+1}]
this.setState({value:value+1}) ===> [{value:value+1},{value:value+1}]

//函数
this.setState(state => ({num: state.num + 1}));
===> [{value:value+1},{value:value+1},callBack]

this.setState(state => ({num: state.num + 1}));
===> [{value:value+1},{value:value+1},callBack,callBack]
```

**将函数加入数组,但是并不是立即执行,等待事务结束(点击事件处理或者钩子函数处理结束后),再去循环这个数组,设置state的值**

获取state的过程

```js
function getStateFromUpdate(workInProgress, queue, update, prevState, nextProps, instance) {
  switch (update.tag) {
    case ReplaceState:
      //other
    case CaptureUpdate:
    	// other
    case UpdateState:
      {
        var _payload2 = update.payload;
        var partialState = void 0;
        if (typeof _payload2 === 'function') {
          // Updater function
          partialState = _payload2.call(instance, prevState, nextProps);
        } else {
          // Partial state object
          partialState = _payload2;
        }
        if (partialState === null || partialState === undefined) {
          // Null and undefined are treated as no-ops.
          return prevState;
        }
        // Merge the partial state and the previous state.
        return _assign({}, prevState, partialState);
      }
    case ForceUpdate:
      {
        hasForceUpdate = true;
        return prevState;
      }
  }
  return prevState;
}

```



可以看到每次合并state的时候,如果是函数,则会将prevState, nextProps拿进去计算,如果是对象,则直接通过Object.assign浅合并,如果只是空调用(没有返回值),则返回上一次state的值.