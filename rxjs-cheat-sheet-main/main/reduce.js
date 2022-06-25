import { of, pipe } from 'rxjs';
import { reduce } from 'rxjs/operators';

of(1,2,3,4)
    .pipe(
        reduce((acc, singleValue) => acc + singleValue, 0)
    )
    .subscribe(data => console.log(data))
// This will emit the value 10