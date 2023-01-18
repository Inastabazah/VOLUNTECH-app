import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AboutCardComponent } from 'src/app/pages/home/about-card/about-card.component';
import { ActivitytableComponent } from 'src/app/pages/home/Activity -table/activitytable/activitytable.component';
import { AuthGuard } from '../../guards/auth.guard';
import { NotAuthGuard } from '../../guards/not-auth.guard';
import { LayoutComponent } from './layout/layout.component';


const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0,64],
  onSameUrlNavigation: 'ignore'
};
const routes: Routes = [
  { path: 'about', component: AboutCardComponent },
  { path: 'activity', component: ActivitytableComponent },
  {
    path: '',
    redirectTo: 'tech',
    pathMatch: 'full',
  },

  {
    path: 'tech',
    loadChildren: () =>
      import('src/app/pages/Technologist/tech.module').then(
        (m) => m.TechModule
      ),
    canLoad:[AuthGuard]
  },
  {
    path: 'ngo',
    loadChildren: () =>
      import('src/app/pages/Ngo/ngo.module').then((m) => m.NgoModule),
      canLoad:[AuthGuard]
    },
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/pages/auth/auth.module').then((m) => m.AuthModule),
      canLoad:[NotAuthGuard]
    },

  {
    path: 'home',
    loadChildren: () =>
      import('src/app/pages/home/home.module').then((m) => m.HomeModule),
canLoad:[NotAuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule.forRoot(routes, routerOptions),],
  exports: [RouterModule],
})
export class LayoutsRoutingModule {}
