class NaiveDict {
  constructor() {
    this.keys = [];
    this.values = [];
  }
  set(key, value) {
    this.keys.push(key);
    this.values.push(value);
  }
  get(lookupKey) {
    for (var i = 0; i < this.keys.length; i++) {
      var key = this.keys[i];
      if (key === lookupKey) {
        return this.values[i];
      }
    }
  }
}

class HashTable {
  constructor() {
    this.bucketCount = 100000;
    this.buckets = [];
    for (let i = 0; i < this.bucketCount; i++) {
      this.buckets.push(new NaiveDict());
    }
  }
  // 获取key 的charCodeAt 累加获得hash值
  hashFunction(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash;
      hash = hash + key.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
  //防止hash太大 超过了Count ,超过的话只取模
  getBucketIndex(key) {
    console.log('his.hashFunction(key): ', this.hashFunction(key));
    return this.hashFunction(key) % this.bucketCount;
  }
  // 获取表
  getBucket(key) {
    return this.buckets[this.getBucketIndex(key)];
  }
  // 设置表值
  set(key, value) {
    this.getBucket(key).set(key, value);
  }
  // 获取表表
  get(lookupKey) {
    return this.getBucket(lookupKey).get(lookupKey);
  }
}

// 测试
function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
var dict = new HashTable();

var keys = [];
var values = [];
for (var i = 0; i < 100000; i++) {
  keys.push(makeid());
  values.push(Math.round());
}

console.time('SET');
for (var i = 0; i < keys.length; i++) {
  dict.set(keys[i], values[i]);
}
console.timeEnd('SET');

console.time('GET');
for (var i = 0; i < keys.length; i++) {
  var val = dict.get(keys[i]);
}
console.timeEnd('GET');
