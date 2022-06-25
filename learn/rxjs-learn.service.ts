import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  combineAll,
  concatAll,
  interval,
  map,
  mergeAll,
  take,
  Observable,
  merge,
  Subject,
  BehaviorSubject,
  ReplaySubject,
  switchMap,
  of,
  from,
  concat,
  forkJoin,
  defer,
  fromEvent,
  range,
  timer,
} from 'rxjs';
import {
  catchError,
  combineLatest,
  first,
  flatMap,
  groupBy,
  last,
  mergeMap,
  mergeScan,
  reduce,
  scan,
  skip,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
  toArray,
  count,
  isEmpty,
  every,
  find,
  findIndex,
  pluck,
  share,
  shareReplay,
  distinctUntilChanged,
  distinct,
} from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';
import { finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RxjsService {

  /*
   * library is great for handling async tasks
   * has a large collection of operators
   * streaming of data
   */

  /*
   * Observable  vs Observer
   * Observer : is the object that listens to the Observable
   * Observable is a class 
   * Observer is an interface.
   */
  /*
   * Observable vs Subject
   * subject: you can send to it and receive from it. (hot)
   * Observable: you can receive from it only. (cold)
   */
  /*
   * subject vs promise
   * Promises:
   * One time use "Return data once"
   * No cancel
   * One listener
   * No socket support
   * Observables:
   * Return data many times as data change
   * Support cancel
   * Support socket
   * Support many listeners and notify them when data change
   */
  // ! Observer object
  observer = {
    next: (send: any) => { } /* code for next callback*/,
    error: (err: any) => { } /* code for error callback*/,
    complete: () => { } /* code for completion callback*/,
  };
  observable = Observable.create(function (observer: any) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    setTimeout(() => {
      observer.next(4);
      observer.complete();
    }, 1000);
  });
  constructor(private _http: HttpClient) { }
  // combineAll : flatting inner observable (observable in observable) spread operator
  source = interval(200).pipe(take(2));
  example = this.source.pipe(
    map((val) =>
      interval(200).pipe(
        map((i) => `Result (${val}): ${i}`),
        take(5)
      )
    )
  );
  combined = this.example.pipe(combineAll());
  // concatAll
  // flatting inner observable (observable in observable) spread operator concatenation first Observable => second Observable
  concatAll = this.example.pipe(concatAll());
  // mergeAll
  // subscribes to each inner Observable as it arrives, then emits each value as it arrives
  // concurrent : number => Maximum number of inner Observables being subscribed to concurrently.
  mergeAll = this.example.pipe(mergeAll());

  observable1 = Observable.create((observer: any) => {
    observer.next('I am Observable 1');
    setTimeout(() => {
      observer.next('I am Observable 11');
    }, 500);
  });
  observable2 = Observable.create((observer: any) => {
    observer.next('I am Observable 2');
    setTimeout(() => {
      observer.next('I am Observable 22');
    }, 300);
  });
  // merge
  // merge list of observables when any Observables emit
  observable3 = merge(this.observable1, this.observable2);
  // Subject
  Subject$$ = new Subject();
  Subject$ = this.Subject$$.asObservable();
  addToSubject() {
    this.Subject$$.next('I am Subject');
  }
  getSubject() {
    return this.Subject$.subscribe((data) => console.log(data));
  }
  // behavior subject
  behaviorSubject$$ = new BehaviorSubject('I am behavior subject');
  behaviorSubject$ = this.behaviorSubject$$.asObservable();

  addToBehaviorSubject() {
    this.behaviorSubject$$.next('I am Subject');
  }
  getBehaviorSubject() {
    return this.behaviorSubject$.subscribe((data) => console.log(data));
  }
  // BehaviorSubject vs Subject
  /*
   * BehaviorSubject: has the initial value
   * BehaviorSubject : has previous and upcoming value
   * Subject: has no initial value
   * Subject: only emits the last value
   */
  // Replay Subject
  // has memory of the last n values emitted by the source Observable
  ReplaySubject$$ = new ReplaySubject();
  ReplaySubject$ = this.ReplaySubject$$.asObservable();

  addToReplaySubject() {
    this.ReplaySubject$$.next('I am Subject');
  }
  getReplaySubject() {
    return this.ReplaySubject$.subscribe((data) => console.log(data));
  }
  // AsyncSubject when complete
  // throttleTime ignore time throttleTime(5000)
  // throttleTime freeze time to not receive data
  // switch Map take last value of previous observable and emit new observable
  // switch Map unsubscribe previous observable
  switchMapExample = this.source.pipe(
    switchMap((val) =>
      interval(200).pipe(
        map((i) => `Result (${val}): ${i}`),
        take(5)
      )
    )
  );
  // catchError use to handle error
  catchErrorExample = this.source.pipe(
    map((val) => {
      throw new Error('');
    }),
    catchError((err) => {
      throw new Error('Error : Error ');
    })
  );
  // retry(2) re connect
  // retry when error occurs
  // retryWhen when error occurs
  // of return all items as one item
  ofExample = of('I am of');
  // from is used to flatling
  fromExample = from([1, 2, 3, 4, 5]);
  // map used to transform data
  mapExample = this.source.pipe(map((val) => `Result: ${val}`));
  // tap / do  used to debug data
  tapExample = this.source.pipe(tap((val) => `Result: ${val}`));

  // share : used to observable one copy no duplicate

  // take : to take(1) only one value
  take = this.source.pipe(take(1));
  // first : to take(1) only first value
  first = this.source.pipe(first());
  // last : to take(1) only last value
  last = this.source.pipe(last());
  // takeLast : to takeLast(1) only last value
  takeLast = this.source.pipe(takeLast(1));
  // takeUntil : to takeUntil(observable) only take value until observable emit
  takeUntil = this.source.pipe(takeUntil(interval(200)));
  // takeWhile : to takeWhile(condition) only take value while condition is true
  takeWhile = this.source.pipe(takeWhile((val) => val < 5));
  // skip : to skip(1) skip first value
  skip = this.source.pipe(skip(1));
  // mergeMap : to flatting inner observable (observable in observable) spread operator
  ob1 = of(1);
  ob2 = of('a');
  //
  mergeMapExample = this.ob1.pipe(
    mergeMap((val) => this.ob2.pipe(map((i) => `Result (${val}): ${i}`)))
  );
  // flatMap : to flatting inner observable (observable in observable) spread operator
  flatMapExample = this.ob1.pipe(
    flatMap((val) => this.ob2.pipe(map((i) => `Result (${val}): ${i}`)))
  );
  // concatAll : flatting inner observable (observable , observable)
  concatExample = concat(this.ob1, this.ob2);
  // forkJoin
  // forkJoin  : flatting inner observable (observable , observable) used to get all values from observables
  forkJoinExample = forkJoin(this.ob1, this.ob2);
  // Ajax
  // ajax : used to get data from server
  ajaxExample = ajax('https://jsonplaceholder.typicode.com/todos/1');
  // combineLatest
  // combineLatest : used to get all values from observables
  combineLatestExample = combineLatest(this.ob1, this.ob2);
  // groupBy
  // groupBy : used to group data by key
  ob3 = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
  groupByExample = this.ob3.pipe(
    groupBy((val) => val % 2 === 0),
    mergeMap((group) => group.pipe(toArray()))
  );
  people = [
    { name: 'Alex', age: 31 },
    { name: 'Adam', age: 28 },
    { name: 'Alia', age: 21 },
    { name: 'David', age: 35 },
  ];
  //emit each person
  sourcePeople = from(this.people);
  //group by age
  examplePeople = this.sourcePeople.pipe(
    groupBy((person) => person.age < 25),
    mergeMap((group) => group.pipe(toArray()))
  );
  // reduce
  // reduce : used to reduce data to one value
  reduceExample = this.ob3.pipe(reduce((acc, val) => acc + val, 0));
  // scan
  scanExample = this.ob3.pipe(
    scan((acc, val) => `${acc} -  ${val}`, 'Initial Value')
  );
  // mergeScan
  // mergeScan :
  mergeScanExample = this.ob3.pipe(
    mergeScan((acc, val) => `${acc} -  ${val}`, 'Initial Value')
  );
  // count
  // count : used to count data
  countExample = this.ob3.pipe(count());
  // toArray
  // toArray : used to convert observable to array
  toArrayExample = this.ob3.pipe(toArray());
  // isEmpty
  // isEmpty : used to check if observable is empty
  isEmptyExample = this.ob3.pipe(isEmpty());
  // every
  // every : used to all
  everyExample = this.ob3.pipe(every((val) => val % 2 === 0));
  // find
  // find : used to find data
  findExample = this.ob3.pipe(find((val) => val % 2 === 0));
  // findIndex
  // findIndex : used to find index of data
  findIndexExample = this.ob3.pipe(findIndex((val) => val % 2 === 0));
  // finalize
  // finalize : used to do something after observable complete
  finalizeExample = this.ob3.pipe(
    finalize(() => console.log('Finalize'))
  );
  // pluck
  // pluck : used to get data from object
  obs4 = from([
    { brand: { type: 'iPhone' }, model: 'Xmax', price: '$1000' },
    { brand: { type: 'iPhone4' }, model: 'Xmax', price: '$1000' },
    { brand: { type: 'iPhone5' }, model: 'Xmax', price: '$1000' },
    { brand: { type: 'iPhone6' }, model: 'Xmax', price: '$1000' },
    { brand: { type: 'Samsung' }, model: 'S10', price: '$850' }
  ])

  pluckExample = this.obs4.pipe(pluck('brand'))

  // range : used to create observable from range of numbers
  range$ = range(1, 50);
  obs$ = of(1, 1).pipe(distinct());
  // concatMap  vs mergeMap
  // https://stackoverflow.com/questions/49698640/flatmap-mergemap-switchmap-and-concatmap-in-rxjs
  // concatMap : behaves like a queue: It stores all calls and sends one after another. If one is completed, the next one is being processed.
  // mergeMap  : Also sends all requests, like concatMap but does not wait until the response is coming back. It sends them out as they come. But it receives every response and does not ignore something. The order here is not guaranteed.

}
// https://www.techboxweb.com/handling-multiple-http-requests-in-angular-using-rxjs/
// Hot vs Cold
// Hot : not use subscribe
// Hot : share instance
// cold : lazy observable
// Cold : should subscribe to get data from observable
// cold : share one instance of observable
