const Rx = window.rxjs;
const button = document.querySelector('#button');
const result = document.querySelector('#result');
const { interval, Observable } = Rx;
const { throttleTime, scan, buffer, take } = Rx.operators;

const obs = new Observable(observer => {
  observer.next('first value');
  setTimeout(() => {
    // observer.error('someThing error');
    observer.next('second value');
  }, 500);

  observer.next('last value');
  observer.complete();
});

const sub = obs.subscribe({
  next(res) {
    console.log('res', res);
    showResult(res);
  },
  error(err) {
    console.log('err', err);
    showResult(err);
  },
  complete() {
    console.log('Complete');
    showResult('Complete');
  }
});

function showResult(el) {
  result.innerHTML += `<li>${el}</li>`;
}
