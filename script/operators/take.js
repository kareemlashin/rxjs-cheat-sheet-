import {
    interval,
    take
} from 'rxjs';
var source = interval(1000).pipe(take(1))
var subscription = source.subscribe(
    function (x) {
        console.log('Next: ' + x);
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });