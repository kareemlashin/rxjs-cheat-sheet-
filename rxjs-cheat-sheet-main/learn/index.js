const observable = new Rx.Observable(observer => {
    console.log('creating observable');
    setTimeout(function () {
        observer.next('an item');
        setTimeout(function () {
            observer.next('another item');
            observer.complete();
        }, 500);
    }, 1000);
});

observable.subscribe(item => {
    console.log(item),
    error => {
        console.error(error);
    },
    () => {
        console.log('completed');
    };
});

// ! from
// todo Turn an array, promise, or iterable into an observable.
from([
    1,
    2,
    3,
    4,
    5
]).subscribe(data => console.log(data));

// ! of
// todo emit array as a sequence of values

from([
    1,
    2,
    3,
    4,
    5
]).subscribe(data => console.log(data));

// ! pipe
// todo Allows executing operators on emitted values in the order they were defined.
of(1, 2, 3, 4).pipe(op1(), op2(), op3()).subscribe(data => console.log(data));
// ! tap
// todo Receives a value, takes an action which won't affect the value  and returns the same value.

of(1, 2, 3, 4);
pipe(tap(value => console.log(`The value is ${value}`))).subscribe(data => console.log(data));
// ! concatMap
// todo Maps each value to an Observable, then flattens all of these inner Observables using concatAll.
const ids = [1, 2, 3, 4];
const data = [];

from(ids).pipe(concatMap(id => this.http.get('apiurl/resource/' + id))).subscribe(httpResponse => this.data.push(httpResponse));

// ! map
// todo
of(1, 2, 3, 4).pipe(map(value => value * 2)).subscribe(data => console.log(data));

// ! mergeMap
// todo Maps each value to an Observable, then flattens all of these inner Observables using mergeAll.

// ! catchError
// todo  Allows to handle error in an observable sequence.
const source = throwError('This is an error!');
const example = source.pipe(catchError(val => of(`I caught: ${val}`)));
const subscribe = example.subscribe(val => console.log(val));

// ! retry
// todo Useful for things like HTTP requests that may fail. Allows us to re-subscribe and retry up to a number of times.
const source = interval(1000);
const example = source.pipe(mergeMap(val => (val > 5 ? throwError('Error!') : of(val))), retry(2));

// ! skip
// todo Skips a number of elements from the beginning of the source.
of(1, 2, 3, 4, 5).pipe(skip(3)).subscribe(data => console.log(data));
// ! take
// todo Takes a specific number of elements from the beginning of the source.
of(5, 4, 3, 2, 1).pipe(take(2)).subscribe(data => console.log(data));
// ! filter
// todo  Filters the values from the source based on a condition applied to each value.
of(1, 2, 3, 4, 5)
// The emitted values will be 2, 4.pipe(filter(value => value % 2 == 0)).subscribe(data => console.log(data));
