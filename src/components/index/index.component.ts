import { Component } from '@angular/core';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  todos: {
    id: number;
    title: any;
    start: string;
    deadline: any;
    completet: boolean;
  }[] = [];

  getCompletetTodos() {
    let completetTodos = [];
    for (let todo of this.todos) {
      if (todo.completet) {
        completetTodos.push(todo);
      }
    }
    return completetTodos;
  }

  getOpenTodos() {
    let openTodos = [];
    for (let todo of this.todos) {
      if (!todo.completet) {
        openTodos.push(todo);
      }
    }
    return openTodos;
  }

  handleChange(todo: any) {
    if (todo.event === 'delete') {
      this.todos = this.todos.filter((element) => element !== todo.todo);
    } else if (todo.event === 'update') {
      const index = this.todos.findIndex((t) => t.id === todo.todo.id);
      if (index !== -1) {
        this.todos[index] = todo.todo;
      }
    }
  }

  createTodo(event: any) {
    let currentDate = new Date();
    let newTodo: {
      id: number;
      title: any;
      start: string;
      deadline: any;
      completet: boolean;
    } = {
      id: this.todos.length,
      title: event.title,
      start: `${currentDate.getDate().toString().padStart(2, '0')}:${(currentDate.getMonth() + 1).toString().padStart(2, '0')}:${currentDate.getFullYear().toString().slice(-2)} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`,
      deadline: `${new Date(event.deadline).getDate().toString().padStart(2, '0')}:${(new Date(event.deadline).getMonth() + 1).toString().padStart(2, '0')}:${new Date(event.deadline).getFullYear().toString().slice(-2)} ${new Date(event.deadline).getHours().toString().padStart(2, '0')}:${new Date(event.deadline).getMinutes().toString().padStart(2, '0')}`,
      completet: false,
    };
    
    this.todos.push(newTodo);
  }
  
}
