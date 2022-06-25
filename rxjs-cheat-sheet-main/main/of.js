import { of } from 'rxjs';

// Emits any number of provided values in sequence
// The output will be: 1,2,3,4,5
of(1, 2, 3, 4, 5)
.subscribe(data => console.warn(data));
