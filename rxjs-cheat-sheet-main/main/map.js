let obs= of(1,2,3,4)
 
//Using MAP
obs.pipe(
  map(val => {
    return val*2      //Returning Value
  })
)
.subscribe(ret=> {
  console.log('Recd from map : ' + ret);
})

// Output
// ! Recd from map : 2
// ! Recd from map : 4
// ! Recd from map : 6
// ! Recd from map : 8
import { of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

of(1,2,3,4)
    .pipe(map(value => value * 2))
    .subscribe(data => console.log(data))
// This will emit 2,4,6,8