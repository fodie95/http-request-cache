import {CacheableEntity} from "./cache.models";
import {Inject, Injectable} from "@angular/core";
import {Status} from "../models/todo.model";
import {Store} from "@ngrx/store";
import {addStatus, addStatuss, deleteStatus} from "../state-management/status.actions";
import {Observable} from "rxjs";
import {selectAllStatus} from "../state-management/status.selectors";

abstract class CacheableEntityStateApi<T extends CacheableEntity> {
  abstract readonly name: string

  abstract add(item: T);

  abstract addAll(item: T[]);

  abstract remove(item: T);

  abstract all(): Observable<T[]>
}


@Injectable()
export class StatusStateApi extends CacheableEntityStateApi<Status> {

  readonly name: string = 'status';

  constructor(private store: Store<{ statuses: Status[] }>) {
    super()
  }

  add(item: Status) {
    this.store.dispatch(addStatus({status: item}))
  }

  addAll(item: Status[]) {
    this.store.dispatch(addStatuss({statuss: item}))
  }

  remove(item: Status) {
    this.store.dispatch(deleteStatus({id: item.id}))
  }

  all(): Observable<Status[]> {
    return this.store.select(selectAllStatus)
  }

}

@Injectable({providedIn: "root"})
export class EntityStateApiRegistry {
  private registry: Map<string, CacheableEntityStateApi<any>> = new Map<string, CacheableEntityStateApi<any>>()

  constructor(@Inject('actionDispatcher') private actionsDispatchers: CacheableEntityStateApi<any>[]) {
    actionsDispatchers.forEach(actionDispatcher => {
      this.registry.set(actionDispatcher.name, actionDispatcher)
    })
  }

  get(storageName: string): CacheableEntityStateApi<any> {
    return this.registry.get(storageName)
  }
}

