import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoCreateComponent} from './todo-create/todo-create.component';
import {HttpClientModule} from "@angular/common/http";
import {StatusManagementComponent} from './status-manament/status-management.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CacheRefreshService} from "./cache-layer/cache-refresh.service";
import {WebsocketService} from "./websocket/websocket.service";
import {CacheHashService} from "./cache-layer/cache-hash.service";
import {CacheRefresherRegistry, StateManagementCacheManager, StatusCacheRefresher} from "./cache-layer/cache-core";
import {db} from "./cache-layer/cache-store";
import {from} from "rxjs";
import {StateManagementModule} from "./core/state-management.module";
import {AppRoutingModule} from "./core/app-routing.module";
import {CacheManager} from "./cache-layer/decorator";
import {CacheStorage} from "./cache-layer/cache.models";
import {StatusStateApi} from "./cache-layer/cacheableEntityActionDispatcher";

const appConfig: { cacheStore: CacheStorage } = {
  cacheStore: "INDEX_DB"
}

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
    StateManagementModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: CacheRefreshService,
      useFactory: (websocketService: WebsocketService, cacheRefresherRegistry: CacheRefresherRegistry) => {
        const service = new CacheRefreshService(websocketService, cacheRefresherRegistry);
        service.refresh()
        return service
      },
      deps: [WebsocketService, CacheRefresherRegistry]
    },
    {provide: 'cacheRefresher', useClass: StatusCacheRefresher, multi: true},
    {provide: 'actionDispatcher', useClass: StatusStateApi, multi: true},
    {provide: 'APP_DB', useValue: db},
    {provide: 'APPCONFIG', useValue: appConfig},
    {provide: CacheManager, useClass: StateManagementCacheManager}
  ]
})
export class AppModule implements DoBootstrap {

  constructor(private cacheHashService: CacheHashService) {
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    const updateNode = document.getElementById("msd")
    updateNode.hidden = false
    from(this.cacheHashService.diff())
      .subscribe(() => {
        updateNode.hidden = true
        appRef.bootstrap(AppComponent)
      })
  }


}
