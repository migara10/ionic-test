import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BioModelPage } from './bio-model.page';

const routes: Routes = [
  {
    path: '',
    component: BioModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BioModelPageRoutingModule {}
