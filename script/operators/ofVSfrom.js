// RxJS v6+
import { from, of } from 'rxjs';
//emits any number of provided values in sequence
const sourceFrom = from('abcdef');
//output: a
//output: b
//output: c
//output: d
//output: e
//output: f
const subscribeFrom = sourceFrom.subscribe(val => console.log(val));

// RxJS v6+
//emits any number of provided values in sequence
const sourceOf = of('abcdef');
//output: abcdef
const subscribeOf = sourceOf.subscribe(val => console.log(val));