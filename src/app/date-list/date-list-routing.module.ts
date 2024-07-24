import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateListPage } from './date-list.page';

const routes: Routes = [
  {
    path: '',
    component: DateListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateListPageRoutingModule {}
