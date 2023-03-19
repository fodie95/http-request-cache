import {from, mergeMap, tap} from "rxjs";
import {Status} from "../models/todo.model";
import {StatusService} from "../services/status.service";
import {db} from "./cache-store";
import {Inject, Injectable} from "@angular/core";

abstract class CacheRefresher<T> {
  abstract refreshAll(): void ;

  abstract storageName(): string
}

@Injectable({providedIn: "root"})
export class StatusCacheRefresher extends CacheRefresher<Status> {

  constructor(private statusService: StatusService) {
    super();
  }

  refreshAll(): void {
    from(db.table(this.storageName()).clear())
      .pipe(
        mergeMap(() => this.statusService.all()
          .pipe()
          .pipe(tap((status: Status[]) => db.saveAll(this.storageName(), status))))
      ).subscribe();
  }

  storageName(): string {
    return "status";
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
