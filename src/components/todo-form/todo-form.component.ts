import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {

  @Output() newTodo = new EventEmitter<any>();

  todoTitle: string = '';
  todoDeadline: string = '';

  addTodo(event: any) {
    this.newTodo.emit({"title": this.todoTitle, "deadline": this.todoDeadline});
    this.todoTitle = '';
    this.todoDeadline = '';
  }
}
