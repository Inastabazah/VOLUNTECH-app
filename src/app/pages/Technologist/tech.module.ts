import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';

import { TechListComponent } from './tech-list/tech-list.component';
import { RouterModule } from '@angular/router';
import { TechProfileComponent } from './technologist profile/tech-profile/tech-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { UpdateTechComponent } from './update-tech-profile/update-tech/update-tech.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { TechRoutingModule } from './tech-routing.module';
import { PreviewlistComponent } from './previewActivityList/previewlist/previewlist.component';
import { PreviewRequestComponent } from './previewRequest/preview-request/preview-request.component';
import { UpdateRequestComponent } from './updateRequest/update-request/update-request.component';



@NgModule({
  declarations: [
    TechListComponent,
    TechProfileComponent,
    UpdateTechComponent,

    PreviewlistComponent,
     PreviewRequestComponent,
     UpdateRequestComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSortModule,
    MatRadioModule,
    TechRoutingModule
  ],


})
export class TechModule { }
