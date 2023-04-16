<<<<<<< Updated upstream
import { Component } from '@angular/core';
import {WebsocketService} from "./websocket/websocket.service";
import {CacheRefreshService} from "./cache-layer/cache-refresh.service";
=======
import {Component} from '@angular/core';
import {WebsocketService} from "./websocket/websocket.service";
import {RxWebsocketService} from "./websocket/rx-websocket.service";
>>>>>>> Stashed changes

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'caching athelier';

  menu = [
    {
      id: 'todo-list',
      title: 'todos list',
      route: '/todo/list',
      active: true
    }
    , {
      id: 'new-todo',
      title: 'create todo',
      route: '/todo/new'
    }, {
      id: '/status/list',
      title: 'status management',
      route: '/status/list'
    }
  ]

<<<<<<< Updated upstream
  constructor(private websocketService:WebsocketService,private cacheRefreshService:CacheRefreshService) {
   this.websocketService.connect()
  }

  activeMenu(m: { id: string; title: string; route: string,active?:boolean }) {
    this.menu.forEach((m)=>m.active =  false)
    m.active =  true
=======
  constructor(private websocketService: WebsocketService,
              private rx: RxWebsocketService) {
    this.websocketService.connect()
    //this.rx.connect()
  }

  activeMenu(m: { id: string; title: string; route: string, active?: boolean }) {
    this.menu.forEach((m) => m.active = false)
    m.active = true
>>>>>>> Stashed changes
  }
}
