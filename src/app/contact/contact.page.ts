import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {
  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private toastController: ToastController) {}

  async submitContactForm(contactForm: NgForm) {
    if (contactForm.valid) {
      const toast = await this.toastController.create({
        message: 'Your message has been sent successfully!',
        duration: 2000,
        color: 'success',
      });
      toast.present();

      // Clear form fields after submission
      this.name = '';
      this.email = '';
      this.message = '';
      contactForm.reset();
    } else {
      const toast = await this.toastController.create({
        message: 'Please fill in all fields before submitting.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
