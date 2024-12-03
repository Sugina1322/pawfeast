import { Component } from '@angular/core';
import { CartService } from 'src/app/cart.service'; // Import CartService
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-adult',
  templateUrl: './adult.page.html',
  styleUrls: ['./adult.page.scss'],
})
export class AdultPage {
  // Define the product list with default quantity
  products = [
    {
      name: 'Adult Dog Food - Chicken Flavor',
      description: 'High-protein, grain-free formula with real chicken.',
      image: '/assets/images/adult-chicken.png',
      price: 1499.0, // Price in PHP
      quantity: 1, // Default quantity
    },
    {
      name: 'Premium Lamb & Rice Kibble',
      description: 'A balanced diet with lamb and rice for healthy digestion.',
      image: '/assets/images/adult-lamb-rice.png',
      price: 1749.0, // Price in PHP
      quantity: 1, // Default quantity
    },
    {
      name: 'Joint Support Supplement',
      description: 'Glucosamine and chondroitin to support joint health.',
      image: '/assets/images/adult-joint-support.png',
      price: 999.0, // Price in PHP
      quantity: 1, // Default quantity
    },
    {
      name: 'Grain-Free Salmon Dog Food',
      description: 'Made with real salmon, ideal for dogs with sensitive stomachs.',
      image: '/assets/images/adult-salmon.png',
      price: 1999.0, // Price in PHP
      quantity: 1, // Default quantity
    },
    {
      name: 'Hypoallergenic Dog Food',
      description: 'Specially formulated for dogs with food sensitivities.',
      image: '/assets/images/adult-hypoallergenic.png',
      price: 2499.0, // Price in PHP
      quantity: 1, // Default quantity
    },
    {
      name: 'Large Breed Chicken & Veggie Formula',
      description: 'Ideal for large adult dogs, packed with chicken and veggies.',
      image: '/assets/images/adult-large-breed.png',
      price: 2299.0, // Price in PHP
      quantity: 1, // Default quantity
    },
    {
      name: 'Weight Control Dog Food',
      description: 'Helps your dog maintain a healthy weight without sacrificing taste.',
      image: '/assets/images/adult-weight-control.png',
      price: 1599.0, // Price in PHP
      quantity: 1, // Default quantity
    },
    {
      name: 'Skin & Coat Care Supplement',
      description: 'Improves your dog’s skin and coat health with Omega-3 and biotin.',
      image: '/assets/images/adult-skin-coat.png',
      price: 899.0, // Price in PHP
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
