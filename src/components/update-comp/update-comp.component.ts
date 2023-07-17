import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDo } from 'src/app/interface/todo';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  templateUrl: './update-comp.component.html',
  styleUrls: ['./update-comp.component.scss']
})
export class UpdateCompComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, public todoService: TodoService, private router: Router) { }
  id?: number;
  todo: ToDo = {};
  onUpdate: boolean = false;

  todoTitle?: string = this.todo.title;
  todoDeadline?: Date = this.todo.deadlineVal;
  todoDescription?: string = this.todo.description;

  cancel() {
    this.router.navigate(["/"]);
  }

  update() {
    let newTodo: ToDo = this.todo;
    if(this.todoTitle) newTodo.title = this.todoTitle;
    if(this.todoDeadline) {
      newTodo.deadlineVal = this.todoDeadline;
      newTodo.deadline = `${new Date(this.todoDeadline)
        .getDate()
        .toString()
        .padStart(2, '0')}:${(new Date(this.todoDeadline).getMonth() + 1)
        .toString()
        .padStart(2, '0')}:${new Date(this.todoDeadline)
        .getFullYear()
        .toString()
        .slice(-2)} ${new Date(this.todoDeadline)
        .getHours()
        .toString()
        .padStart(2, '0')}:${new Date(this.todoDeadline)
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
    }
    if(this.todoDescription) newTodo.description = this.todoDescription;
    this.onUpdate = true;
    this.todoService.update(newTodo).subscribe({
      next: (todo) => {
        if(todo.status === 200) {
          this.todo = todo.body as ToDo;
          this.router.navigate(["/"]);
        } else {
          this.onUpdate = false;
        }
      },
      error: (error) => {
        this.onUpdate = false;
        console.error(error);
      }
    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if(this.id) {
      this.todoService.getToDoForId(this.id).subscribe(
        {
          next: (todo) => this.todo = todo.body as ToDo,
          error: (error) => console.error(error)
        }
      );
    }
  }
}
