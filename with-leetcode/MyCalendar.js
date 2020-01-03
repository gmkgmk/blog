var MyCalendar = function() {
 this.calenadr = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function(start, end) {
 const calenadr = this.calenadr;
 let length = calenadr.length;
 for (let i = 0; i < length; i++) {
  const [existStart, existEnd] = calenadr[i] || [];
  //   if (13 == start) {
  //    console.log('this.calenadr: ', this.calenadr);
  //    return;
  //   }
  //   包含开始时间
  if (start >= existStart && start < existEnd) return false;
  //   包含结束时间
  if (end > existStart && existEnd >= end) return false;
  //   开始时间结束时间都被包含
  if (start >= existStart && end < existEnd) return false;
  //   开始时间和结束时间已包含;
  if (start <= existStart && end > existEnd) return false;
 }
 this.calenadr.push([start, end]);
 return true;
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */
var obj = new MyCalendar();
[
 [37, 50],
 [33, 50],
 [4, 17],
 [35, 48],
 [8, 25]
].forEach(element => {
 console.log(obj.book(...element));
});
