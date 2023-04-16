import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Status, Todo} from "../models/todo.model";
import {StatusService} from "../services/status.service";
import {TodoService} from "../services/todo.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  statusList: Status[] = []
  spinning = true
  todos$: Observable<Todo[]> = this.todoService.all()

  constructor(private statusService: StatusService, private todoService: TodoService) {
  }

  ngOnInit(): void {

    this.statusService.fetchFromCache()
      .subscribe((data) => {
        this.statusList = data
        this.spinning = false
      })
  }

}
