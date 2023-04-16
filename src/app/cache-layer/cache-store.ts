import Dexie from 'dexie';
import {from} from "rxjs";


export class AppDB<T> extends Dexie {


  bdVersion = 1

  constructor() {
    super('TODO-DB');
    this.version(1).stores({
      status: 'id',
      todo: 'id',
      'cache-hash': 'id'
    })
  }

  createStore<T>(schema: string, index: string) {
    this.version(this.bdVersion++).stores({[schema]: index})
  }

  saveAll<T>(table: string, items: T[]) {

    return this.table(table).bulkDelete(items.map(item => item['id']))
      .then(() => this.table(table).bulkAdd(items))
  }

  async save<T extends { id: number | string }>(table: string, item: T) {
    console.info("saving from cache")
    await this.table(table).delete(item.id)
    return from(this.table(table).add(item)).subscribe();
  }

  async exist<T extends { id: number }>(table: string, item: T) {
    const count = await this.table(table).where('id').equals(item.id).count()
    return count != 0;
  }

  findAll<T>(table: string) {
    return this.table<T>(table).toArray()
  }


  remove(table: string, key: any) {
    this.table(table).delete(key)
  }

  async isTableExist(table: string) {
    if (this.tables.some(name => name.name == table)) {
      const count = await this.table(table).count().catch(() => 0);
      return count != 0
    }
    return false
  }


}

export const db = new AppDB();
