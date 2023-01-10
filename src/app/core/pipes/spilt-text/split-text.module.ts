import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpiltTextPipe } from './spilt-text.pipe';



@NgModule({

    declarations: [
      SpiltTextPipe
    ],
    imports: [
      CommonModule
    ],
    exports:[SpiltTextPipe]
})
export class SplitTextModule { }

