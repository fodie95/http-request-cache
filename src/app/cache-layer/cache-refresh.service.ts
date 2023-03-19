import {Injectable} from '@angular/core';
import {WebsocketService} from "../websocket/websocket.service";
import {db} from "./cache-store";
import {CacheRefresherRegistry} from "./cache-refresher";


type EventType = 'UPDATE' | 'DELETE' | 'CREATE'

type StorageName = 'status'

@Injectable({
  providedIn: 'root'
})
export class CacheRefreshService {
  constructor(private websocketService: WebsocketService, private cacheRefresherRegistry: CacheRefresherRegistry) {
  }

  refresh() {
    this.websocketService.receive().subscribe((message: { type: EventType, payload: any, storage: string, hash: string }) => {
      if (!document.hidden) {
        this.eventHandler(message.type, message.payload, message.hash)
      } else {
        setTimeout(() => {
          this.eventHandler(message.type, message.payload, message.hash)
        }, 100)
      }
      console.log("tab is inactive")
    })
  }


  refreshAll(storageNames: (StorageName | string)[]) {
    storageNames.forEach((storageName) => {
      db.table(storageName).clear()
        .then(() => {
          this.cacheRefresherRegistry.get(storageName).refreshAll()
        });
    })
  }

  eventHandler(type: EventType, payload: any, hash: string) {
    switch (type) {
      case "CREATE":
      case "UPDATE":
        console.log('saving', payload)
        db.save('cache-hash', {id: 1, name: 'status', hash: hash}, 'name')
        db.save('status', payload)
          .catch()
        break;
      case "DELETE":
        db.remove('status', payload.id)
        break;
    }
  }
}
