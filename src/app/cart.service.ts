import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>([]); // Holds the cart items as a BehaviorSubject
  cartItems$ = this.cartSubject.asObservable(); // Observable to subscribe to cart changes

  constructor() {}

  // Add a product to the cart
  addToCart(product: any) {
    const currentCart = this.cartSubject.value;
    const existingProduct = currentCart.find((item) => item.name === product.name);

    if (existingProduct) {
      // If product already exists, update its quantity
      existingProduct.quantity += product.quantity;
    } else {
      // Otherwise, add the new product to the cart
      currentCart.push({ ...product }); // Clone the product to avoid reference issues
    }

    this.cartSubject.next([...currentCart]); // Emit updated cart
  }

  // Remove a product from the cart
  removeFromCart(product: any) {
    const updatedCart = this.cartSubject.value.filter((item) => item.name !== product.name);
    this.cartSubject.next(updatedCart);
  }

  // Get the total price of items in the cart
  getTotalPrice() {
    return this.cartSubject.value.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Clear the cart
  clearCart() {
    this.cartSubject.next([]); // This clears the cart
  }
}
