// 1.instance
const myInstance = (left, right) => {
  // getPrototypeOf
  const proto = left.prototype
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) return true
    proto = proto.prototype
  }
}

// 2.new
const myNew = (fn, ...rest) => {
  const instance = Object.create(fn.prototype)
  const result = fn.apply(instance, ...rest)
  return typeof result === 'Object' ? result : instance
}

// 3.Object.assign
const myObjectAssign = (baseObj, ...rest) => {
  const result = Object.create(baseObj)
  rest.forEach((obj) => {
    const keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)]

    keys.forEach((key) => {
      result[key] = obj[key]
    })
  })
  return result
}

// 4.bind
const myBind = (thisArg, ...rest) => {
  const func = this
  const bindFunc = function (...args) {
    if (new.target) {
      const instance = func.prototype
      const result = func.apply(instance, [...rest, ...args])
      return typeof result === 'Object' ? result : instance
    }
    func.apply(thisArg, [...rest, ...args])
  }

  return bindFunc
}

// 5.call
const myCall = (thisArg, ...rest) => {
  thisArg = thisArg ?? window
  const key = Symbol('fn')
  thisArg[key] = this
  const result = this[key](...rest)
  delete thisArg[key]
  return result
}

// 6.函数柯里化
const curry = (targetFn) => {
  return function fn(...rest) {
    if (targetFn.length === rest.length) {
      return targetFn.apply(null, rest)
    } else {
      return fn.bind(null, ...rest)
    }
  }
}

// 7.debounce
const myDebounce = (func, wait = 0) => {
  if (typeof func !== 'function') return
  let timer = null
  const _debounce = function (...args) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
      timer = null
      clearTimeout(timer)
    }, wait)

    _debounce.cancel = function () {
      clearTimeout(timer)
      timer === null
    }

    return _debounce
  }
}

// 8. 函数节流 throttle 方法
const myThrottle = (func, wait = 0) => {
  if (typeof func !== 'function') return
  let timer = null

  const _throttle = function (...args) {
    if (timer) return
    setTimeout(() => {
      func.apply(this, args)
      clearTimeout(timer)
      timer = null
    })
  }

  _throttle.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return _throttle
}

// 9. 事件发布订阅（EventBus 事件总线）
class EventBus {
  constructor() {
    this.bus = {}
  }
  on(name, handle) {
    if (typeof handle !== 'function') {
      return
    }
    !this.bus[name] && !this.bus[name] = []
    this.bus[name].push(handle)
  }
  emit(name, ...args) {
    const funcArray = this.bus[name]
    if (!funcArray) return

    for (const func of funcArray) {
      func(...args)
    }
  }
  off(name, handle) {
    if (!handle) {
      this.bus[name] = []
      return
    }
    const handlers = this.bus[name]
    const handleIndex = handlers.findIndex((el) => el === handler)

    this.bus[name].splice(handleIndex, 1)
  }
  once(name, listener) {
    if (typeof handle !== 'function') {
      return
    }
    const onceListener = (...args) => {
      listener(...args)
      this.off(name, listener)
    }
    this.on(name, onceListener)
  }
}
