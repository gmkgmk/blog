const changeColor = (color = '') => {
  let sColor = color.toLowerCase();
  if (sColor) {
    const len = sColor.length;
    if (len === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      console.log(' sColor.slice(i, i + 2): ',  sColor.slice(i, i + 2));
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      console.log('parseInt("0x" + sColor.slice(i, i + 2)): ', parseInt('0x' + sColor.slice(i, i + 2)));
    }
    return　`rba(${sColorChange.join()})`

  }
};
console.log(changeColor('#6d2b2b'));
