import {debounceTime, from, map, mergeMap, Observable, of, take} from "rxjs";
import {Status, } from "../models/todo.model";
import {HttpClient} from "@angular/common/http";
import {CacheAll, CacheItemKey, CacheOne, PurgeOne,} from "../cache-layer/decorator";


const statusValues: Status[] = [
  { id: 1, name: "Completed" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "Pending" },
];






export class StatusService{


  private  readonly  sttausApiUrl =  "/api/v1/status"
  status =  [...statusValues]
  constructor(private http:HttpClient) {
  }


  @CacheAll<Status>({storageName:'status'})
  all():Observable<Status[]> {
    return  this.http.get<Status[]>(this.sttausApiUrl).pipe(debounceTime(2000));
  }


  @CacheOne({storageName:'status'})
  save(status:Status) : Observable<Status> {
    return this.http.post<Status>(this.sttausApiUrl,status)
  }


  @PurgeOne({storageName:'status'})
  delete(@CacheItemKey id :number):Observable<void>{
    return  this.http.delete<void>(`${this.sttausApiUrl}/${id}`)
  }
}
