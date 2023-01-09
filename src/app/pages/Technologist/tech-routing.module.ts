import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';

import { PreviewlistComponent } from './previewActivityList/previewlist/previewlist.component';
import { PreviewRequestComponent } from './previewRequest/preview-request/preview-request.component';

import { TechListComponent } from './tech-list/tech-list.component';
import { TechProfileComponent } from './technologist profile/tech-profile/tech-profile.component';
import { UpdateTechComponent } from './update-tech-profile/update-tech/update-tech.component';
import { UpdateRequestComponent } from './updateRequest/update-request/update-request.component';

const routes: Routes = [
  { path: '', redirectTo: 'previewActivityList', pathMatch: 'full' },
  {
    path: 'Technologist-list',

    component: TechListComponent,
  },
  {
    path: 'tech-profile',

    component: TechProfileComponent,
  },
  {
    path: 'update-tech',
    component: UpdateTechComponent,
  },
  { path: 'previewActivityList', component: PreviewlistComponent },
  {
    path: 'preview-request',
    component: PreviewRequestComponent,
  },
  {
    path: 'update-request',
    component: UpdateRequestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechRoutingModule {}
