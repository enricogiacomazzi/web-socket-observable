import { Observable } from 'rxjs';
export function ws(url, protocols = null) {
    return input$ => {
        const _ws = new WebSocket(url, protocols);
        _ws.onopen = () => {
            // sub = config.send$.subscribe(x => {
            // 	_ws.send(typeof x === 'object' ? JSON.stringify(x) : x);
            // });
        };
        const sub = input$.subscribe();
        return new Observable(o => {
            _ws.onclose = () => {
                if (sub) {
                    sub.unsubscribe();
                }
                if (!o.closed) {
                    o.complete();
                }
            };
            _ws.onerror = (e) => {
                o.error(e);
            };
            _ws.onmessage = ({ data }) => {
                try {
                    o.next(JSON.parse(data));
                }
                catch (e) {
                    o.next(data);
                }
            };
            return () => {
                // if the consumer unsubscribe, close the connection.
                _ws.close();
            };
        });
    };
}
