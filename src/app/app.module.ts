import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import {RouterModule} from "@angular/router";
import {StatusService} from "./services/status.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { StatusManagementComponent } from './status-manament/status-management.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoCreateComponent,
    StatusManagementComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'todo/list',
        component: TodoListComponent
      },
      {
        path: 'todo/new',
        component: TodoCreateComponent
      },
      {
        path: 'status/list',
        component: StatusManagementComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'todo/list'
      }
    ]),
    ReactiveFormsModule
  ],
  providers: [{provide:StatusService,useFactory:(http:HttpClient)=>new StatusService(http),deps:[HttpClient]}],
  bootstrap: [AppComponent]
})
export class AppModule { }
