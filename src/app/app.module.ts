import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoCreateComponent} from './todo-create/todo-create.component';
import {RouterModule} from "@angular/router";
import {StatusService} from "./services/status.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {StatusManagementComponent} from './status-manament/status-management.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CacheRefreshService} from "./cache-layer/cache-refresh.service";
import {WebsocketService} from "./websocket/websocket.service";
import {CacheHashService} from "./cache-layer/cache-hash.service";
import {cacheManageerInstance} from "./cache-layer/decorator";
import {CacheRefresherRegistry, StatusCacheRefresher} from "./cache-layer/cache-refresher";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoCreateComponent,
    StatusManagementComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'todo/list',
        component: TodoListComponent
      },
      {
        path: 'todo/new',
        component: TodoCreateComponent
      },
      {
        path: 'status/list',
        component: StatusManagementComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'todo/list'
      }
    ]),
    ReactiveFormsModule
  ],
  providers: [{
    provide: StatusService, useFactory: (http: HttpClient) => {
      const statusService = new StatusService(http)
      cacheManageerInstance.set("status", statusService)
      return statusService
    }, deps: [HttpClient]
  },
    {
      provide: CacheRefreshService,
      useFactory: (websocketService: WebsocketService, cacheRefresherRegistry: CacheRefresherRegistry) => {
        const service = new CacheRefreshService(websocketService, cacheRefresherRegistry);
        service.refresh()
        return service
      },
      deps: [WebsocketService, CacheRefresherRegistry]
    },
    {
      provide: APP_INITIALIZER, useFactory: (cacheHashService: CacheHashService) => {
        return cacheHashService.diff()
      }, deps: [CacheHashService]
    },
    {provide: 'cacheRefresher', useClass: StatusCacheRefresher, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
