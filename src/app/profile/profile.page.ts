import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: string = ''; // Placeholder for username
  phoneNumber: string = ''; // Placeholder for phone number
  profilePicUrl: string = ''; // Placeholder for profile picture URL

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    // Fetch user profile data when the page initializes
    const userProfile = await this.authService.getUserProfile();

    if (userProfile) {
      this.username = userProfile['username'] || 'No username available';
      this.phoneNumber = userProfile['phoneNumber'] || 'No phone number available';
      this.profilePicUrl = userProfile['profilePicUrl'] || ''; // Load profile picture URL
    } else {
      this.username = 'Not logged in';
      this.phoneNumber = 'Not available';
    }
  }

  // Trigger the hidden file input
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  // Handle file selection
  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const downloadUrl = await this.authService.uploadProfilePicture(file);

      if (downloadUrl) {
        this.profilePicUrl = downloadUrl; // Update the UI with the new profile picture URL
        this.presentToast('Profile picture uploaded successfully!', 'success');
      } else {
        this.presentToast('Failed to upload profile picture.', 'danger');
      }
    }
  }

  // Edit Username Method
  async editUsername() {
    const alert = await this.alertController.create({
      header: 'Edit Username',
      inputs: [
        {
          name: 'newUsername',
          type: 'text',
          placeholder: 'Enter new username',
          value: this.username,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: async (data) => {
            if (data.newUsername.trim()) {
              const success = await this.authService.updateUsername(data.newUsername);
              if (success) {
                this.username = data.newUsername;
                this.presentToast('Username updated successfully!', 'success');
              } else {
                this.presentToast('Failed to update username.', 'danger');
              }
            } else {
              this.presentToast('Username cannot be empty.', 'danger');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // Utility method to show a toast
  private async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }
}
