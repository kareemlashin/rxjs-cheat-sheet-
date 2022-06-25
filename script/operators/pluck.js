import { from } from 'rxjs';
import { pluck } from 'rxjs/operators';

const source = from([
  { name: '1', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
  { name: '2', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
  { name: '3', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
  { name: '4', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
  { name: '5', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
  { name: '6', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
  { name: '7', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
  { name: '8', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
  { name: 'Joe', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
  //will return undefined when no job is found
  { name: 'Sarah', age: 35 },
]);
//grab title property under job
const example = source.pipe(pluck('name'));
//output: "Developer" , undefined
const subscribe = example.subscribe((val) => console.log(val));
