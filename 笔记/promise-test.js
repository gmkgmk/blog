const loop = () => {};

const Promise = function(fn) {
    this.status = 0;
    this.deferreds = null;
    this.value = null;
    init(fn, this);
};
function init(fn, promise) {
    fn(value => resolve(value, promise), value => reject(value));
}
Promise.prototype.then = function(fn) {
    var res = new Promise(noop);
    handle(this, new Handler(onFulfilled, onRejected, res));
    return res;
};
function resolve(newValue, self) {
    self.value = newValue;
    handleResolved(self, self.deferreds);
}
function handleResolved(){
   
}