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
<<<<<<< Updated upstream
    this.statusService.allFromDb()
=======
    this.statusService.fetchFromCache()
>>>>>>> Stashed changes
      .subscribe((data) => {
        this.statusOptions = data
      })

  }

  save() {
    this.statusService.save({id: 10, name: 'Blocked'})
      .subscribe()

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  }
}
