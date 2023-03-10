import {Component, OnInit} from '@angular/core';
import {finalize, first, Observable} from "rxjs";
import {Status, Todo} from "../models/todo.model";
import {StatusService} from "../services/status.service";
import {TodoService} from "../services/todo.service";
import {db} from "../cache-layer/cache-store";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{
  statusList: Status[] =  []
  spinning  = true
  constructor(private statusService:StatusService,private todoService:TodoService) {
  }

  todos$ :Observable<Todo[]> =  this.todoService.all()
  ngOnInit(): void {
    this.statusService.all().subscribe((data)=> {
      this.statusList =  data
      this.spinning = false
    })
  }

}
