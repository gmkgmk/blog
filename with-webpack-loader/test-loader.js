function loader(source) {
  console.log('source: ', source);
  return source;
}
loader.pitch = function(remainingRequest, precedingRequest, data) {
  console.log('data: ', data);
  console.log('precedingRequest: ', precedingRequest);
  console.log('remainingRequest: ', remainingRequest);
};
module.exports = loader;
