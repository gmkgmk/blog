/*
 * @Author: guo.mk 
 * @Date: 2018-08-23 16:42:21 
 * @Last Modified by: guo.mk
 * @Last Modified time: 2018-08-24 16:15:56
 */

const _ = require('lodash')
/**
 * @example
* *  const table = [
* *   { name: "jane", job: "author", phone: "123456" },
* *  { name: "tracy", job: "player", phone: "654321" },
* *  { name: "rose", job: "visiter", phone: "789789" },
* *  ]
* *  findKeysMap(table, ["job", "phone"])
* * ===>
* * [{ job: 'author', phone: '123456' },
* * { job: 'player', phone: '654321' },
* * { job: 'visiter', phone: '789789' }]
*
* @param {Array [Object]} table
* @param {Array [String]} keys
* @returns {Array [Object]}
* todo 寻找对象数组里指定keys的集合
*/
export const findKeysMap = (table, keys) => {
    return _.map(table, item => {
        return _.pick.apply(null, _.concat(item, keys))
    })
}



/**
 * @param {Array [Object]} table
 * @param {String} key 
 * @param {String} value
 * todo 给对象的指定key添加默认值
 */
export const withDefault = (table, key, value) => {
    return _.map(table, item => {
        return _.defaults(item, {
            key: value
        })
    })
}


/**
 * @example
 * *  const obj = { name: "jane", job: "author", phone: "123456" }
 * *  rename(obj, { name: "name1", job: "job1" })
 * * ===>
 * * { phone: '123456', name1: 'jane', job1: 'author' }
 * 
 * @param {Object} table 
 * @param {Object} newNames
 * todo 改变对象指定key 的keyName
 */
export const rename = (table, newNames) => {
    return _.reduce(newNames, (prev, item, oldKey) => {
        if (_.has(table, oldKey)) {
            prev[item] = table[oldKey]
        }
        return prev
    }, _.omit.call(null, table, _.keys(newNames)))
}

/**
 * 
 * @param {Array [Object]} table 
 * @param {Object} newNames
 * todo 改变数组里每个对象指定key 的keyName
 */
export const renameArr = (table, newNames) => {
    return _.map(table, item => {
        return rename(item, newNames)
    })
}


/**
 * 
 * @param {Object, Array} table 
 * todo 过滤一个对象或者数组里每一个对象为undefined 和null的值
 */
export const filterTrue = (table) => {
    let isArray = true
    if (!_.isArray(table)) {
        table = [table]
        isArray = false
    };
    const result = _.map(table, item => {
        return _.omitBy(item, _.isNil);
    })

    return isArray ? result : result[0]
}

/**
 * 
 * @param {Array} table 
 * todo 深克隆一个数组对象
 */
const cloneArray = (table = []) => {
    return _.map(table, item => {
        if (Object.prototype.toString.call(item) === "[object Object]") {
            return _.cloneDeep(item)
        }
        if (Object.prototype.toString.call(item) === "[object Array]") {
            return cloneArray(item)
        }
        return item
    })
}

/**
 * 
 * @param {*} el 
 * @return {Boolean}
 * todo transform to Boolean
 */
const toBoolean = el => {
    if (_.isBoolean(el)) return el;
    if (_.isFunction(el)) return el();
    return Boolean(el)
}

/**
 * 
 * @param {Array} table 
 * todo 全部true 则返回true,否则返回false
 */
const allTrue = (table) => {
    return _.reduce(table, (prev, item, key) => {
        return prev && toBoolean(item)
    }, true)
}

/**
 * 
 * @param {Array} table 
 * todo 有一个true 则返回true,否则返回false
 */
const anyTrue = table => {
    return _.reduce(table, (prev, item, key) => {
        return prev || toBoolean(item)
    }, false)
}