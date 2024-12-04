import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';
  phoneNumber: string = '';
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  isLoginMode: boolean = true;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService,
    private loadingController: LoadingController
  ) {}

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  private async showLoading(message: string) {
    const loading = await this.loadingController.create({
      message,
      spinner: 'circles',
      duration: 3000,
    });
    await loading.present();
  }

  private async hideLoading() {
    await this.loadingController.dismiss();
  }

  private validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  private validatePassword(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
    return regex.test(password);
  }

  async onLogin() {
    try {
      await this.showLoading('Logging in...');
      if (!this.email || !this.password) {
        await this.showToast('Please enter both email and password.', 'danger');
        return;
      }

      if (!this.validateEmail(this.email)) {
        await this.showToast('Please enter a valid email address.', 'danger');
        return;
      }

      await this.authService.login(this.email, this.password);
    } catch (error) {
      await this.showToast('Login failed. Please try again.', 'danger');
    } finally {
      await this.hideLoading();
    }
  }

  async onRegister() {
    try {
      await this.showLoading('Registering...');
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
        await this.showToast('Password must be at least 6 characters long and contain 1 uppercase, 1 lowercase letter, and 1 number.', 'danger');
        return;
      }

      await this.authService.register(this.email, this.password, this.username, this.phoneNumber);
    } catch (error) {
      await this.showToast('Registration failed. Please try again.', 'danger');
    } finally {
      await this.hideLoading();
    }
  }

  async onResetPassword() {
    try {
      await this.showLoading('Resetting password...');
      if (!this.email) {
        await this.showToast('Please enter your email to reset the password.', 'danger');
        return;
      }

      await this.authService.resetPassword(this.email);
    } catch (error) {
      await this.showToast('Failed to reset password. Please try again.', 'danger');
    } finally {
      await this.hideLoading();
    }
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
}
