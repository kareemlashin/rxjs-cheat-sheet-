// BehaviorSubject vs Subject 
// BehaviorSubject is a type of Observable, but with the addition of the ability to subscribe to the last value emitted by an Observable.
// subject is a type of Observable, but with the addition of the ability to subscribe to the last value emitted by an Observable.
// promise 
// ? One time use "Return data once"
// ? No cancel
// ? One listener
// ? No socket support
// Observable is lazy.
// ~ Return data many times as data change
// ~ Support cancel
// ~ Support socket
// ~ Support many listeners and notify them when data change
// ~ Support map, filter, and reduce