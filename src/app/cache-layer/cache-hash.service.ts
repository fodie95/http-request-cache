import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {db} from "./cache-store";
import {CacheRefreshService} from "./cache-refresh.service";


interface CacheHash {
  name: string,
  hash: string
}

@Injectable({
  providedIn: 'root'
})
export class CacheHashService {

  private db = db

  constructor(private http: HttpClient, private cacheRefreshService: CacheRefreshService) {
  }


  all(): Observable<Set<CacheHash>> {
    return this.http.get<Set<CacheHash>>('api/v1/cache-hash');
  }

  diff() {
    return this.db.findAll('cache-hash').then((cacheHashes) => {
      this.http.post<Array<CacheHash>>('api/v1/cache-hash/diff', cacheHashes)
        .pipe(tap((caches) => this.db.saveAll('cache-hash', caches, 'name')))
        .pipe((map((cacheHashes: CacheHash[]) => cacheHashes.map(cacheHash => cacheHash.name))))
        .toPromise()
        .then(storageNames => {
          if (storageNames.length)
            debugger
          this.cacheRefreshService.refreshAll(storageNames)
        })
    })


  }
}
