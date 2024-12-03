// src/app/auth/auth.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthPage } from './auth.page';  // Declare AuthPage here
import { RouterModule } from '@angular/router';  // Import RouterModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([  // Define child route for AuthPage
      { path: '', component: AuthPage }  // Empty path means this is the default page for /auth route
    ])
  ],
  declarations: [AuthPage],  // Declare AuthPage here
  exports: [AuthPage],       // Export AuthPage if needed in other parts
})
export class AuthPageModule {}
