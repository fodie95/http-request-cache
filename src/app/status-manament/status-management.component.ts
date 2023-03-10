import { Component } from '@angular/core';
import {StatusService} from "../services/status.service";
import {RequiredValidator, UntypedFormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Status} from "../models/todo.model";

@Component({
  selector: 'app-status-manament',
  templateUrl: './status-management.component.html',
  styleUrls: ['./status-management.component.scss']
})
export class StatusManagementComponent {

  status$:Observable<Status[]>  =  this.statusService.all()
  statusForm =  this.fb.group({
    name:[null, [Validators.required]]
  });
  constructor(private statusService:StatusService,private fb:UntypedFormBuilder) {
  }

  save() {
    const status =  {...this.statusForm.value, id:this.generateId()}
    this.statusService.save(status).subscribe((data)=>{
      this.loadStatus()
  })
  }

  private generateId() {
    return new Date().getTime();
  }

  delete(status:Status) {
    this.statusService.delete(status.id).subscribe(()=>{
      this.loadStatus();
    })
  }

  private loadStatus() {
    this.status$ = this.statusService.all();
  }
}
