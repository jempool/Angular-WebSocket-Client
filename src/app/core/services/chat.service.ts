import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http: HttpClient) {}

  getMessagesHistory() {
    return this.http.get<any[]>(`${environment.apiUrl}/chat/history`).pipe(
      map((messages) => {
        return messages;
      })
    );
  }
}
