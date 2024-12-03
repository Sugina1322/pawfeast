import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuppyPageRoutingModule } from './puppy-routing.module';

import { PuppyPage } from './puppy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuppyPageRoutingModule
  ],
  declarations: [PuppyPage]
})
export class PuppyPageModule {}
