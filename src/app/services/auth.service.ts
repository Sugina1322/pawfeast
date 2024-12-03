import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Firestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth(); // Firebase authentication instance
  private firestore = getFirestore(); // Firebase Firestore instance
  private storage = getStorage(); // Firebase Storage instance
  private userSubject = new BehaviorSubject<User | null>(null); // Store the current user
  public user$ = this.userSubject.asObservable(); // Expose user state as observable

  constructor(private router: Router, private toastController: ToastController) {
    // Subscribe to auth state changes and update the user
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user); // Update the user on change
    });
  }

  // Login Method
  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigateByUrl('/home');
    } catch (error) {
      console.error('Login failed:', error);
      await this.showToast('Login failed. Please check your credentials.', 'danger');
    }
  }

  // Register Method (with additional username and phoneNumber fields)
  async register(email: string, password: string, username: string, phoneNumber: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const userId = userCredential.user.uid;

      const userDocRef = doc(this.firestore, 'users', userId);
      await setDoc(userDocRef, {
        username: username,
        phoneNumber: phoneNumber,
        email: email,
        profilePicUrl: '', // Placeholder for profile picture URL
      });

      await this.showToast('Registration successful.', 'success');
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      console.error('Registration failed:', error);
      await this.showToast(`Registration failed: ${error.message}`, 'danger');
    }
  }

  // Method to upload profile picture
  async uploadProfilePicture(file: File): Promise<string | null> {
    const user = this.auth.currentUser;
    if (user) {
      const filePath = `profile-pictures/${user.uid}/${file.name}`;
      const storageRef = ref(this.storage, filePath);

      try {
        // Upload the file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL of the uploaded file
        const downloadUrl = await getDownloadURL(snapshot.ref);

        // Update the user's Firestore document with the profile picture URL
        const userDocRef = doc(this.firestore, 'users', user.uid);
        await updateDoc(userDocRef, { profilePicUrl: downloadUrl });

        console.log('Profile picture uploaded successfully:', downloadUrl);
        return downloadUrl; // Return the URL for updating the UI
      } catch (error) {
        console.error('Failed to upload profile picture:', error);
        return null; // Indicate failure
      }
    } else {
      console.log('No authenticated user.');
      return null;
    }
  }

  // Reset Password Method
  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      await this.showToast('Password reset email sent.', 'success');
    } catch (error: any) {
      console.error('Failed to send reset email:', error);
      await this.showToast('Failed to send reset email. Please try again.', 'danger');
    }
  }

  // Update Username Method
  async updateUsername(newUsername: string): Promise<boolean> {
    const user = this.auth.currentUser;
    if (user) {
      const userDocRef = doc(this.firestore, 'users', user.uid);
      try {
        await updateDoc(userDocRef, { username: newUsername });
        console.log('Username updated successfully!');
        return true;
      } catch (error) {
        console.error('Failed to update username:', error);
        return false;
      }
    } else {
      console.log('No authenticated user.');
      return false;
    }
  }

  // Helper method for showing toasts
  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  // Check if the user is authenticated
  isAuthenticated() {
    return this.auth.currentUser != null;
  }

  // Get the current authenticated user
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // Fetch user profile data from Firestore
  async getUserProfile() {
    const user = this.auth.currentUser;
    if (user) {
      const userDocRef = doc(this.firestore, 'users', user.uid);
      const docSnapshot = await getDoc(userDocRef);

      if (docSnapshot.exists()) {
        return docSnapshot.data();
      } else {
        console.log('No profile found in Firestore for the user.');
        return null;
      }
    } else {
      console.log('No authenticated user.');
      return null;
    }
  }
}
