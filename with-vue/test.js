let vueID = 0;
const targetStack = []
class Vue {
    constructor(options) {
        this._init(options);
    }
    _init(options) {
        var vm = this;
        vm._uid = vueID++;
        vm._isVue = true;
        vm.$options = options;
        vm._renderProxy = vm;
        vm._self = vm;

        initLifecycle(vm);
        initEvents(vm);
        initRender(vm);
        callHook(vm, 'beforeCreate');
        // initInjections(vm); // resolve injections before data/props
        initState(vm);
        let watcher = new Watcher(this);

        // initProvide(vm); // resolve provide after data/props
        callHook(vm, 'created');
        if (vm.$options.el) {
            vm.$mount(vm.$options.el);
        }
    }
    $mount($el) { }
}

var depUid = 0;
class Dep {
    constructor() {
        this.id = depUid++;
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    removeSub(sub) {
        if (this.subs.length) {
            var index = this.subs.indexOf(sub);
            if (index > -1) {
                return this.subs.splice(index, 1)
            }
        }
    }
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }
    notify() {
        var subs = this.subs.slice();
        console.log('subs',subs)
        for (var i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    }
}
Dep.target = null;

class Observer {
    constructor(value) {
        this.value = value;
        this.dep = new Dep();
        this.vmCount = 0;
        this.walk(value);
    }
    walk(obj) {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i]);
        }
    }
}
let watchUid = 0
class Watcher {
    constructor(vm, expOrFn, cb=()=>{console.log("render")}, options) {
        this.cb = cb;
        this.vm = vm;
        this.getter = expOrFn;
        vm._watchers.push(this);
        this.id = ++watchUid;
        /*在这里将观察者本身赋值给全局的target，只有被target标记过的才会进行依赖收集*/
        Dep.target = this;

        /*触发渲染操作进行依赖收集*/
        // this.cb.call(this.vm);
    }
    addDep(dep) {
        var id = dep.id;
        dep.addSub(this);
    }
    update() {
        this.cb.call(this.vm);
    }
}
function defineReactive(obj, key, val) {
    var dep = new Dep();
    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
        return
    }
    var getter = property && property.get;
    var setter = property && property.set;
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            var value = getter ? getter.call(obj) : val;
            if (Dep.target) {
                dep.depend();
            }
            return value
        },
        set: function reactiveSetter(newVal) {
            var value = getter ? getter.call(obj) : val;
            console.log("Dep.target", Dep.target)
            if (setter) {
                setter.call(obj, newVal);
            } else {
                val = newVal;
            }
            console.log("set")
            dep.notify();
        }
    })
}

// 注册生命周期
function initLifecycle(vm) {
    console.log("注册生命周期")
    var options = vm.$options;
    var parent = options.parent;
    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;
    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
}
function initEvents(vm) {
    console.log("注册事件")
}
function initRender(tagName, vnode) {
    console.log("render")
}

function initState(vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.data) {
        initData(vm);
    } else {
        observe(vm._data = {}, true /* asRootData */);
    }
}

function observe(value) {
    let ob = new Observer(value);
    return ob;
}

function initData(vm) {

    var data = vm.$options.data;
    data = vm._data = typeof data === 'function'
        ? getData(data, vm)
        : data || {};

    var keys = Object.keys(data);
    var i = keys.length;
    while (i--) {
        var key = keys[i];
        console.log("binding",key)
        proxy(vm, "_data", key);
    }
    console.log("observe", data)
    observe(data, true /* asRootData */);
}

function getData(data, vm) {
    pushTarget();
    try {
        return data.call(vm, vm)
    } finally {
        popTarget();
    }
}

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];
function callHook(vm, hook) {
    var handlers = vm.$options[hook];
    if (handlers) {
        // for (var i = 0, j = handlers.length; i < j; i++) {
        try {
            handlers.call(vm);
        } catch (e) {
            console.error(e, vm, (hook + " hook"));
        }
        // }
    }
}

var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
};
function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}

function noop(a, b, c) { }

function pushTarget(_target) {
    if (Dep.target) { targetStack.push(Dep.target); }
    Dep.target = _target;
}

function popTarget() {
    Dep.target = targetStack.pop();
}