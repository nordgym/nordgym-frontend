import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertComponent} from './alert.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AlertComponent],
  exports: [AlertComponent],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class AlertModule { }
