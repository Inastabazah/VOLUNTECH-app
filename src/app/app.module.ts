import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './pages/auth/auth.module';
import { HomeModule } from './pages/home/home.module';
import { LayoutsModule } from './core/components/layouts/layouts.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TechModule } from './pages/Technologist/tech.module';
import { NgoModule } from './pages/Ngo/ngo.module';





@NgModule({
  declarations: [
    AppComponent,










  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TechModule,
    MatIconModule,
    AuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule,
    HomeModule,
    LayoutsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,

    NgoModule

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
