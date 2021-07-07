const defaultOptions = { path: '/' }
function JsCookie() {
  function get(key) {
    if (!key) return document.cookie
    const cookie = document.cookie?.split('; ') ?? []
    const cookieMap = new Map()

    cookie.some((item) => {
      let [currentKey, ...value] = item.split('=')
      value = value.join('=')

      cookieMap.set(currentKey, value)
      return currentKey === key
    }, '')

    return cookieMap.get(key) || null
  }

  function set(key, value, options = defaultOptions) {
    options = { ...defaultOptions, ...options }

    const attrStr = Object.entries(options).reduce((prev, item) => {
      console.log(item)
      const [attrKey, attrValue] = item

      prev += `; ${attrKey}`

      if (!attrValue) return prev

      prev += `=${attrValue.split('; ')[0]}`

      return prev
    }, '')

    console.log('attrStr: ', attrStr)
    document.cookie = `${key}=${value}${attrStr}`
  }

  function del(key, options = defaultOptions) {
    set(key, '', { ...options, expires: -1 })
  }
  return { set, get, del }
}

const cookies = JsCookie()

const result = cookies.set('language', 'chinese', {
  path: '127.0.0.1',
})
