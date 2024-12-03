import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';  // Import CartService
import { Router } from '@angular/router';  // Import Router for navigation
import { ToastController } from '@ionic/angular';  // Import ToastController

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];  // Array to store cart items
  totalPrice: number = 0; // Total price of items in the cart
  showOrderAgainButton: boolean = false; // Flag to show the "Order Again" button

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastController: ToastController // Inject ToastController
  ) {}

  ngOnInit() {
    // Subscribe to cartItems$ to update the component whenever the cart changes
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items; // Update the cart items in the component
      this.calculateTotalPrice(); // Update the total price whenever cart items change
    });
  }

  // Method to calculate the total price of items in the cart
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity; // Sum up the price * quantity for each item
    }, 0);
  }

  // Method to increase quantity and recalculate total price
  increaseQuantity(product: any) {
    product.quantity += 1; // Increment the product's quantity
    this.calculateTotalPrice(); // Recalculate total price
  }

  // Method to decrease quantity and recalculate total price
  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity -= 1; // Decrement the product's quantity
      this.calculateTotalPrice(); // Recalculate total price
    }
  }

  // Method to remove an item from the cart
  removeFromCart(product: any) {
    this.cartService.removeFromCart(product); // Remove the product from the cart using the CartService
    this.calculateTotalPrice(); // Recalculate total price after removal
  }

  // Proceed to checkout
  async proceedToCheckout() {
    // Check if the cart is empty
    if (this.cartItems.length === 0) {
      const toast = await this.toastController.create({
        message: 'Your cart is empty. Please add items to the cart before proceeding.',
        duration: 3000,
        position: 'top',
        color: 'danger', // Alert color
      });
      toast.present(); // Show the toast
      return; // Prevent further execution if the cart is empty
    }

    // Create a success toast if the cart is not empty
    const toast = await this.toastController.create({
      message: 'Your items are now on delivery!',
      duration: 3000, // Show for 3 seconds
      position: 'top', // Position of the toast
      color: 'success', // You can change the color if needed
    });

    toast.present(); // Show the toast

    // Wait for the toast to dismiss before clearing the cart
    await toast.onDidDismiss();

    // Clear the cart after the toast is dismissed
    this.clearCart();

    // Optionally navigate to the checkout page
    this.router.navigate(['/checkout']);
  }

  // Clear the cart
  clearCart() {
    this.cartService.clearCart(); // Clear the cart using the CartService
    this.calculateTotalPrice(); // Reset total price

    // Show the "Order Again" button after clearing the cart
    this.showOrderAgainButton = true;
  }

  // Method to handle "Order Again" button click
  orderAgain() {
    this.router.navigate(['/home']); // Navigate to the home page
  }
}
