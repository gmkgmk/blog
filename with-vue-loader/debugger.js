module.exports = function(...args) {
  this.callback(null, ...args);
};

module.exports.pitch = function(request) {
  console.log("request: ", request);
  // debug
};
