import {Injectable} from "@angular/core";
import {Todo} from "../models/todo.model";
import {debounceTime, Observable, of} from "rxjs";


const StatusName = [
  "completed",
  "in progress",
  "pending"
]


export function generateTodo(): Todo {
  const id = Math.floor(Math.random() * 1000) + 1;
  const title = `Todo ${id}`;
  const description = `This is a description for Todo ${id}`;
  const statusId = Math.floor(Math.random() * 3) + 1;
  const status = {
    id: statusId,
    name: StatusName[statusId],
  };

  return {
    id,
    title,
    description,
    status,
  };
}


@Injectable({providedIn: 'root'})
export class TodoService {


  all(): Observable<Todo[]> {
    return of(Array.from({length: 15}, generateTodo)).pipe(debounceTime(1000))
  }
}
