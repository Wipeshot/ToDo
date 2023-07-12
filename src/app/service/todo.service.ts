import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, lastValueFrom } from "rxjs";
import { ToDo } from "../interface/todo";

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private url = "http://64ad8630b470006a5ec613c9.mockapi.io/api";

    constructor(
        private http: HttpClient
    ) {}

    public getToDo(): Observable<ToDo[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        }
        return this.http.get<ToDo[]>(`${this.url}/ToDo`, httpOptions);
    }

    public addToDo(todo: ToDo): Observable<ToDo> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            }),
        }
        return this.http.post<ToDo>(`${this.url}/ToDo`, todo, httpOptions)
    }

    public delete(id: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        }
        return this.http.delete(`${this.url}/ToDo/${id}`, httpOptions)
    }

    public update(todo: ToDo) {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        }
        return this.http.put(`${this.url}/ToDo/${todo.id}`, todo, httpOptions);
    }
}