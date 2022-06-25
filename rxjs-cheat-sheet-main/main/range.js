import { range } from 'rxjs';
const source = range(1, 10);
const example = source.subscribe(val => console.log(val));