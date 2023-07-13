import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../app/interface/todo';

@Component({
  selector: 'app-todo-comp',
  templateUrl: './todo-comp.component.html',
  styleUrls: ['./todo-comp.component.scss'],
})
export class TodoCompComponent {
  @Input() todo?: ToDo;
  @Output() updateTodo = new EventEmitter();
  @Input() tryToUpdate?: boolean;

  handleInput(event: any) {
    let value = (event.target as HTMLInputElement)?.checked;
    this.updateTodo.emit({
      event: 'update',
      todo: { ...this.todo, completet: value },
    });
  }

  handleDelete(event: any) {
    this.updateTodo.emit({ event: 'delete', todo: this.todo });
  }
}
