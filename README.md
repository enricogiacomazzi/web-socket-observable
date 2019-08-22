# webSocketObsevable

A simple wrapper around WebSocket, based on rxjs

### usage:

``` javascript
import {webSocketObservable} from 'web-socket-observable';

const tick = interval(1000).pipe(map(x => `test ${x}`));

// parameter in config object url, protocols (as webSocket constructor) 
// and send$ (an Oservable for sending data to ws server, optional)

const ws$ = webSocketObservable({
    url: 'ws://echo.websocket.org/',
    send$: tick
});

ws.subscribe(x => {
    console.log(x);
})


```