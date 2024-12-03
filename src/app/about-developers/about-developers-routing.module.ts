import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutDevelopersPage } from './about-developers.page';

const routes: Routes = [
  {
    path: '',
    component: AboutDevelopersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutDevelopersPageRoutingModule {}
