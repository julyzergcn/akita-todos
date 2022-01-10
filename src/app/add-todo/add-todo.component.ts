import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { TodosQuery, TodosStore } from '../todos-store';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private todosStore: TodosStore,
    private todosQuery: TodosQuery
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  addTodo() {
    console.log(this.form.value);
    this.todosStore.setLoading(true);
    let todo = this.form.value;
    this.apiService.addTodo(todo)
  }

}
