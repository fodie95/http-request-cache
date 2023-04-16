import {Observable} from "rxjs";
import {Status,} from "../models/todo.model";
import {HttpClient} from "@angular/common/http";
<<<<<<< Updated upstream
import {CacheManager,} from "../cache-layer/decorator";
import {liveQuery} from "dexie";
import {db} from "../cache-layer/cache-store";


@CacheManager({storageName: 'status'})
export class StatusService {
  private readonly apiUrl = "/api/v1/status"

  constructor(public http: HttpClient) {
  }


=======
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

>>>>>>> Stashed changes
  all(): Observable<Status[]> {
    return this.http.get<Status[]>(this.apiUrl)
  }


  save(status: Status): Observable<Status> {
    return this.http.post<Status>(this.apiUrl, status)
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

<<<<<<< Updated upstream
  allFromDb() {
    return liveQuery<Status[]>(() => db.findAll<Status>('status'))
=======
  fetchFromCache() {
    return this.cacheManagerStrategy.getAll("status")
>>>>>>> Stashed changes
  }
}
