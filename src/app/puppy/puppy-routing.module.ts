import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuppyPage } from './puppy.page';

const routes: Routes = [
  {
    path: '',
    component: PuppyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuppyPageRoutingModule {}
