// src/app/splash/splash.page.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  progress = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.simulateLoading();
  }

  simulateLoading() {
    const interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 1;
      } else {
        clearInterval(interval);
        this.router.navigate(['/auth']);  // Change '/login' to '/auth'
      }
    }, 30); 
  }
}
