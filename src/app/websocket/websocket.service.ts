import {Injectable} from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import SockJS from "sockjs-client";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private readonly endpoint = `/ws`
  private stompClient: any;
  private message = new Subject();

  constructor() {
  }

  connect() {
    console.log("Initialize WebSocket Connection");
    this.stompClient = Stomp.over(function () {
      return new SockJS("http://localhost/ws");
    });

    this.stompClient.reconnect_delay = 1000
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe('/topic/entity', (messagge) => {
        console.log("headers", messagge.headers)
        console.log("/topic/entity", JSON.parse(messagge.body))
        const body = JSON.parse(messagge.body)
        const {hash, storage} = messagge.headers
        this.message.next({...body, hash: hash, storage: storage});
      }, () => {
        console.log("disconnection occur s")
      })
    })
  }

  receive() {
    return this.message.asObservable()
  }
}
