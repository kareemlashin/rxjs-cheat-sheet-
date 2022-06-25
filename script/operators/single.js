// RxJS v6+
import { from } from 'rxjs';
import { single } from 'rxjs/operators';

//emit (1,2,3,4,5)
const arraySource = from([1, 2, 3, 4, 5]);
//emit one item that matches predicate
const example = arraySource.pipe(single(val => val === 4));
//output: 4
const subscribe = example.subscribe(val => console.log(val));