import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Status} from "../models/todo.model";


export const loadStatuss = createAction(
  '[Status] Load Statuss',
  props<{ statuss: Status[] }>()
);

export const addStatus = createAction(
  '[Status] Add Status',
  props<{ status: Status }>()
);

export const upsertStatus = createAction(
  '[Status] Upsert Status',
  props<{ status: Status }>()
);

export const addStatuss = createAction(
  '[Status] Add Statuss',
  props<{ statuss: Status[] }>()
);

export const upsertStatuss = createAction(
  '[Status] Upsert Statuss',
  props<{ statuss: Status[] }>()
);

export const updateStatus = createAction(
  '[Status] Update Status',
  props<{ status: Update<Status> }>()
);

export const updateStatuss = createAction(
  '[Status] Update Statuss',
  props<{ statuss: Update<Status>[] }>()
);

export const deleteStatus = createAction(
  '[Status] Delete Status',
  props<{ id: number }>()
);

export const deleteStatuss = createAction(
  '[Status] Delete Statuss',
  props<{ ids: string[] }>()
);

export const clearStatuss = createAction(
  '[Status] Clear Statuss'
);

