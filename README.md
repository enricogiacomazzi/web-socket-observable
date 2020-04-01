# webSocketObsevable

A simple wrapper around WebSocket, based on rxjs

## warning:
from this release you can use the library as rxjs operator,
not by creating an observable as before.

### usage:

``` javascript
import {ws} from 'web-socket-observable';

const ws$ = interval(1000).pipe(
    map(x => `test ${x}`),
    ws(new WebSocket('wss://echo.websocket.org/'));

ws$.subscribe(x => {
    console.log(x);
})

// if you want "only listen" you can use NEVER observable, like follow:

const ws$ = NEVER.pipe(ws(new WebSocket('<ws server url>'));

```
