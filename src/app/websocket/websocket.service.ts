import {Injectable} from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import SockJS from "sockjs-client";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private readonly endpoint = 'http://localhost:8080/ws'
  private stompClient: any;
  private message = new Subject();

  constructor() {
  }

  connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.endpoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe('/topic/entity', (messagge) => {
        console.log("headers", messagge.headers)
        console.log("/topic/entity", JSON.parse(messagge.body))
        const body = JSON.parse(messagge.body)
        debugger
        const hash = messagge.headers['hash']
        this.message.next({...body, hash: hash});
      })
    })
  }

  receive() {
    return this.message.asObservable()
  }
}
