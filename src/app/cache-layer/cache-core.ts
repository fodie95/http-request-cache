import {from, Observable} from "rxjs";
import {Status} from "../models/todo.model";
import {StatusService} from "../services/status.service";
import {db} from "./cache-store";
import {inject, Inject, Injectable} from "@angular/core";
import {CacheableEntity, EventType} from "./cache.models";
import {CacheManager} from "./decorator";
import {EntityStateApiRegistry} from "./cacheableEntityActionDispatcher";


//move to core
interface CacheManager<T extends CacheableEntity> {
  put(storageName: string, item: T);

  remove(storageName: string, item: T);

  putAll(storageName, item: T[]);

  getAll(storageName): Observable<T[]>
}


@Injectable()
export class IndexDbCacheManager<T extends CacheableEntity> implements CacheManager<T> {

  constructor(@Inject('APP_DB') private db) {
  }


  put(storageName: string, item: T) {
    db.save(storageName, item)
      .catch(() => console.log('failed to refresh cache '))
  }

  putAll(storageName, item: T[]) {
    db.saveAll(storageName, item)
      .catch(() => console.log('failed to refresh cache '))
  }

  remove(storageName: string, item: T) {
    db.remove(storageName, item)

  }

  getAll(storageName): Observable<T[]> {
    return from(db.findAll<T>(storageName));
  }
}


@Injectable()
export class StateManagementCacheManager<T extends CacheableEntity> implements CacheManager<T> {

  constructor(private entityStateApiRegistry: EntityStateApiRegistry) {
  }

  put(storageName: string, item: T) {
    this.entityStateApiRegistry.get(storageName).add(item)
  }

  putAll(storageName, item: T[]) {
    this.entityStateApiRegistry.get(storageName).addAll(item)

  }

  remove(storageName: string, item: T) {
    this.entityStateApiRegistry.get(storageName).remove(item)
  }

  getAll(storageName): Observable<T[]> {
    return this.entityStateApiRegistry.get(storageName).all()
  }

}


abstract class CacheRefresher<T extends CacheableEntity> {
  abstract cacheManagerStrategy: CacheManager<T>

  refreshOne(item: T, eventType: EventType) {
    switch (eventType) {
      case "CREATE":
      case "UPDATE":
        this.cacheManagerStrategy.put(this.storageName(), item);
        break
      case "DELETE":
        this.cacheManagerStrategy.remove(this.storageName(), item)
        break;
    }
  };

  abstract fetchAll(): Observable<T[]>;

  refreshAll() {
    this.fetchAll()
      .subscribe((items: T[]) => {
        this.cacheManagerStrategy.putAll(this.storageName(), items)
      })
  }

  abstract storageName(): string
}

@Injectable({providedIn: "root"})
export class StatusCacheRefresher extends CacheRefresher<Status> {

  cacheManagerStrategy: CacheManager<Status> = inject(CacheManager);

  constructor(private statusService: StatusService) {
    super();
  }

  storageName(): string {
    return "status";
  }

  fetchAll(): Observable<Status[]> {
    return this.statusService.all();
  }
}

@Injectable({providedIn: "root"})
export class CacheRefresherRegistry {
  private registry: Map<string, CacheRefresher<any>> = new Map<string, CacheRefresher<any>>()

  constructor(@Inject('cacheRefresher') private cacheRefresh: CacheRefresher<any>[]) {
    cacheRefresh.forEach(cacheRefresh => {
      this.registry.set(cacheRefresh.storageName(), cacheRefresh)
    })
  }

  get(storageName: string): CacheRefresher<any> {
    return this.registry.get(storageName)
  }
}
