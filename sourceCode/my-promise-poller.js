const delay = (timer) => new Promise((resolve) => setTimeout(resolve, timer))
let stop = false
const timeoutHandle = (promiseLy, timeout) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('task timeout'))
    }, timeout)
    promiseLy.then((result) => {
      clearTimeout(timeoutId)
      resolve(result)
    })
  })
}
const promisePoller = (options) => {
  let {
    taskFn,
    interval,
    maxTimer,
    stopFn = () => true,
    timeout = 0,
    retries = 0,
    progressCallback,
  } = options
  let timerId = null //全局timout定时器
  let polling = true

  const rejectList = [] //错误列表
  return new Promise((resolve, reject) => {
    if (maxTimer) {
      timerId = window.setTimeout(() => {
        reject(new Error('master timeout'))
      }, maxTimer)
    }

    const poll = async () => {
      if (stop) return
      let taskPromise = Promise.resolve(taskFn())
      if (timeout) {
        taskPromise = timeoutHandle(taskPromise, timeout)
      }
      taskPromise.then(
        (result) => {
          if (stopFn(result)) {
            delay(interval).then(poll)
          } else {
            if (timerId !== null) {
              clearTimeout(timerId)
            }

            resolve(result)
          }
        },
        (err) => {
          rejectList.push(err)
          if (progressCallback) {
            progressCallback(err, retries)
          }
          if (--retries === 0) {
            reject(rejectList)
          } else {
            delay(interval).then(poll)
          }
        }
      )
    }

    poll()
  })
}

let flag = 1
promisePoller({
  taskFn: async () => {
    console.log('fetch')
    await delay(600)
    return flag++
  },
  interval: 500,
  timeout: 500,
  retries: 3,
  progressCallback(err, number) {
    console.log('重试' + number)
  },
  stopFn(res) {
    if (res === 5) return false
    return true
  },
})
  .then((result) => {
    console.log('result: ', result)
  })
  .catch((err) => {
    console.log('err: ', err)
  })
