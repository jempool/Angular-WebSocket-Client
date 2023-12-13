import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { AccountService } from '../services/account.service';
import { ChatService } from '../services/chat.service';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  title = 'Websocket Angular client ';
  topic: string = '';
  userName: string = '';
  message: string = '';
  feedback: string = '';
  output: any[] = [];
  @ViewChild('chatScroll') private chatScrollContainer!: ElementRef;

  constructor(
    private webSocketService: WebSocketService,
    private accountService: AccountService,
    private chatService: ChatService,
    private pdfService: PdfService
  ) {}

  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('user')!)?.user?.name;

    this.webSocketService.listen('typing').subscribe((data) => {
      this.updateFeedback(data);
    });

    this.webSocketService
      .listen('chat')
      .subscribe((data) => this.updateMessage(data));

    this.chatService
      .getMessagesHistory()
      .subscribe((messages: any[]) => (this.output = [...messages]));

    this.chatService
      .getTopic()
      .subscribe((topic: any) => (this.topic = topic.topic));

    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatScrollContainer.nativeElement.scrollTop =
        this.chatScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  downloadChatPdf() {
    const outputTitle = ['User', 'Message'];
    this.pdfService.downloadChatPdf(this.topic, this.output, outputTitle);
  }

  messageTyping(): void {
    this.webSocketService.emit('typing', this.userName);
  }

  sendMessage(): void {
    if (this.message) {
      this.webSocketService.emit('chat', {
        message: this.message,
        handle: this.userName,
      });
      this.message = '';
    }
  }

  updateMessage(data: any) {
    this.feedback = '';
    if (!!!data) return;
    this.output.push(data);
  }

  updateFeedback(data: any) {
    this.feedback = `${data} is typing a message`;
  }

  logout() {
    this.accountService.logout();
  }
}
