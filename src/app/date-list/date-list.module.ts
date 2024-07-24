import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateListPageRoutingModule } from './date-list-routing.module';

import { DateListPage } from './date-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateListPageRoutingModule
  ],
  declarations: [DateListPage]
})
export class DateListPageModule {}
