import {AppDB} from "./cache-store";
import {finalize, from, map, mergeMap, Observable, of, take, tap} from "rxjs";
import {environment} from "../../environments/environment.development";

interface CacheOptions {
  storageName: string,
}

export const cacheManageerInstance = new Map<String, any>()

export function CacheManager(options: CacheOptions) {
  return (constructor: Function) => {
    {
      console.log(constructor.prototype)

      cacheManageerInstance.set(options.storageName, constructor.prototype)
    }
  }
}

export  type CacheRefresher = { instance: any, method: any }
const db = new AppDB()
export const cacheRefresherRegistry = new Map<String, CacheRefresher>();

const cacheItemKeyRegistry: Map<any, Map<string, number[]>> = new Map()

function CacheItemKeyCollectors(propertyKey: string, parameterIndex: number, target: any) {
  const methodParamMap = new Map()
  methodParamMap.set(propertyKey, [parameterIndex])
  cacheItemKeyRegistry.set(target, methodParamMap)
}

export function CacheItemKey(target: any, propertyKey: string, parameterIndex: number) {
  console.info('target ', target)
  console.info('property  ', propertyKey)
  console.info('index ', parameterIndex)
  CacheItemKeyCollectors(propertyKey, parameterIndex, target);
}


export const RefreshCache = <T>(options: CacheOptions) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

    const originalFunction = descriptor.value
    console.info(`Refreshing cache storage name ${options.storageName}`)
    descriptor.value = (...args: any[]): Observable<T[]> => {
      debugger
      return (originalFunction.apply(this, args) as Observable<T[]>)
        .pipe(mergeMap((data: T[]) => {
          return from(db.saveAll<T>(options.storageName, data))
            .pipe(map(keys => data)).pipe(take(1))
            .pipe(finalize(() => console.log('Cache Refresed')))
        }))
    }
    cacheRefresherRegistry.set(options.storageName, {
      instance: this,
      method: propertyKey,
    })

  }
}

export function CacheAll<T>(options: CacheOptions) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalFunction = descriptor.value
    console.log('target ', target)
    console.log('propertykey ', propertyKey)
    console.log('descriptor ', descriptor)

    descriptor.value = function (...args: any[]): Observable<T[]> {
      return from(db.isTableExist(options.storageName))
        .pipe(mergeMap((cached: boolean) => {
          if (cached && environment.enableCaching) {
            console.info('fetched from cache')
            return from(db.findAll(options.storageName)) as Observable<T[]>
          }
          return (originalFunction.apply(this, args) as Observable<T[]>)
            .pipe(mergeMap((data: T[]) => {
              if (!environment.enableCaching) {
                console.info("caching is disabled")
                return of(data)
              }
              console.info('store created ', options.storageName)
              return from(db.saveAll<T>(options.storageName, data)).pipe(map(keys => data)).pipe(take(1))
            }))
        }))
    }
  }
}

export function CacheOne<T extends { id: number }>(options: CacheOptions) {

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalFunction = descriptor.value

    if (!environment.enableCaching) {
      console.info(" caching is disabled")
      return
    }
    descriptor.value = function (...args: any[]): Observable<T> {
      return (originalFunction.apply(this, args) as Observable<T>)
        .pipe(mergeMap((data: T) => {
          // db.createStore(options.table, 'id')
          console.info('storing new item  ', options.storageName)
          return from(db.save<T>(options.storageName, data)).pipe(map(keys => data)).pipe(take(1))
        }))
    }
  }
}


export function PurgeOne<T>(options: CacheOptions) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalFunction = descriptor.value
    const methodParamsIndex = cacheItemKeyRegistry?.get(target)
    const itemIdIndex = methodParamsIndex.has(propertyKey) ? methodParamsIndex?.get(propertyKey)[0] : 0
    descriptor.value = function (...args: any[]) {
      return (originalFunction.apply(this, args) as Observable<T>)
        .pipe(tap(() => db.remove(options.storageName, args[itemIdIndex])))
    }
  }
}
