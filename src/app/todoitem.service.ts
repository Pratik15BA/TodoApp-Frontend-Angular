import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {HttpClient} from '@angular/common/http';
import { environment } from "src/environments/environment";
import { TodoItem } from "./todoitem";

@Injectable({
    providedIn:'root'
})
export class TodoItemService{
    private apiServerUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient){}

    public getTasks(): Observable<TodoItem[]>{
        return this.http.get<any>(`${this.apiServerUrl}/`);
    }

    public addTask(todoItem: TodoItem): Observable<TodoItem>{
        return this.http.post<TodoItem>(`${this.apiServerUrl}/`, todoItem);
    }

    public updateTask(todoItem: TodoItem): Observable<TodoItem>{
        return this.http.put<TodoItem>(`${this.apiServerUrl}/`, todoItem);
    }
    
    public deleteTask(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/${id}`);
    }
}