import { HttpErrorResponse } from '@angular/common/http';
import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoItem } from './todoitem';
import { TodoItemService } from './todoitem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoapp';
  items: TodoItem[] = [];
  deleteItem!: TodoItem;
  editItem!: TodoItem;
  constructor(private todoItemService: TodoItemService){}
  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks(): void{
    this.todoItemService.getTasks().subscribe(
      (response: TodoItem[]) => {
        this.items = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddTask(addForm: NgForm): void{
    this.todoItemService.addTask(addForm.value).subscribe(
      (response: TodoItem)=>{
        this.getTasks();
        alert(`Task: ${response.title} added successfully.`);
        addForm.reset();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onEditTask(todoItem: TodoItem): void{
    this.todoItemService.updateTask(todoItem).subscribe(
      (response: TodoItem)=>{
        this.getTasks();
        alert(`Task: ${response.title} updated successfully.`);
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public onDeleteTask(id: any): void{
    this.todoItemService.deleteTask(id).subscribe(
      (response: void)=>{
        this.getTasks();
        alert("Task Deleted Successfully.")
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }


  public onOpenModal(todoItem: any, mode: String): void{
    const container = document.getElementById("container");
    const button = document.createElement('button');
    button.type = "button";
    button.style.display = 'none';
    button.setAttribute("data-toggle", "modal");
    if(mode=="delete"){
      this.deleteItem = todoItem;
      button.setAttribute("data-target", "#deleteItemModal");
    }else if(mode=="update"){
      this.editItem = todoItem;
      button.setAttribute("data-target", "#updateItemModal");
    }
    container?.appendChild(button);
    button.click();
  }

  public onStateChange(todoItem: TodoItem){
    todoItem.done = !todoItem.done;
    this.todoItemService.updateTask(todoItem).subscribe(
      (response: TodoItem)=>{
        this.getTasks();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

}
