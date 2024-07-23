import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopupModelPage } from './popup-model.page';

const routes: Routes = [
  {
    path: '',
    component: PopupModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopupModelPageRoutingModule {}
