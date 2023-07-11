import { Component } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { ToDo } from 'src/app/interface/todo';
import { timeout } from 'rxjs';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {

  public todos: ToDo[];

  constructor(public todoService: TodoService) {
    this.todos = [];
    this.loadData();
  }

  loadData() {
    this.todoService.getToDo().subscribe((data: ToDo[]) => {
      this.todos = data;
    }, error => {
      console.error(error);
    });
  }

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
      console.log("Trying to delete " + todo.todo.id);
      this.todoService.delete(todo.todo.id).subscribe();
      
    } else if (todo.event === 'update') {
      const index = this.todos.findIndex((t) => t.id === todo.todo.id);
      if (index !== -1) {
        this.todos[index] = todo.todo;
      }
    }
    this.loadData();
  }

  createTodo(event: any) {
    let currentDate = new Date();
    let newTodo: ToDo = {
      title: event.title,
      start: `${currentDate.getDate().toString().padStart(2, '0')}:${(currentDate.getMonth() + 1).toString().padStart(2, '0')}:${currentDate.getFullYear().toString().slice(-2)} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`,
      deadline: `${new Date(event.deadline).getDate().toString().padStart(2, '0')}:${(new Date(event.deadline).getMonth() + 1).toString().padStart(2, '0')}:${new Date(event.deadline).getFullYear().toString().slice(-2)} ${new Date(event.deadline).getHours().toString().padStart(2, '0')}:${new Date(event.deadline).getMinutes().toString().padStart(2, '0')}`,
      completet: false,
    };
    
    this.todoService.addToDo(newTodo).subscribe((data: ToDo) => {
      console.log(data);
      this.loadData();
    }, error => {
      console.log(error);
    });
  }
  
}
