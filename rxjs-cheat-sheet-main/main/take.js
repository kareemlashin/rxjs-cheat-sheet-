import { of, pipe } from 'rxjs';
import { take } from 'rxjs/operators';

of(5,4,3,2,1)
    // Emits the first 2 elements
    .pipe(take(2))
    .subscribe(data =>console.log(data));