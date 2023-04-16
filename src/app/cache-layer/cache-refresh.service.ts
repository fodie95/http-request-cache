import {Injectable} from '@angular/core';
import {WebsocketService} from "../websocket/websocket.service";
import {db} from "./cache-store";
import {CacheRefresherRegistry} from "./cache-core";
import {CacheEventPayload, StorageName} from "./cache.models";


@Injectable({
  providedIn: 'root'
})
export class CacheRefreshService {
  constructor(private websocketService: WebsocketService, private cacheRefresherRegistry: CacheRefresherRegistry) {
  }

  refresh() {
    this.websocketService.receive().subscribe((cacheEventPayload: CacheEventPayload) => {
      db.save('cache-hash', {id: cacheEventPayload.storage, hash: cacheEventPayload.hash})
        .then(() => {
          if (!document.hidden) {
            this.cacheRefresherRegistry.get(cacheEventPayload.storage).refreshOne(cacheEventPayload.payload, cacheEventPayload.type)
          }
        })
    })
  }


  refreshAll(storageNames: (StorageName | string)[]) {
    return storageNames.map((storageName) => {
      debugger
      this.cacheRefresherRegistry.get(storageName).refreshAll()
    })
  }

}
