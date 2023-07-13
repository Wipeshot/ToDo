import { Component } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { ToDo } from 'src/app/interface/todo';
import { map, of, timeout } from 'rxjs';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  public todos: ToDo[];
  public showToDos: boolean = true;
  public showClosedToDos: boolean = true;
  public tryToAddToDo: boolean = false;
  public addToDoError: boolean = false;
  public tryToUpdate: boolean = false;

  constructor(public todoService: TodoService) {
    this.todos = [];
    this.loadData();
  }

  loadData() {
    this.todoService.getToDo().subscribe({
      next: (todos) => {
        this.todos = todos.body as ToDo[];
      },
      error: (error: any) => console.error('FEHLER:', error),
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
    this.tryToUpdate = true;
    if (todo.event === 'delete') {
      this.todoService.delete(todo.todo.id).subscribe({
        next: (todo) => {
          console.log(todo.status);
          if (todo.status === 200) {
            this.loadData();
            this.tryToUpdate = false;
          }
        },
        error: (error: any) => {
          this.tryToUpdate = false;
          console.error(error);
        },
      });
    } else if (todo.event === 'update') {
      this.todoService.update(todo.todo).subscribe({
        next: (todo) => {
          if (todo.status === 200) {
            this.loadData();
            this.tryToUpdate = false;
          }
        },
        error: (error: any) => {
          this.tryToUpdate = false;
          console.error(error);
        },
      });
    }
  }

  createTodo(event: any) {
    this.tryToAddToDo = true;
    this.addToDoError = false;
    let currentDate = new Date();
    let newTodo: ToDo = {
      title: event.title,
      start: `${currentDate.getDate().toString().padStart(2, '0')}:${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}:${currentDate
        .getFullYear()
        .toString()
        .slice(-2)} ${currentDate
        .getHours()
        .toString()
        .padStart(2, '0')}:${currentDate
        .getMinutes()
        .toString()
        .padStart(2, '0')}`,
      deadline: `${new Date(event.deadline)
        .getDate()
        .toString()
        .padStart(2, '0')}:${(new Date(event.deadline).getMonth() + 1)
        .toString()
        .padStart(2, '0')}:${new Date(event.deadline)
        .getFullYear()
        .toString()
        .slice(-2)} ${new Date(event.deadline)
        .getHours()
        .toString()
        .padStart(2, '0')}:${new Date(event.deadline)
        .getMinutes()
        .toString()
        .padStart(2, '0')}`,
      completet: false,
    };

    if (newTodo.title.length < 1) {
      this.tryToAddToDo = false;
      this.addToDoError = true;
      return;
    }

    this.todoService.addToDo(newTodo).subscribe({
      next: (todo) => {
        if (todo.status === 201) {
          this.loadData();
          this.tryToAddToDo = false;
        }
      },
      error: (error: any) => {
        this.tryToAddToDo = false;
        this.addToDoError = true;
        console.error('FEHLER: ', error);
      },
    });
  }

  handleToDoToggle() {
    this.showToDos = !this.showToDos;
  }

  handleClosedToDoToggle() {
    this.showClosedToDos = !this.showClosedToDos;
  }
}
