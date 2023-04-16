import {Injectable} from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import SockJS from "sockjs-client";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

<<<<<<< Updated upstream
  private readonly endpoint = 'http://localhost:8080/ws'
=======
  private readonly endpoint = `/ws`
>>>>>>> Stashed changes
  private stompClient: any;
  private message = new Subject();

  constructor() {
  }

  connect() {
    console.log("Initialize WebSocket Connection");
<<<<<<< Updated upstream
    let ws = new SockJS(this.endpoint);
    this.stompClient = Stomp.over(ws);
=======
    this.stompClient = Stomp.over(function () {
      return new SockJS("http://localhost/ws");
    });

    this.stompClient.reconnect_delay = 1000
>>>>>>> Stashed changes
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe('/topic/entity', (messagge) => {
        console.log("headers", messagge.headers)
        console.log("/topic/entity", JSON.parse(messagge.body))
        const body = JSON.parse(messagge.body)
<<<<<<< Updated upstream
        debugger
        const hash = messagge.headers['hash']
        this.message.next({...body, hash: hash});
=======
        const {hash, storage} = messagge.headers
        this.message.next({...body, hash: hash, storage: storage});
      }, () => {
        console.log("disconnection occur s")
>>>>>>> Stashed changes
      })
    })
  }

  receive() {
    return this.message.asObservable()
  }
}
