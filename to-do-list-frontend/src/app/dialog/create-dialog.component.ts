import { Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../shared.module';
import { Item } from '../to-do-list/to-do-list.component';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ SharedModule],
})
export class CreateDialogComponent{

  title = "Create task";
  buttonText = "Create";

  task: Item = {id: null, dueDate: null, title: '', description: '', completed: false};

  constructor(public dialogRef: MatDialogRef<CreateDialogComponent>) {}

  doAction(){
    this.dialogRef.close({data: this.task});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
};
