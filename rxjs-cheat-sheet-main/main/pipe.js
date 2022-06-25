import { of, pipe } from 'rxjs';

of(1,2,3,4)
    pipe(
        op1(),
        op2(),
        op3()
    )
    .subscribe(data => console.warn(data));

// The emitted values will be the result of op3(op2(op1(value)))
