import {Observable} from "rxjs";
import {Status,} from "../models/todo.model";
import {HttpClient} from "@angular/common/http";
import {inject, Inject, Injectable} from "@angular/core";
import {CacheStorage} from "../cache-layer/cache.models";
import {Store} from "@ngrx/store";
import {CacheManager} from "../cache-layer/decorator";


@Injectable({providedIn: "root"})
export class StatusService {
  cacheManagerStrategy = inject(CacheManager);
  private readonly apiUrl = "/api/v1/status"

  constructor(private http: HttpClient,
              @Inject('APPCONFIG') private appConfig: { cacheStore: CacheStorage },
              private store: Store) {
  }


  //@RefreshCache({storageName: 'status'})

  all(): Observable<Status[]> {
    return this.http.get<Status[]>(this.apiUrl)
  }


  save(status: Status): Observable<Status> {
    return this.http.post<Status>(this.apiUrl, status)
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  fetchFromCache() {
    return this.cacheManagerStrategy.getAll("status")
  }
}
