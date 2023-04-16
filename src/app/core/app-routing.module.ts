import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {TodoListComponent} from "../todo-list/todo-list.component";
import {TodoCreateComponent} from "../todo-create/todo-create.component";
import {StatusManagementComponent} from "../status-manament/status-management.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
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
  ]
  , exports: [RouterModule]
})
export class AppRoutingModule {
}
