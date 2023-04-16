export type EventType = 'UPDATE' | 'DELETE' | 'CREATE'

export  type StorageName = 'status'

export interface CacheEventPayload {
  type: EventType;
  payload: any;
  storage: StorageName;
  hash: string;
}

export type CacheableEntity = { id: number }


export type  CacheStorage = 'INDEX_DB' | 'STATE_MANAGEMENT'
