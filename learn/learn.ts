import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  delay,
  from,
  map,
  of,
  reduce,
  filter,
  throwError,
  interval,
  timer,
  range,
  concat,
  merge,
  forkJoin,
  zip,
} from "rxjs";
import {
  catchError,
  debounceTime,
  distinct,
  skip,
  take,
  toArray,
  count,
  max,
  min,
  retry,
  switchMap,
  mergeMap,
  flatMap,
  combineAll,
  concatAll,
  mergeAll,
  first,
  last,
  startWith,
  groupBy,
  pluck,
  concatMap,
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { combineLatest } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LearnService {
  constructor(private _http: HttpClient) {}
  users = [
    {
      name: "John",
      age: 30,
      city: "New York",
      id: 1,
    },
    {
      name: "kareem",
      age: 25,
      city: " York",
      id: 2,
    },
    {
      name: "kareem",
      age: 22,
      city: " York",
      id: 2,
    },
  ];
  opsOf$ = of(...this.users).pipe();
  opsPipe$ = of(...this.users).pipe(take(5));
  opsFrom$ = from(this.users).pipe();
  opsDelay$ = from(this.users).pipe(delay(1000));
  opsMap$ = of(...this.users).pipe(
    map((data) => {
      return { ...data, age: data.age + 1 };
    })
  );
  opsReduce$ = of(1, 2, 3, 4, 5, 6).pipe(reduce((acc, curr) => acc + curr));
  opsFilter$ = of(...this.users).pipe(filter((value) => value.age < 25));
  opsTake$ = interval(500).pipe(take(5));
  opsInterval$ = interval(500).pipe(take(5));
  opsFirst$ = timer(500).pipe(first());
  opsLast$ = timer(500).pipe(last());
  opsTimer$ = timer(500).pipe(take(1));
  opsRange$ = range(1, 100).pipe(take(1));
  opsToArray$ = range(1, 100).pipe(toArray());
  opsDebounceTime$ = interval(100).pipe(debounceTime(100));
  opsSkip$ = interval(100).pipe(skip(50));
  opsDistinct$ = of(1, 1, 1, 1).pipe(distinct());
  opsMax$ = of(1, 1, 1, 1).pipe(max());
  opsMin$ = of(1, 1, 1, 1).pipe(min());
  opsRetry$ = of(1, 1, 1, 1).pipe(retry());

  // -------------------------------------- //
  srcObservable = of(1, 2, 3, 4);
  innerObservable = of("A", "B", "C", "D");

  opsSwitchMap$ = this.srcObservable.pipe(
    switchMap((val) => {
      console.log("Source value " + val);
      console.log("starting new observable");
      return this.innerObservable;
    })
  );
  // -------------------------------------- //
  letters = of("a", "b", "c");
  opsMergeMap$ = this.letters.pipe(
    mergeMap((x) => interval(1000).pipe(map((i) => x + i)))
  );
  // mergeMap : to flatting inner observable (observable in observable) spread operator
  // -------------------------------------- //
  opsFlatMap$ = this.letters.pipe(
    flatMap((x) => interval(1000).pipe(map((i) => x + i)))
  );
  // -------------------------------------- //
  opsConcat$ = concat(this.srcObservable, this.innerObservable);
  // -------------------------------------- //
  opsMerge$ = merge(this.srcObservable, this.innerObservable);
  // -------------------------------------- //
  opsForkJoin$ = forkJoin({
    google: ajax.getJSON("https://api.github.com/users/google"),
    microsoft: ajax.getJSON("https://api.github.com/users/microsoft"),
    users: ajax.getJSON("https://api.github.com/users"),
  });

  // -------------------------------------- //
  source$ = interval(1000).pipe(take(2));
  example$ = this.source$.pipe(
    map((val) =>
      interval(100).pipe(
        map((i) => `Result (${val}): ${i}`),
        take(1)
      )
    )
  );
  opsCombineAll$ = this.example$.pipe(combineAll());
  // combineAll : outer observable complete
  //
  // -------------------------------------- //
  timerOne$ = timer(1000);
  timerTwo$ = timer(2000);
  timerThree$ = timer(3000);
  opsCombineLatest$ = combineLatest(
    this.timerOne$,
    this.timerTwo$,
    this.timerThree$
  );
  // -------------------------------------- //
  obs1 = interval(1000).pipe(take(5));
  obs2 = interval(500).pipe(take(5));
  obs3 = interval(2000).pipe(take(5));
  opsConcatAll$ = of(this.obs1, this.obs2, this.obs3).pipe(concatAll());
  // concatAll : flating بحاله تتابع الاول ثم الثاني ثم الثالث
  // -------------------------------------- //
  // subscribes to each inner Observable as it arrives, then emits each value as it arrives
  // concurrent : number => Maximum number of inner Observables being subscribed to concurrently.
  opsMergeAll$ = of(this.obs1, this.obs2, this.obs3).pipe(mergeAll());
  // mergeAll flating
  // when faster observable resive start
  // -------------------------------------- //
  sourceOne = of("Hello");
  sourceTwo = of("World!");
  sourceThree = of("Goodbye");
  sourceFour = of("World!");
  ops$ = zip(
    this.sourceOne,
    this.sourceTwo.pipe(delay(1000)),
    this.sourceThree.pipe(delay(2000)),
    this.sourceFour.pipe(delay(3000))
  );
  // -------------------------------------- //
  people = [
    { name: "Sue", age: 25 },
    { name: "Joe", age: 30 },
    { name: "Frank", age: 25 },
    { name: "Sarah", age: 35 },
  ];
  sourcePeople = from(this.people);
  example$$ = this.sourcePeople.pipe(
    groupBy((person) => person.age),
    mergeMap((group) => group.pipe(toArray()))
  );
  // -------------------------------------- //
  examplePluck$ = from(this.people).pipe(pluck("name"), toArray());
  // -------------------------------------- //
  urls = [
    "https://api.mocki.io/v1/0350b5d5",
    "https://api.mocki.io/v1/ce5f60e2",
  ];

  ops$$ = from(this.urls)
    .pipe(
      concatMap((url: any) => {
        return this.fromFetch(url);
      })
    )
    .subscribe((response: any) => console.log(response?.status));
  fromFetch(url: any): any {
    return from(fetch(url).then((res) => res.json()));
  }
}

/*
 * https://github.com/btroncone/learn-rxjs/blob/master/operators/complete.md
 * https://github.com/jejoivanic/RxJS-CheatSheet
 *
 */
