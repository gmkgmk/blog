let uid = 0;
class Vue {
    constructor(options) {
        this.init(options);
    }
    init(options) {
        const vm = this;
        vm.$options = options;

        initState(vm);
    }
}
// 收集依赖
class Dep {
    constructor() {
        this.id = uid++;
        this.subs = [];
    }
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }
}
Dep.target = null;
const targetStack = [];
function pushTarget(_target) {
    if (Dep.target) {
        targetStack.push(Dep.target);
    }
    Dep.target = _target;
}

function popTarget() {
    Dep.target = targetStack.pop();
}
// 将被观察者加入观察者类,对象的属性键到getter/setter中
class Observer {
    constructor(value) {
        this.value = value;
        this.dep = new Dep();
        this.walk(value);
    }
    walk(obj) {
        const keys = Object.keys(obj);
        keys.forEach(item => {
            defineReactive(obj, item);
        });
    }
}
// 初始化state
function initState(vm) {
    vm._watchers = [];
    const opts = vm.$options;

    if (opts.data) {
        initData(vm);
    }
}

// 初始化data
function initData(vm) {
    const data = vm.$options.data;
    observe(data, true /* asRootData */);
}

// 设置
function observe(value) {
    return new Observer(value);
}

// 加入getter/setter
function defineReactive(obj, key, val) {
    const dep = new Dep();
    Object.defineProperties(obj, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            const value = getter ? getter.call(obj) : val;
            if (Dep.target) {
                dep.depend();
            }
            return value;
        },
        set: function(newVal) {
            val = newVal;
            console.log(val);
            dep.notify();
        }
    });
}
