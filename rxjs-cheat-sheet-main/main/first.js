import { of, pipe } from 'rxjs';
import { first } from 'rxjs/operators';

of(1,2,3,4,5)
    .pipe(first()) // Only emits value 1
    .subscribe(data => console.log(data));