function myNew(fn, ...args) {
  const obj = new Object();

  obj.prototype.constructor = fn.prototype;

  let result = obj.apply(fn, args);

  return result instanceof Object ? result : obj;
}

Function.prototype.myCall = function(content = window) {
  const fn = Symbol('fn');
  content[fn] = this;
  const args = Array.from(arguments).slice(1);
  const result = content.fn(...args);
  delete content.fn;
  return result;
};

Function.prototype.myApply = function(content = window) {
  const fn = Symbol('fn');
  content[fn] = this;
  const args = Array.from(arguments)[1] || [];
  const result = content.fn(...args);
  delete content.fn;
  return result;
};

Function.prototype.myBind = function(content = window) {
  var _this = this;
  const wrapperArgs = Array.from(arguments).slice(1);
  return function F() {
    const args = Array.from(arguments);
    let result;
    if (this instanceof F) {
      result = _this.apply(this, [...wrapperArgs, ...args]);
    } else {
      result = _this.apply(content, [...wrapperArgs, ...args]);
    }
    return result;
  };
};

function extend() {
  // 方法一
  function ClassParent() {
    this.name = 'Parent';
  }
  ClassParent.prototype.funcA = function() {};
  function ClassChild(...args) {
    ClassParent.call(this, ...args);
  }
  ClassChild.prototype = ClassParent.prototype;
  ClassChild.prototype.constructor = ClassChild;
}

function fatherFn(...arr) {
  this.some = '父类的this属性';
  this.params = arr; // 父类的参数
}
fatherFn.prototype.fatherFnSome = '父类原型对象的属性或者方法';
function sonFn() {
  fatherFn.call(this, '借用构造继承'); // 核心1 借用构造继承: 继承父类通过this声明属性和方法至子类实例的属性上
  this.obkoro1 = '子类的this属性';
}
// 核心2 寄生式继承：封装了son.prototype对象原型式继承father.prototype的过程，并且增强了传入的对象。
function inheritPrototype(son, father) {
  const fatherFnPrototype = Object.create(father.prototype); // 原型式继承：浅拷贝father.prototype对象 father.prototype为新对象的原型
  son.prototype = fatherFnPrototype; // 设置father.prototype为son.prototype的原型
  // son.prototype.constructor = son; // 修正constructor 指向
}
inheritPrototype(sonFn, fatherFn);
sonFn.prototype.sonFnSome = '子类原型对象的属性或者方法';
const sonFnInstance = new sonFn();
console.log('寄生组合式继承子类实例', sonFnInstance);
console.log(new sonFnInstance.constructor());
