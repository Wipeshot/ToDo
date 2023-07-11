import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-comp',
  templateUrl: './todo-comp.component.html',
  styleUrls: ['./todo-comp.component.scss']
})
export class TodoCompComponent {
  @Input() todo: any;
  @Output() updateTodo = new EventEmitter<any>();

  handleInput(event: any) {
    let value = (event.target as HTMLInputElement)?.checked;
    const updatedTodo = { ...this.todo, completet: value };
    this.updateTodo.emit({"event":"update", "todo": updatedTodo});
  }

  handleDelete(event: any) {
    this.updateTodo.emit({"event": "delete", "todo": this.todo});
  }
}
