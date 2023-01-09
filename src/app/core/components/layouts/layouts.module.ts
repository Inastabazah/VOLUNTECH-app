import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeModule } from 'src/app/pages/home/home.module';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LayoutsRoutingModule } from './layouts-routing.module';





@NgModule({
    declarations: [
        LayoutComponent,
        SideNavBarComponent,

    ],
    exports: [LayoutComponent,
        SideNavBarComponent],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatButtonModule ,
        HomeModule,
        RouterModule,
        MatInputModule,
        MatProgressSpinnerModule,
        LayoutsRoutingModule,




    ]

})
export class LayoutsModule { }
