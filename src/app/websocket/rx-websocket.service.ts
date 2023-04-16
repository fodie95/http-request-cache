import {Injectable} from '@angular/core';
import {RxStomp} from "@stomp/rx-stomp";
import SockJS from "sockjs-client";

@Injectable({
  providedIn: 'root'
})
export class RxWebsocketService {

  constructor() {
  }

  connect() {
    console.log("connnect")
    const rxStomp = new RxStomp();

    rxStomp.configure({
      webSocketFactory: () => new SockJS("http://localhost/ws"),
    });
    rxStomp.activate();
    rxStomp.watch("/topic/entity").subscribe((data) => {
      console.log(data)
    })
  }
}
