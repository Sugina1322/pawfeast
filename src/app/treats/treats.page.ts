import { Component } from '@angular/core';
import { CartService } from 'src/app/cart.service'; // Import CartService
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-treats',
  templateUrl: './treats.page.html',
  styleUrls: ['./treats.page.scss'],
})
export class TreatsPage {

  // Define the product list for Treats with default quantity
  products = [
    {
      name: 'Chicken Chew Treats',
      image: '/assets/images/treat1.png',
      description: 'Delicious chicken flavored treats for your dog.',
      price: 250,
      quantity: 1, // Default quantity
    },
    {
      name: 'Beef Bone Snacks',
      image: '/assets/images/treat2.png',
      description: 'A tasty beef bone treat your dog will love.',
      price: 300,
      quantity: 1, // Default quantity
    },
    {
      name: 'Salmon Bites',
      image: '/assets/images/treat3.png',
      description: 'Healthy and tasty salmon bites.',
      price: 350,
      quantity: 1, // Default quantity
    },
    {
      name: 'Peanut Butter Biscuits',
      image: '/assets/images/treat4.png',
      description: 'Crunchy biscuits with a peanut butter twist.',
      price: 200,
      quantity: 1, // Default quantity
    },
    {
      name: 'Liver Pate Chews',
      image: '/assets/images/treat5.png',
      description: 'Soft liver pate chews for your furry friend.',
      price: 180,
      quantity: 1, // Default quantity
    }
  ];

  constructor(private cartService: CartService, private router: Router) {}

  // Method to add product to the cart with selected quantity
  addToCart(product: any) {
    // Pass the product with its quantity to the cart service
    this.cartService.addToCart({ ...product, quantity: product.quantity });
    console.log(`${product.name} added to cart for ₱${product.price * product.quantity}`);
    this.router.navigate(['/cart']); // Navigate to the Cart Page
  }

  // Method to increase quantity
  increaseQuantity(product: any) {
    product.quantity += 1; // Increment quantity
    console.log(`Increased quantity of ${product.name} to ${product.quantity}`);
  }

  // Method to decrease quantity
  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity -= 1; // Decrement quantity but not below 1
      console.log(`Decreased quantity of ${product.name} to ${product.quantity}`);
    }
  }
}
