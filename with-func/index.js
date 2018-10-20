const _ = require('lodash')

const table = [
    { name: "jane", job: "author", phone: "123456" },
    { name: "tracy", job: "player", phone: "654321" },
    [
        { name: "jane", job: "author", phone: "123456" },
        { name: "tracy", job: "player", phone: "654321" },
        { name: "rose", job: "undefined", phone: null },
    ]
]

const toBoolean = el => {
    if (_.isBoolean(el)) return el;
    if (_.isFunction(el)) return el();
    return Boolean(el)
}

const allTrue = (table) => {
    return _.reduce(table, (prev, item, key) => {
        return prev && toBoolean(item)
    }, true)
}

const anyTrue = table => {
    return _.reduce(table, (prev, item, key) => {
        return prev || toBoolean(item)
    }, false)
}