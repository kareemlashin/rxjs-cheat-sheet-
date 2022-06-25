import { of, switchMap } from "rxjs"

// switchMap operator
let srcObservable= of(1,2,3,4)
let innerObservable= of('A','B','C','D')
 
srcObservable.pipe(
  switchMap( val => {
    console.log('Source value '+val)
    console.log('starting new observable')
    return innerObservable
  })
)
.subscribe(ret=> {
  console.log('Recd ' + ret);
})

