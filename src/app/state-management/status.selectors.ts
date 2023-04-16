import {createSelector} from "@ngrx/store";
import {selectAll} from "./status.reducer";
import {Status} from "../models/todo.model";

export const selectAllStatus = createSelector(selectAll, (statuses: Status[]) =>
  statuses
);
