import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class WebSocketService {
  socket: Socket;

  constructor() {
    const { accessToken } = JSON.parse(localStorage.getItem('user') || '');
    this.socket = io(environment.apiUrl, {
      query: { token: accessToken }
    });
  }

  listen(eventname: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventname, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventname: string, data: any) {
    this.socket.emit(eventname, data);
  }
}
