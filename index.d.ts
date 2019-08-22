import { Observable } from 'rxjs';
export interface ObservableSocketConfig {
    url: string;
    protocols?: string | string[];
    send$?: Observable<any>;
}
export declare function webSocketObservable(config: ObservableSocketConfig): Observable<any>;
