import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { SharedModule } from '../shared.module';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../dialog/edit-dialog.component';
import { CreateDialogComponent } from '../dialog/create-dialog.component';
import { ToDoListAPIService } from '../to-do-list-api.service';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { formatDate } from '@angular/common';

export type Item = {
  id: number | null;
  dueDate: Date | null;
  title: string;
  description: string;
  completed: boolean;
};

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [ SharedModule, EditDialogComponent, CreateDialogComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  fetchedTasks: Array<Item> = [];
  tasks: Array<Item> = [];

  newTask: Item = {id: null, dueDate: null, title: '', description: '', completed: false};
  selectedTask: Item | null = null;

  dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private toDoListAPIService: ToDoListAPIService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getTasks();
  }

  addTask() {
    if (this.newTask.title !== '') {
      this.toDoListAPIService.createToDoItem(this.newTask).then((response) => {
        this.fetchedTasks.push(response.data);
        this.filterTasks();
      }).catch((err) => console.log(err));
      this.newTask = {id: null, dueDate: null, title: '', description: '', completed: false};
    }
  }

  getTasks() {
    this.toDoListAPIService.getToDoList().then((response) => {
      this.fetchedTasks = response.data;
      this.filterTasks();
    }).catch((err) => console.log(err));
  }

  updateTask(task: Item) {
    this.toDoListAPIService.updateItem(task).then(() => {
      this.filterTasks();
    }).catch((err) => console.log(err));
  }

  changeTaskCompletion(task: Item) {
    const oldStatus = task.completed;
    task.completed = !task.completed;
    this.toDoListAPIService.updateItem(task).catch((err) => {
      console.log(err);
      task.completed = oldStatus;
    });
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

  openEditDialog() {
    const dialogRef = this.dialog.open(EditDialogComponent, {data: this.selectedTask, restoreFocus: false});
    //Restore focus
    dialogRef.afterClosed().subscribe((result) => {
      this.updateTask(result.data);
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateDialogComponent, { restoreFocus: false});
    //Restore focus
    dialogRef.afterClosed().subscribe((result) => {
      this.newTask = result.data;
      this.addTask();
      this.newTask = {id: null, dueDate: null, title: '', description: '', completed: false};
    });
  }

  filterTasks(){
    this.tasks = this.fetchedTasks.filter((task) => {
      if (this.dateRange.value.start && formatDate(task.dueDate,'yyyy-MM-dd','en_US') < formatDate(this.dateRange.value.start,'yyyy-MM-dd','en_US')) {
        return false;
      }
      if (this.dateRange.value.end && formatDate(task.dueDate,'yyyy-MM-dd','en_US') > formatDate(this.dateRange.value.end,'yyyy-MM-dd','en_US')) {
        return false;
      }
      return true;
    });
  }

  clearFilter(){
    this.dateRange.setValue({start: null, end: null});
    this.filterTasks();
  }

}
