const Rx = window.rxjs;
const button = document.querySelector('#button');
const result = document.querySelector('#result');
const { Subject, Observable } = Rx;
const {} = Rx.operators;

const sub = new Subject();
var source = new Observable(observer => {
  observer.next('first value');
  observer.next('second value');
  observer.next('three value');
});

var observerA = {
  next: value => console.log('A next: ' + value),
  error: error => console.log('A error: ' + error),
  complete: () => console.log('A complete!')
};

var observerB = {
  next: value => console.log('B next: ' + value),
  error: error => console.log('B error: ' + error),
  complete: () => console.log('B complete!')
};

sub.subscribe(observerA);
sub.subscribe(observerB);
// obs.subscribe({
//   next(res) {
//     console.log('listening two', res);
//     console.log(res);
//   }
// });
