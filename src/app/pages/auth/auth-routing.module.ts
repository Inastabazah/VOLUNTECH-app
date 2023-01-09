import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';
import { LoginComponent } from './login/login.component';
import { NgoSignupComponent } from './ngo-signup/ngo-signup.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{path:'',component:HomeComponent},


{

    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'ngo-signup',
    component:NgoSignupComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
