const urls = ['https://api.mocki.io/v1/0350b5d5', 'https://api.mocki.io/v1/ce5f60e2'];

from(urls).pipe(concatMap((url) => {
    return fromFetch(url);
})).subscribe((response) => console.log(response));

let obs = of(1, 2, 3, 4)

obs.pipe(concatMap(val => {
    return of(val * 2) // Returning observable
})).subscribe(ret => {
    console.log('Recd from concatMap : ' + ret);
})

// Output
// !  Recd from concatMap: 2
// ! Recd from concatMap: 4
// !  Recd from concatMap: 6
// !  Recd from concatMap: 8

// outer observable.pipe
of("hound", "mastiff", "retriever") 
(concatMap(breed => {
    const url = 'https://dog.ceo/api/breed/' + breed + '/list';
    return this.http.get<any>(url) // inner observable
})).subscribe(data => {
    console.log(data)
})


const concatMapSub = Rx.Observable.of(2000, 1000).concatMap(v => Rx.Observable.of(v).delay(v))
// concatMap: 2000, mergeMap: 1000.subscribe(v => console.log('concatMap:', v))


const source = Rx.Observable.of('Hello', 'Goodbye');
const example = source.concatMap(val => Rx.Observable.of(`${val} World!`));
const subscribe = example.subscribe(val => console.log('Example One:', val));


/* 

Breaking down the concatMap network log diagram
As we can see, 
one save HTTP request starts only after the previous save has completed. Here is how the concatMap operator is ensuring that the requests always happen in sequence:

concatMap is taking each form value and transforming it into a save HTTP Observable, called an inner Observable
concatMap then subscribes to the inner Observable and sends its output to the result Observable
a second form value might come faster than what it takes to save the previous form value in the backend
If that happens, that new form value will not be immediately mapped to an HTTP request
instead, 
concatMap will wait for previous HTTP Observable to complete before mapping the new value to an HTTP Observable, subscribing to it and therefore triggering the next save

*/

//Take a value as a input return Observable and concatMap subscribe to it.

import Rx from 'rxjs';

Rx.Observable.range(1,5)
    .concatMap(n => Rx.Observable.range(1, n+1))
    .subscribe(a => console.log(a))

Rx.Observable.range(1,5)
    .concatMapTo(Rx.Observable.range(1,3))
    .subscribe(a => console.log(a))


let domainUrl = 'https://reqres.in/api/users?page='
,
reqArray = [1, 2, 3, 4, 5];

from(reqArray).pipe(
    concatMap(id => this.httpService.getCall(domainUrl + id))
).subscribe((value) => {
    console.log(value);
});
  