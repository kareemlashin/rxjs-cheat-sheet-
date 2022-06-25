import { of, pipe } from 'rxjs';
import { find } from 'rxjs/operators';

of(1,2,3,4,2)
    .pipe(find(value => value == 2)) // Only emits one value 2
    .subscribe(data => console.log(data));