import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  title = 'Websocket Angular client ';
  userName: string = '';
  message: string = '';
  feedback: string = '';
  output: any[] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('user')!)?.user?.name;
    this.webSocketService.listen('typing').subscribe((data) => {
      this.updateFeedback(data);
    });
    this.webSocketService
      .listen('chat')
      .subscribe((data) => this.updateMessage(data));
  }

  messageTyping(): void {
    this.webSocketService.emit('typing', this.userName);
  }

  sendMessage(): void {
    this.webSocketService.emit('chat', {
      message: this.message,
      handle: this.userName,
    });
    this.message = '';
  }

  updateMessage(data: any) {
    this.feedback = '';
    if (!!!data) return;
    this.output.push(data);
  }

  updateFeedback(data: any) {
    this.feedback = `${data} is typing a message`;
  }
}
