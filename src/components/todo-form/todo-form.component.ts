import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ToDo } from '../../app/interface/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  @Output() newTodo = new EventEmitter<ToDo>();
  @Input() clickedAdd?: boolean;
  @Input() creationError?: boolean;

  todoTitle: string = '';
  todoDeadline: string = '';

  dateNow: Date = new Date();

  addTodo(event: any) {
    this.newTodo.emit({ title: this.todoTitle, deadline: this.todoDeadline, description: "" });
    this.todoTitle = '';
    if (this.creationError) {
      this.todoDeadline = '';
    }
  }
}
