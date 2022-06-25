import { of, concat } from 'rxjs';

concat(
  of(1, 2, 3),
  // subscribed after first completes
  of(4, 5, 6),
  // subscribed after second completes
  of(7, 8, 9)
)
  // log: 1, 2, 3, 4, 5, 6, 7, 8, 9
  .subscribe((x) => {
    console.log(x);
  });

const sourceOne = of(1, 2, 3);
const sourceTwo = of(4, 5, 6);
const example = sourceOne
  .pipe(concat(sourceTwo))
  .subscribe((x) => console.log(x));

// add second Observable over first
// fist  one must end
//Work in an aync way

import Rx from 'rxjs';

const concat1 = Rx.Observable.range(1, 10);
const concat2 = Rx.Observable.interval(1000);

concat1.concat(concat2).subscribe((a) => console.log(a));
