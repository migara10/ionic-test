import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BioModelPageRoutingModule } from './bio-model-routing.module';

import { BioModelPage } from './bio-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BioModelPageRoutingModule
  ],
  declarations: [BioModelPage]
})
export class BioModelPageModule {}
