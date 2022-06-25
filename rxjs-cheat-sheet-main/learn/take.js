function concat() {
    console.log('---------------Concat----------------');
    const one = interval(600).pipe(
        filter(_d => (_d % 2 === 0)),
        take(3)
    )
    const two = interval(100).pipe(
        filter(_d => (_d % 2) !== 0),
        take(3)
    )

    const source = concat(one, two);
    source.subscribe(response => {
        console.log('----------------------------------')
        console.log(response)
    }
        , (error) => {
            console.log(error)
        }
        , () => {
            this.completed();
        })
}

//0------1------2------3------4------5------6------7 <== one
//      take(3)
//0------2------4

//0--1--2--3--4--5--6--7 <== two
//      take(3)
//1--3--5
