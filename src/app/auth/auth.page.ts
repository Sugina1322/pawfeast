import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; // Import the AuthService

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';  // Add username
  phoneNumber: string = '';  // Add phoneNumber
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  isLoginMode: boolean = true;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService // Inject the AuthService
  ) {}

  ngOnInit() {}

  // Email validation regex
  private validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  // Password validation: at least 6 characters, 1 uppercase, 1 lowercase, and 1 number
  private validatePassword(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
    return regex.test(password);
  }

  async onLogin() {
    if (!this.email || !this.password) {
      await this.showToast('Please enter both email and password.', 'danger');
      return;
    }

    if (!this.validateEmail(this.email)) {
      await this.showToast('Please enter a valid email address.', 'danger');
      return;
    }

    await this.authService.login(this.email, this.password); // Use authService for login
  }

  async onRegister() {
    if (!this.email || !this.password || !this.confirmPassword || !this.username || !this.phoneNumber) {
      await this.showToast('Please fill in all fields.', 'danger');
      return;
    }

    if (this.password !== this.confirmPassword) {
      await this.showToast('Passwords do not match.', 'danger');
      return;
    }

    if (!this.validateEmail(this.email)) {
      await this.showToast('Please enter a valid email address.', 'danger');
      return;
    }

    if (!this.validatePassword(this.password)) {
      await this.showToast(
        'Password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.',
        'danger'
      );
      return;
    }

    await this.authService.register(this.email, this.password, this.username, this.phoneNumber); // Use authService for register
  }

  async onResetPassword() {
    if (!this.email) {
      await this.showToast('Please enter your email to reset the password.', 'danger');
      return;
    }

    await this.authService.resetPassword(this.email); // Use authService for password reset
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }
}
