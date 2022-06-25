// RxJS v6+
import { endWith, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

const source$ = of('Hello', 'Friend');

source$
  // emit on completion
  .pipe(
    endWith('Goodbye', 'Friend'),
  )
  // 'Hello', 'Friend', 'Goodbye', 'Friend'
  .subscribe(val => console.log(val));
// 'Finally'