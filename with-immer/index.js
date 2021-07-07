console.log('immer: ', immer);
const { produce } = immer;
const currentState = {
  p: {
    x: 2
  }
};
let o1 = produce(currentState, draftState => {
  draftState.p.x = 1;
});
console.log('currentState: ', currentState);
console.log('o1: ', o1);
