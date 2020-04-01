"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
function ws(socket) {
    return input$ => new rxjs_1.Observable(o => {
        let sub;
        socket.onopen = () => {
            sub = input$.subscribe(x => socket.send(x), err => o.error(err), () => o.complete());
        };
        socket.onmessage = ({ data }) => o.next(data);
        socket.onerror = (e) => o.error(e);
        socket.onclose = () => o.complete();
        return () => {
            // if the consumer unsubscribe, input complete or in case of error, close the connection.
            sub === null || sub === void 0 ? void 0 : sub.unsubscribe();
            socket.close();
        };
    });
}
exports.ws = ws;
