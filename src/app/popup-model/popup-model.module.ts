import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopupModelPageRoutingModule } from './popup-model-routing.module';

import { PopupModelPage } from './popup-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopupModelPageRoutingModule
  ],
  declarations: [PopupModelPage]
})
export class PopupModelPageModule {}
