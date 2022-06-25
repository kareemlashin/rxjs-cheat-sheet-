

of('a', 'b', 'c', 'd')
    .pipe(
        skip(2)
    ).subscribe(x=>console.log(x)); // c d
