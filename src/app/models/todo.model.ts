import {CacheableEntity} from "../cache-layer/cache.models";


export interface Status extends CacheableEntity {
  name: string
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  status?: Status,
}
