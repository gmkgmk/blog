function noop() {}

function Promise(fn) {
    this.value = null;
    this.status = 0;
    this.deferreds = null;
    init(fn, this);
}

function init(fn, promise) {
    fn(value => resolve(promise, value), value => reject(promise, value));
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    var res = new Promise(noop);
    handle(this, new Handler(onFulfilled, onRejected, res));
    return res;
};

function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
    this.promise = promise;
}


function handle(self, deferred) {
    if (self.status === 0) {
        self.deferreds = deferred;
        return;
    }
    handleResolved(self, deferred);
}
function handleResolved(self, deferred) {
    if (!deferred) {
        return self.value;
    }
    var cb = deferred.onFulfilled || deferred.onRejected || (() => {});
    const res = cb(self.value);
    resolve(deferred.promise, res);
}

function resolve(self, newValue) {
    self.status = 1;
    self.value = newValue;
    handleResolved(self, self.deferreds);
}
function reject(err) {
    self.status = 2;
    self.value = err;
}
