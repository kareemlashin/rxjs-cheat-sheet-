Subject

var behaviorSubject = new BehaviorSubject(0);
behaviorSubject.subscribe({
    next: (v) => console.log('observerA: ' + v)
});
behaviorSubject.next(1);
behaviorSubject.next(2);
behaviorSubject.next(3);
// Subject