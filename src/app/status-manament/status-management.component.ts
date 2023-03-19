import {Component, OnInit} from '@angular/core';
import {StatusService} from "../services/status.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Status} from "../models/todo.model";

@Component({
  selector: 'app-status-manament',
  templateUrl: './status-management.component.html',
  styleUrls: ['./status-management.component.scss']
})
export class StatusManagementComponent implements OnInit {

  status$: Observable<Status[]> = this.statusService.all()
  statusForm = this.fb.group({
    name: [null, [Validators.required]]
  });
  statuss: Status[] = [];

  constructor(public statusService: StatusService, private fb: UntypedFormBuilder) {
  }

  save() {
    const status = {...this.statusForm.value, id: this.generateId()}
    this.statusService.save(status).subscribe((data) => {
    })

  }

  delete(status: Status) {
    this.statusService.delete(status.id).subscribe(() => {
    })
  }

  ngOnInit(): void {
    this.statusService.allFromDb().subscribe((data) => this.statuss = data)

  }

  private generateId() {
    return new Date().getTime();
  }

  private loadStatus() {
    this.status$ = this.statusService.all();
  }
}
