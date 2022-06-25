//     
import { of, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

of(1,2,3,4)
    pipe(tap(value => console.log(`The value is ${value}`)))
    .subscribe(data => console.warn(data));

// The emitted value will be 1,2,3,4