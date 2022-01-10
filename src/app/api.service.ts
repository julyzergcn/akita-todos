import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from './todos-store';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly todosUrl = environment.baseUrl + '/api/todos/';

  constructor(
    private http: HttpClient
  ) { }

  addTodo(title: string, description?: string): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, {title, description});
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl);
  }

  deleteTodo(id: number): Observable<Todo> {
    return this.http.delete<Todo>(this.todosUrl + `/${id}/`);
  }

  updateTodo(id: number, changes: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.todosUrl + `/${id}/`, changes);
  }
}
