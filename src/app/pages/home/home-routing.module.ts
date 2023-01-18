import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AboutCardComponent } from './about-card/about-card.component';
import { ActivitytableComponent } from './Activity -table/activitytable/activitytable.component';

const routes: Routes = [

];


@NgModule({
  imports: [
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
