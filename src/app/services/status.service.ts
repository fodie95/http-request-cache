import {Observable} from "rxjs";
import {Status,} from "../models/todo.model";
import {HttpClient} from "@angular/common/http";
import {CacheManager,} from "../cache-layer/decorator";
import {liveQuery} from "dexie";
import {db} from "../cache-layer/cache-store";


@CacheManager({storageName: 'status'})
export class StatusService {
  private readonly apiUrl = "/api/v1/status"

  constructor(public http: HttpClient) {
  }


  all(): Observable<Status[]> {
    return this.http.get<Status[]>(this.apiUrl)
  }


  save(status: Status): Observable<Status> {
    return this.http.post<Status>(this.apiUrl, status)
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  allFromDb() {
    return liveQuery<Status[]>(() => db.findAll<Status>('status'))
  }
}
