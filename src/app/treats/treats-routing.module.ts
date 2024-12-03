import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreatsPage } from './treats.page';

const routes: Routes = [
  {
    path: '',
    component: TreatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreatsPageRoutingModule {}
