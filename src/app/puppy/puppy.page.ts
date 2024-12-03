import { Component } from '@angular/core';
import { CartService } from 'src/app/cart.service'; // Import CartService
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-puppy',
  templateUrl: './puppy.page.html',
  styleUrls: ['./puppy.page.scss'],
})
export class PuppyPage {
  // Define the product list with default quantity
  products = [
    {
      name: 'Puppy Dry Kibble - Chicken & Rice',
      description: 'Nutritious kibble with chicken and rice, designed for growing puppies.',
      image: '/assets/images/puppy-dry-kibble.png',
      price: 1299.00, // Price in PHP
      quantity: 1, // Default quantity
    },
    {
      name: 'Puppy Milk Replacer',
      description: 'Complete milk formula for puppies that need extra nutrition.',
      image: '/assets/images/puppy-milk-replacer.png',
      price: 899.00, // Price in PHP
      quantity: 1, // Default quantity
    },
    {
      name: 'Small Breed Puppy Formula',
      description: 'Specialized nutrition for small breed puppies.',
      image: '/assets/images/puppy-small-breed.png',
      price: 1899.00, // Price in PHP
      quantity: 1, // Default quantity
    },
    {
      name: 'Large Breed Puppy Formula',
      description: 'Nutrient-packed food for large and giant breed puppies.',
      image: '/assets/images/puppy-large-breed.png',
      price: 2199.00, // Price in PHP
      quantity: 1, // Default quantity
    },
    {
      name: 'Puppy Probiotic Supplement',
      description: 'Supports gut health and digestion for your growing puppy.',
      image: '/assets/images/puppy-probiotic.png',
      price: 799.00, // Price in PHP
      quantity: 1, // Default quantity
    },
    {
      name: 'Omega-3 Puppy Supplement',
      description: 'Boosts your puppy’s brain development and coat health.',
      image: '/assets/images/puppy-omega3.png',
      price: 699.00, // Price in PHP
      quantity: 1, // Default quantity
    },
  ];

  constructor(private cartService: CartService, private router: Router) {}

  // Method to add product to the cart with selected quantity
  addToCart(product: any) {
    // Pass the product with its quantity to the cart service
    this.cartService.addToCart({ ...product, quantity: product.quantity });
    console.log(
      `Added ${product.quantity} x ${product.name} to the cart for ₱${product.price * product.quantity}`
    );
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
