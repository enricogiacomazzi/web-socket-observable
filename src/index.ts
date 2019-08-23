import { Observable, Subscription } from 'rxjs';

export interface ObservableSocketConfig {
	url: string;
	protocols?: string | string[];
	send$?: Observable<any>
  }
  
export function webSocketObservable(config: ObservableSocketConfig): Observable<any> {
	let sub: Subscription;
  
	return Observable.create(o => {
	  const _ws = new WebSocket(config.url, config.protocols);
  
	  _ws.onclose = () => {
		if(sub) {
		  sub.unsubscribe();
		}
  
		if(!o.closed) {
		  o.complete();
		}
	  };

	  _ws.onerror = (e) => {
		  o.error(e);
	  };

	  _ws.onmessage = ({data}) => {
		try{
		  o.next(JSON.parse(data));
		} 
		catch {
		  o.next(data);
		}
	  };
  
	  _ws.onopen = () => {
		if(config.send$) {
		  sub = config.send$.subscribe(x => {
			_ws.send(typeof x === 'object' ? JSON.stringify(x) : x);
		  });
		}
	  };

	  return () => {
	  	// if the consumer unsubscribe, close the connection.
		_ws.close();
	  }
	});
  }
