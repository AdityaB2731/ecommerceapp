const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const sampleProducts = [
  // Electronics
  {
    name: 'Wireless Bluetooth Headphones',
    description:
      'Premium noise-cancelling wireless headphones with 30-hour battery life. Features deep bass, crystal-clear audio, and a comfortable over-ear design perfect for music lovers and remote workers.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    category: 'Electronics',
    countInStock: 25,
    rating: 4.5,
    numReviews: 128,
  },
  {
    name: 'Smart Watch Pro',
    description:
      'Feature-packed smartwatch with heart rate monitoring, GPS tracking, sleep analysis, and 7-day battery. Water-resistant up to 50m with a stunning AMOLED display.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    category: 'Electronics',
    countInStock: 15,
    rating: 4.7,
    numReviews: 256,
  },
  {
    name: 'Portable Bluetooth Speaker',
    description:
      'Compact, waterproof Bluetooth speaker with 360-degree sound. Perfect for outdoor adventures with 12-hour playtime and built-in microphone for hands-free calls.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    category: 'Electronics',
    countInStock: 40,
    rating: 4.3,
    numReviews: 89,
  },
  // Clothing
  {
    name: 'Classic Denim Jacket',
    description:
      'Timeless denim jacket crafted from premium cotton. Features a modern slim fit, brass buttons, and versatile wash that pairs with everything in your wardrobe.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80',
    category: 'Clothing',
    countInStock: 30,
    rating: 4.4,
    numReviews: 67,
  },
  {
    name: 'Premium Cotton T-Shirt',
    description:
      'Ultra-soft 100% organic cotton t-shirt with a relaxed fit. Pre-shrunk fabric with reinforced stitching ensures lasting comfort and durability.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    category: 'Clothing',
    countInStock: 100,
    rating: 4.6,
    numReviews: 203,
  },
  {
    name: 'Running Sneakers',
    description:
      'Lightweight performance running shoes with responsive cushioning and breathable mesh upper. Engineered for comfort on long runs with excellent arch support.',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    category: 'Clothing',
    countInStock: 20,
    rating: 4.8,
    numReviews: 312,
  },
  // Accessories
  {
    name: 'Leather Messenger Bag',
    description:
      'Handcrafted genuine leather messenger bag with padded laptop compartment. Features multiple pockets, adjustable strap, and antique brass hardware.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    category: 'Accessories',
    countInStock: 12,
    rating: 4.6,
    numReviews: 78,
  },
  {
    name: 'Aviator Sunglasses',
    description:
      'Classic aviator sunglasses with polarized lenses and lightweight metal frame. Provides 100% UV protection with a timeless style that suits every face shape.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
    category: 'Accessories',
    countInStock: 50,
    rating: 4.2,
    numReviews: 145,
  },
  {
    name: 'Minimalist Watch',
    description:
      'Elegant minimalist analog watch with genuine leather strap and sapphire crystal glass. Japanese quartz movement with a clean dial design.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80',
    category: 'Accessories',
    countInStock: 18,
    rating: 4.5,
    numReviews: 92,
  },
  // Home & Living
  {
    name: 'Aromatic Candle Set',
    description:
      'Set of 3 hand-poured soy wax candles in calming scents: lavender, vanilla, and eucalyptus. Each candle provides up to 45 hours of clean, even burning.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=500&q=80',
    category: 'Home & Living',
    countInStock: 60,
    rating: 4.7,
    numReviews: 189,
  },
  {
    name: 'Ceramic Plant Pot Set',
    description:
      'Modern matte ceramic plant pots in three sizes. Features drainage holes and bamboo saucers. Perfect for succulents, herbs, and small indoor plants.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80',
    category: 'Home & Living',
    countInStock: 35,
    rating: 4.4,
    numReviews: 56,
  },
  {
    name: 'Cozy Throw Blanket',
    description:
      'Ultra-soft microfiber throw blanket with a luxurious sherpa lining. Machine washable, hypoallergenic, and perfect for movie nights or chilly evenings.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
    category: 'Home & Living',
    countInStock: 45,
    rating: 4.8,
    numReviews: 234,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();
    console.log('🗑️  Existing products cleared');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`🌱 ${createdProducts.length} products seeded successfully!`);

    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
