import { from } from 'rxjs';

//emit array as a sequence of values
// The output will be: 1,2,3,4,5
from([1, 2, 3, 4, 5])
    .subscribe(data => console.warn(data));
// 1
// 2
// 3 
// 4 
// 5
