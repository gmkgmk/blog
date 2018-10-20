let uid = 0;
function noop(a, b, c) { };
class Vue {
    constructor(options) {
        this._init(options);
    }
    _init(options) {
        var vm = this;

        vm._uid = uid++;
        vm._isVue = true;
        vm._self = vm;
        vm.$options = options;
        initState(vm);

        if (vm.$options.el) {
            vm.$mount(vm.$options.el);
        }
    }
    $mount(el) {
        return mountComponent(this, el)
    };
    _render() { }
    _update() { }
}
let watchUid = 0;
class Watcher {
    constructor(vm, expOrFn, cb, options, isRenderWatcher) {
        this.vm = vm;
        if (isRenderWatcher) {
            vm._watcher = this;
        }
        this.getter = expOrFn;
        vm._watchers.push(this);
        this.cb = cb
        this.id = ++watchUid;
        this.value = this.get();
    }
    get() {
        const vm = this.vm;
        let value = this.getter.call(vm, vm);
        return value
    }
    run() {
        var value = this.get();
        if (
            value !== this.value
        ) {
            var oldValue = this.value;
            this.value = value;
            this.cb.call(this.vm, value, oldValue);
        }
    }
}
class Observer {
    constructor(value) {
        this.walk(value);
    }
    walk(obj) {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i]);
        }
    }
}
function initState(vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.data) {
        initData(vm);
    } else {
        // observe(vm._data = {}, true /* asRootData */);
    }
}

function mountComponent(
    vm,
    el
) {
    vm.$el = el;
    let updateComponent = function () {
        vm._update(vm._render());
    };
    new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
}

// function initRender(vm) {
//     vm._vnode = null; // the root of the child tree
//     var options = vm.$options;
// }

function initData(vm) {
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function'
        ? getData(data, vm)
        : data || {};
    const keys = Object.keys(data)
    let i = keys.length;
    const props = vm.$options.props;
    const methods = vm.$options.methods;
    while (i--) {
        var key = keys[i];
        proxy(vm, "_data", key);
    }
    observe(data, true /* asRootData */);
}

function getData(data, vm) {
    return data.call(vm, vm)
}

function observe(value) {
    let ob = new Observer(value);
    return ob
}

function defineReactive(obj, key, val) {
    var val = obj[key];
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            var value = val;
            return value
        },
        set: function (newVal) {
            val = "new +" + newVal;
        }
    })
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
    console.log(sharedPropertyDefinition)
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
