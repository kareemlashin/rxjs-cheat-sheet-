import { interval } from 'rxjs';
import { sample } from 'rxjs/operators';

//emit value every 1s
const source = interval(1000);
//sample last emitted value from source every 2s
const example = source.pipe(sample(interval(1000)));
//output: 2..4..6..8..
const subscribe = example.subscribe(val => console.log(val));


const source = interval(1000);  
const subscribe = source.subscribe(val => console.log(val));  
/* 
! output
0 
1
...
*/

const numbers = interval(1000);  
const takeFourNumbers = numbers.pipe(take(8));  
takeFourNumbers.subscribe(x => console.log('The upcoming value is: ', x));   
/* 
! output
The upcoming value is:  0 
The upcoming value is:  1
...
The upcoming value is: 7
*/