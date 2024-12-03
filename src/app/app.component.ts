import { Component, OnInit } from '@angular/core';
import { initializeApp, getApps } from 'firebase/app';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    // Initialize Firebase App
    const app = initializeApp(environment.firebaseConfig);

    // Log the initialized Firebase apps
    console.log('Initialized Firebase Apps: ', getApps());

    // Check if any app is initialized
    if (getApps().length > 0) {
      console.log("Firebase has been initialized.");
    } else {
      console.log("Firebase is not initialized.");
    }
  }
}
