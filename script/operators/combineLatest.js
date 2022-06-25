import { timer, combineLatest,take, interval } from 'rxjs';

// timerOne emits first value at 1s, then once every 4s
const timerOne$ = interval(1000).pipe(take(6));
// timerTwo emits first value at 2s, then once every 4s
const timerTwo$ = interval(2000).pipe(take(6));
// timerThree emits first value at 3s, then once every 4s
const timerThree$ = interval(3000).pipe(take(6));

// when one timer emits, emit the latest values from each timer as an array
combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(
  ([timerValOne, timerValTwo, timerValThree]) => {
    /*
      Example:
    timerThree first tick: 'Timer One Latest: 0, Timer Two Latest: 0, Timer Three Latest: 0
    timerOne second tick: 'Timer One Latest: 1, Timer Two Latest: 0, Timer Three Latest: 0
    timerTwo second tick: 'Timer One Latest: 1, Timer Two Latest: 1, Timer Three Latest: 0
  */
    console.log(
      `Timer One Latest: ${timerValOne},
     Timer Two Latest: ${timerValTwo},
     Timer Three Latest: ${timerValThree}`
    );
  }
);
// multi source example 