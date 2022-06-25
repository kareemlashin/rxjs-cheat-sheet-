// RxJS v6+
import { interval, forkJoin, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';

const myPromise = val =>
  new Promise(resolve =>
    setTimeout(() => resolve(`Promise Resolved: ${val}`), 300)
  );

/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example = forkJoin({
  //emit 'Hello' immediately
  sourceOne: of('Hello'),
  //emit 'World' after 1 second
  sourceTwo: of('World').pipe(delay(100)),
  //emit 0 after 1 second
  sourceThree: interval(100).pipe(take(1)),
  //emit 0...1 in 1 second interval
  sourceFour: interval(100).pipe(take(2)),
  //promise that resolves to 'Promise Resolved' after 5 seconds
  sourceFive: myPromise('RESULT')
});
/*
 * Output:
 * { 
 *   sourceOne: "Hello", 
 *   sourceTwo: "World", 
 *   sourceThree: 0,
 *   sourceFour: 1,
 *   sourceFive: "Promise Resolved: RESULT"
 * }
 */
const subscribe = example.subscribe(val => console.log(val));
// forkJoin  == promise.all