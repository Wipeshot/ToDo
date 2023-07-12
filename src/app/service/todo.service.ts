import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, lastValueFrom } from "rxjs";
import { ToDo } from "../interface/todo";

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private url = "http://localhost:3000";

    constructor(
        private http: HttpClient
    ) {}

    public getToDo() {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            }),
        }
        return this.http.get(`${this.url}/todos`, {observe: "response"});
    }

    public addToDo(todo: ToDo) {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            }),
        }
        return this.http.post(`${this.url}/todos`, todo, {observe: "response"})
    }

    public delete(id: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            }),
        }
        return this.http.delete(`${this.url}/todos/${id}`, {observe: "response"})
    }

    public update(todo: ToDo) {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            }),
        }
        return this.http.put(`${this.url}/todos/${todo.id}`, todo, {observe: "response"});
    }
}