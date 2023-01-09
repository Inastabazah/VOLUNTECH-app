import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateActivityComponent } from './ngo-activity/create-activity/create-activity.component';
import { NgoListComponent } from './ngo-list/ngo-list/ngo-list.component';
import { NgoProfileComponent } from './ngo-profile/ngo-profile/ngo-profile.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateNgoComponent } from './update-ngo-profile/update-ngo/update-ngo.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';


import {MatRadioModule} from '@angular/material/radio';
import { ActivityListComponent } from './ngo-activity-list/activity-list/activity-list.component';
import { ApproveRequestComponent } from './approve-request/approve-request/approve-request.component';

import { RequestComponent } from './request/request/request.component';
import { NgoRoutingModule } from './ngo-routing.module';


@NgModule({
  declarations: [
    CreateActivityComponent,
    NgoListComponent,
    NgoProfileComponent,
    ActivityListComponent,
    UpdateNgoComponent,


    ApproveRequestComponent,
    RequestComponent

  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatRadioModule,
    MatMenuModule,
    NgoRoutingModule

  ],
  exports:[  CreateActivityComponent,
    NgoListComponent,
    NgoProfileComponent,
    ActivityListComponent,
    UpdateNgoComponent,

   ]
})
export class NgoModule { }
