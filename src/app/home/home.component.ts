import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, filter, switchMap, tap } from 'rxjs';
import { ApiService } from '../api.service';

import { Todo, TodosQuery, TodosStore } from '../todos-store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  loading$: Observable<boolean> = this.todosQuery.selectLoading();
  todos$: Observable<Todo[]> = this.todosQuery.selectAll();

  constructor(
    private router: Router,
    private todosQuery: TodosQuery,
    private todosStore: TodosStore,
    private apiService: ApiService
  ) {
    this.todosStore.setLoading(true);
    this.apiService.getTodos().subscribe((todos: Todo[]) => {
      this.todosStore.set(todos);
      this.todosStore.setLoading(false);
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.todosQuery.selectLoading().pipe(
      tap(isLoading => {
        console.log('--- isLoading', isLoading);
      }),
      // filter(isLoading => !isLoading),
      // tap(isLoading => {
      //   console.log('--- isLoading(2)', isLoading);
      // }),
      // switchMap(noop => {
      //   return this.apiService.getTodos();
      // })
    ).subscribe(_ => {})
    // .subscribe((todos: Todo[]) => {
    //   console.log('---', todos)
    //   this.todosStore.set(todos);
    // })
  }

  addTodo() {
    this.router.navigateByUrl('/add-todo');
  }
}
