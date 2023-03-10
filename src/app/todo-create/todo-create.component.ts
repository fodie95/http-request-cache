import { Component } from '@angular/core';
import {StatusService} from "../services/status.service";
import {Observable} from "rxjs";
import {Status} from "../models/todo.model";

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent {
  constructor(private statusService:StatusService) {
  }
  status$: Observable<Status[]> = this.statusService.all();

  save() {
    this.statusService.save({id:10,name :'Blocked'})
      .subscribe()
  }
}
