import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutDevelopersPageRoutingModule } from './about-developers-routing.module';

import { AboutDevelopersPage } from './about-developers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutDevelopersPageRoutingModule
  ],
  declarations: [AboutDevelopersPage]
})
export class AboutDevelopersPageModule {}
