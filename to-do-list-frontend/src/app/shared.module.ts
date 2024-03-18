import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CdkMenu, CdkMenuItem, CdkContextMenuTrigger, CdkMenuTrigger } from '@angular/cdk/menu';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule,
    CdkMenu,
    CdkMenuItem,
    CdkContextMenuTrigger,
    CdkMenuTrigger,
    MatNativeDateModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule,
    CdkMenu,
    CdkMenuItem,
    CdkContextMenuTrigger,
    CdkMenuTrigger,
    MatNativeDateModule,
  ]
})
export class SharedModule { }