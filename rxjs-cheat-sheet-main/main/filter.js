import { of, pipe } from 'rxjs';
import { filter } from 'rxjs/operators';

of(1,2,3,4,5)
    // The emitted values will be 2, 4
    .pipe(filter(value => value % 2 == 0))
    .subscribe(data => console.log(data));