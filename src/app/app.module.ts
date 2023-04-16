<<<<<<< Updated upstream
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

=======
import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
>>>>>>> Stashed changes
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoCreateComponent} from './todo-create/todo-create.component';
<<<<<<< Updated upstream
import {RouterModule} from "@angular/router";
import {StatusService} from "./services/status.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
=======
import {HttpClientModule} from "@angular/common/http";
>>>>>>> Stashed changes
import {StatusManagementComponent} from './status-manament/status-management.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CacheRefreshService} from "./cache-layer/cache-refresh.service";
import {WebsocketService} from "./websocket/websocket.service";
import {CacheHashService} from "./cache-layer/cache-hash.service";
<<<<<<< Updated upstream
import {cacheManageerInstance} from "./cache-layer/decorator";
import {CacheRefresherRegistry, StatusCacheRefresher} from "./cache-layer/cache-refresher";
=======
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
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  providers: [{
    provide: StatusService, useFactory: (http: HttpClient) => {
      const statusService = new StatusService(http)
      cacheManageerInstance.set("status", statusService)
      return statusService
    }, deps: [HttpClient]
  },
=======
  providers: [
>>>>>>> Stashed changes
    {
      provide: CacheRefreshService,
      useFactory: (websocketService: WebsocketService, cacheRefresherRegistry: CacheRefresherRegistry) => {
        const service = new CacheRefreshService(websocketService, cacheRefresherRegistry);
        service.refresh()
        return service
      },
      deps: [WebsocketService, CacheRefresherRegistry]
    },
<<<<<<< Updated upstream
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
=======
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


>>>>>>> Stashed changes
}
