import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule) },   {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'adult',
    loadChildren: () => import('./adult/adult.module').then( m => m.AdultPageModule)
  },
  {
    path: 'puppy',
    loadChildren: () => import('./puppy/puppy.module').then( m => m.PuppyPageModule)
  },
  {
    path: 'treats',
    loadChildren: () => import('./treats/treats.module').then( m => m.TreatsPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'about-developers',
    loadChildren: () => import('./about-developers/about-developers.module').then( m => m.AboutDevelopersPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  
// Add the profile route
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
