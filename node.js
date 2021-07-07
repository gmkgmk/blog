/**
 * 等待
 *
 * @remarks
 *
 * 可以取消的等待
 *
 * @param {number} ms - 时间(毫秒)
 * @param {T|undefined} value - 返回值
 */
function delay(ms, value) {
  if (!ms) return value
  let flag = false
  let timer = null

  const result = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      if (flag) {
        clearTimeout(timer)
        timer = null
        return
      }
      resolve(value)
      flag = true
    })
  }, ms)
  result.cancel = () => {}

  return result
}

// 演示
;(async () => {
  const p1 = delay(1000, true)
  const p2 = delay(2000, false)

  try {
    const result = await Promise.race([p1, p2])
    console.log('result: ', result)
    // true
  } catch (e) {
  } finally {
    // p1.cancel()
    // p2.cancel()
  }
})()
