import { Component, Input, Output, EventEmitter, AfterViewInit, inject } from '@angular/core';
import { ToDo } from '../../app/interface/todo';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-todo-comp',
  templateUrl: './todo-comp.component.html',
  styleUrls: ['./todo-comp.component.scss'],
})
export class TodoCompComponent {  

  @Input() todo?: ToDo;
  @Output() updateTodo = new EventEmitter();
  @Input() tryToUpdate?: boolean;

  description: boolean = false;
  descCollapse: boolean = false;

  handleInput(event: any) {
    let value = (event.target as HTMLInputElement)?.checked;
    this.updateTodo.emit({
      event: 'update',
      todo: { ...this.todo, completet: value },
    });
  }

  handleDelete() {
    this.updateTodo.emit({ event: 'delete', todo: this.todo });
  }

  routeToUpdate() {
    this.updateTodo.emit({ event: 'routing', todo: this.todo });
  }

  showDesc() {
    this.description = !this.description;
  }
}
