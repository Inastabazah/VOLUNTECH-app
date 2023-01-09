import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/pages/home/header/header.component';
import { ImgGalleryComponent } from 'src/app/pages/home/img-gallery/img-gallery.component';
import { DemoDirective } from 'src/app/pages/home/img-gallery/demo.directive';
import { CardSectionComponent } from 'src/app/pages/home/card-section/card-section.component';
import { AboutCardComponent } from 'src/app/pages/home/about-card/about-card.component';
import { FoundationalCardComponent } from 'src/app/pages/home/foundational-card/foundational-card.component';
import { FooterComponent } from 'src/app/pages/home/footer/footer.component';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { ActivitytableComponent } from './Activity -table/activitytable/activitytable.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    HeaderComponent,
    ImgGalleryComponent,
    DemoDirective,
    CardSectionComponent,
    AboutCardComponent,
    FoundationalCardComponent,
    FooterComponent,
    HomeComponent,
    ActivitytableComponent,

  ],


  imports: [CommonModule,
    MatCardModule,
    RouterModule.forChild([{path:'',component:HomeComponent}]),
    MatIconModule,
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

  ],
  exports:[
    HeaderComponent,
    ImgGalleryComponent,
    DemoDirective,
    CardSectionComponent,
    AboutCardComponent,
    FoundationalCardComponent,
    FooterComponent,
    HomeComponent,
    ActivitytableComponent,

  ]
})
export class HomeModule {}
