function getIn(
  obj: any,
  key: string | string[],
  def?: any,
  p: number = 0
) {
  const path = toPath(key);
  while (obj && p < path.length) {
    obj = obj[path[p++]];
  }
  return obj === undefined ? def : obj;
}


/**
 * Make a promise cancellable by @istarkov
 * @see https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
 */
export function makeCancelable<T extends Promise<any>>(
  promise: T
): [T, () => void] {
  let hasCanceled: boolean = false;

  const wrappedPromise: any = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return [
    wrappedPromise,
    function cancel() {
      hasCanceled = true;
    },
  ];
}

/**
 * Deeply set a value from in object via its path.
 * @see https://github.com/developit/linkstate
 */
 function setIn(obj: any, path: string, value: any): any {
  let res: any = cloneDeep(obj);
  let resVal: any = res;
  let i = 0;
  let pathArray = toPath(path);

  for (; i < pathArray.length - 1; i++) {
    const currentPath: string = pathArray[i];
    let currentObj: any = getIn(obj, pathArray.slice(0, i + 1));

    if (resVal[currentPath]) {
      resVal = resVal[currentPath];
    } else if (currentObj) {
      resVal = resVal[currentPath] = cloneDeep(currentObj);
    } else {
      const nextPath: string = pathArray[i + 1];
      resVal = resVal[currentPath] =
        isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
    }
  }

  // Return original object if new value is the same as current
  if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
    return obj;
  }

  if (value === undefined) {
    delete resVal[pathArray[i]];
  } else {
    resVal[pathArray[i]] = value;
  }
