/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    const length = intervals.length;
    if (length < 2) return intervals;
    intervals.sort((a, b) => a[0] - b[0]);
    let result = [intervals[0]];

    for (let i = 0; i < length; i++) {
        if (intervals[i][0] <= result[result.length - 1][1]) {
            result[result.length - 1][1] = Math.max(result[result.length - 1][1], intervals[i][1]);
        } else {
            result.push(intervals[i]);
        }
    }
    return result;
};

const data = [
    [2, 3],
    [5, 5],
    [2, 2],
    [3, 4],
    [3, 4]
];
const result = merge(data);

