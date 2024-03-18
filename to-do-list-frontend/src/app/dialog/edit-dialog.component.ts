import { Component, Inject} from '@angular/core';
import { SharedModule } from '../shared.module';
import { Item } from '../to-do-list/to-do-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ SharedModule],
})
export class EditDialogComponent{

  title = "Edit task";
  buttonText = "Save";

  task: Item;
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item ) 
      {
        this.task = this.data;
      }

  doAction(){
    this.dialogRef.close({data: this.task});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
};
