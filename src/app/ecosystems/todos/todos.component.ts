import { Component, OnInit } from '@angular/core'

import { Todo } from '../../classes/todo'
import { TodoService } from '../../services/todo/todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[]

  selectedTodo: Todo
  // todoService creates an asynchronous call for the todo data
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos()
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos)
  }

  add(name: string): void {
    name = name.trim()
    if(!name) { return }
    this.todoService.addTodo({ name } as Todo)
      .subscribe(todo => {
        this.todos.push(todo)
      })
  }

  delete(todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo)
    this.todoService.deleteTodo(todo).subscribe()
    //You need to subscribe  even if you dont do anything with the observable
    //the request doesn't go to the server unless it's subscribed
  }
}
