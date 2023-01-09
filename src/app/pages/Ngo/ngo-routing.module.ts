import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveRequestComponent } from './approve-request/approve-request/approve-request.component';
import { ActivityListComponent } from './ngo-activity-list/activity-list/activity-list.component';

import { CreateActivityComponent } from './ngo-activity/create-activity/create-activity.component';
import { NgoListComponent } from './ngo-list/ngo-list/ngo-list.component';
import { NgoProfileComponent } from './ngo-profile/ngo-profile/ngo-profile.component';
import { RequestComponent } from './request/request/request.component';

import { UpdateNgoComponent } from './update-ngo-profile/update-ngo/update-ngo.component';

const routes: Routes = [
  {
    path:'Ngo-profile',
    component:NgoProfileComponent
    },
    {
      path:'activity-list',
      component:ActivityListComponent
    },
    {path:'create-activity',
    component:CreateActivityComponent},
    {
      path:'Ngo-list',
      component:NgoListComponent
    },
    {
      path:'update-ngo',
      component:UpdateNgoComponent
    },
    {
      path:'request',
      component: RequestComponent
    },

    {path:'approve-request',
component:ApproveRequestComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgoRoutingModule { }
