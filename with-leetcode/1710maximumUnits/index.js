// 请你将一些箱子装在 一辆卡车 上。给你一个二维数组 boxTypes ，其中 boxTypes[i] = [numberOfBoxesi, numberOfUnitsPerBoxi] ：

// numberOfBoxesi 是类型 i 的箱子的数量。
// numberOfUnitsPerBoxi 是类型 i 每个箱子可以装载的单元数量。
// 整数 truckSize 表示卡车上可以装载 箱子 的 最大数量 。只要箱子数量不超过 truckSize ，你就可以选择任意箱子装到卡车上。

// 返回卡车可以装载 单元 的 最大 总数。

/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
var maximumUnits = function (boxTypes, truckSize) {
  const arr = boxTypes.sort((a, b) => b[1] - a[1])

  return boxTypes.reduce((prev, item) => {
    const [number, unit] = item
    let total = 0
    if (truckSize >= number) {
      total = number * unit
      truckSize -= number
    } else if (truckSize > 0) {
      total = truckSize * unit
      truckSize = 0
    }
    return prev + total
  }, 0)
}

const result = maximumUnits(
  [
    [5, 10],
    [2, 5],
    [4, 7],
    [3, 9],
  ],
  10
)
