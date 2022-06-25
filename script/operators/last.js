// RxJS v6+
import { from } from 'rxjs';
import { last } from 'rxjs/operators';

const source = from([1, 2, 3, 4, 5]);
//no arguments, emit last value
const example = source.pipe(last());
//output: "Last value: 5"
const subscribe = example.subscribe(val => console.log(`Last value: ${val}`));