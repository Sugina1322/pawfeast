import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  // Navigate to the Adult page
  goToAdultPage() {
    console.log("Navigate to Adult page");
    this.router.navigate(['/adult']);
  }

  // Navigate to the Puppy page
  goToPuppyPage() {
    console.log("Navigate to Puppy page");
    this.router.navigate(['/puppy']);
  }

  // Navigate to the Treats page
  goToTreatPage() {
    console.log("Navigate to Treats page");
    this.router.navigate(['/treats']);
  }

  // Navigate to the Profile page
  goToProfile() {
    console.log("Navigate to Profile page");
    this.router.navigate(['/profile']);
  }
}
