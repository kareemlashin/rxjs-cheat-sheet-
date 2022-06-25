const obs1 = Rx.Observable.interval(1000).take(5);
const obs2 = Rx.Observable.interval(500).take(2);
const obs3 = Rx.Observable.interval(2000).take(1);
//emit three observables
const source = Rx.Observable.of(obs1, obs2, obs3);
//subscribe to each inner observable in order when previous completes
const example = source.concatAll();
/*
  output: 0,1,2,3,4,0,1,0
  
  obs1: 0,1,2,3,4 (complete)
  obs2: 0,1 (complete)
  obs3: 0 (complete)
*/

const subscribe = example.subscribe(val => console.log(val));