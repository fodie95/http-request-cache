import {Component} from '@angular/core';
import {StatusService} from "../services/status.service";
import {Status} from "../models/todo.model";

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent {
  statusOptions: Status[]

  constructor(private statusService: StatusService) {
    this.statusService.allFromDb()
      .subscribe((data) => {
        this.statusOptions = data
      })

  }

  save() {
    this.statusService.save({id: 10, name: 'Blocked'})
      .subscribe()


  }
}
