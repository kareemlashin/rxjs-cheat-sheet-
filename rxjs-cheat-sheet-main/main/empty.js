import { empty } from 'rxjs';

//output: 'Complete!'
const subscribe = empty().subscribe({
  next: () => console.log('Next'),
  complete: () => console.log('Complete!')
});

//Create observable that immediately completes
const example = Rx.Observable.empty();
//output: 'Complete!'
const subscribe = example.subscribe({
  next: () => console.log('Next'),
  complete: () => console.log('Complete!')
});
// ^ output Complete