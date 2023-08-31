import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AddComponent } from './add/add.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AddComponent,
    DashboardComponent,
    DetailsComponent,
    EditComponent,
    ListComponent,
  ],

  imports: [
    CommonModule,
    RouterModule,
  ],
  
  exports: [
    DashboardModule
  ]
})
export class DashboardModule { }
