import { Component, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { Item } from '../to-do-list/to-do-list.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ CommonModule, MatDialogContent, MatDialogActions, MatDialogClose, MatCardModule, MatFormFieldModule,
    MatDatepickerModule, MatInput, FormsModule, MatInputModule, MatButtonModule],
})
export class EditDialogComponent{
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
