var subject = new Subject();
subject.subscribe({
    next: (v) => console.log('observerA: ' + v)
});
subject.next(1);
subject.next(2);
subject.next(3);
// 