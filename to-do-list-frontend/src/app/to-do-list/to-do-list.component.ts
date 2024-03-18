import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ToDoListAPIService } from '../to-do-list-api.service';
import {CdkMenu, CdkMenuItem, CdkContextMenuTrigger, CdkMenuTrigger} from '@angular/cdk/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

type Item = {
  id: number | null;
  dueDate: number | null;
  title: string;
  description: string;
  completed: boolean;
};

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatFormFieldModule, MatDividerModule, CommonModule, MatButtonModule, CdkMenuItem, MatDatepickerModule,
    MatListModule, MatCheckboxModule, MatIconModule, FormsModule, MatInputModule, CdkMenu, CdkContextMenuTrigger, CdkMenuTrigger],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {
  tasks: Array<Item> = [];
  newTask: Item = {id: null, dueDate: null, title: '', description: '', completed: false};
  selectedTask: Item | null = null;

  constructor(private toDoListAPIService: ToDoListAPIService) {}

  ngOnInit() {
    this.getTasks();
  }

  async addTask() {
    if (this.newTask.title !== '') {
      this.tasks.push((await this.toDoListAPIService.createToDoItem(this.newTask)).data);
      this.newTask.title = '';
      this.newTask.description = '';
    }
  }

  getTasks() {
    this.toDoListAPIService.getToDoList().then((response) => {
      this.tasks = response.data;
    });
  }

  updateTask(task: Item) {
    this.toDoListAPIService.updateItem(task);
  }

  changeTaskCompletion(task: Item) {
    task.completed = !task.completed;
    this.toDoListAPIService.updateItem(task);
  }

  setSelectedTask(task: Item) {
    this.selectedTask = task;
  };

  deleteTask(task: Item) {
    this.toDoListAPIService.deleteItem(task);
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }

  deleteSelectedTask() {
    if(this.selectedTask != null) {
      this.toDoListAPIService.deleteItem(this.selectedTask);
      this.tasks = this.tasks.filter((t) => t.id !== this.selectedTask.id);
      this.selectedTask = null;
    }
  };
}
