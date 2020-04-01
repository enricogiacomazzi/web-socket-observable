import {MonoTypeOperatorFunction, Observable, Subscription} from 'rxjs';


export function ws(socket: WebSocket): MonoTypeOperatorFunction<string | Blob | ArrayBuffer> {
	return input$ => new Observable(o => {
		let sub: Subscription;

		socket.onopen = () => {
			sub = input$.subscribe(
				x => socket.send(x),
				err =>  o.error(err),
				() => o.complete()
			);
		};


		socket.onmessage = ({data}) => o.next(data);
		socket.onerror = (e) => o.error(e);
		socket.onclose = () => o.complete();

		return () => {
			// if the consumer unsubscribe, input complete or in case of error, close the connection.
			sub?.unsubscribe();
			socket.close();
		}
	});
}




