import {createFeature, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import * as StatusActions from './status.actions';
import {Status} from "../models/todo.model";

export const statusesFeatureKey = 'statuses';

export interface StatusState extends EntityState<Status> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Status> = createEntityAdapter<Status>();

export const initialState: StatusState = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(StatusActions.addStatus,
    (state, action) => adapter.addOne(action.status, state)
  ),
  on(StatusActions.upsertStatus,
    (state, action) => adapter.upsertOne(action.status, state)
  ),
  on(StatusActions.addStatuss,
    (state, action) => adapter.addMany(action.statuss, state)
  ),
  on(StatusActions.upsertStatuss,
    (state, action) => adapter.upsertMany(action.statuss, state)
  ),
  on(StatusActions.updateStatus,
    (state, action) => adapter.updateOne(action.status, state)
  ),
  on(StatusActions.updateStatuss,
    (state, action) => adapter.updateMany(action.statuss, state)
  ),
  on(StatusActions.deleteStatus,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(StatusActions.deleteStatuss,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(StatusActions.loadStatuss,
    (state, action) => adapter.setAll(action.statuss, state)
  ),
  on(StatusActions.clearStatuss,
    state => adapter.removeAll(state)
  ),
);

export const statusesFeature = createFeature({
  name: statusesFeatureKey,
  reducer,
  extraSelectors: ({selectStatusesState}) => ({
    ...adapter.getSelectors(selectStatusesState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = statusesFeature;
