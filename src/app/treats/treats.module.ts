import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreatsPageRoutingModule } from './treats-routing.module';

import { TreatsPage } from './treats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreatsPageRoutingModule
  ],
  declarations: [TreatsPage]
})
export class TreatsPageModule {}
