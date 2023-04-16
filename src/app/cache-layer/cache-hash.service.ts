import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {db} from "./cache-store";
import {CacheRefreshService} from "./cache-refresh.service";


interface CacheHash {
  id: string,
  hash: string
}

@Injectable({
  providedIn: 'root'
})
export class CacheHashService {

  private db = db

  constructor(private http: HttpClient, private cacheRefreshService: CacheRefreshService) {
  }

  diff() {
    return this.db.findAll('cache-hash').then((cacheHashes) => {
      return this.http.post<Array<CacheHash>>('api/v1/cache-hash/diff', cacheHashes)
        .toPromise()
        .then((cacheHashes: CacheHash[]) => {
          return this.db.saveAll('cache-hash', cacheHashes)
            .then((res) => {
                this.cacheRefreshService.refreshAll(cacheHashes.map(cacheHash => cacheHash.id))
              }
            )
        })
    })
  }
}
