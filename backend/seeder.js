import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Service from './models/Service.js';
import User from './models/User.js';
import { categories, services } from './data/seedData.js';

dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log('Connected to MongoDB Atlas for Seeding...');

    await Category.deleteMany();
    await Service.deleteMany();
    await User.deleteMany();

    // Create Admin User & Partner User
    const adminUser = await User.create({
      name: 'SkillServe Admin',
      email: 'admin@skillserve.com',
      phone: '9876543210',
      password: 'adminpassword123',
      role: 'admin',
      addresses: [{
        type: 'work',
        flatNo: 'HQ Tower 4B',
        street: 'Connaught Place',
        city: 'New Delhi',
        pincode: '110001',
        isDefault: true
      }]
    });

    const demoUser = await User.create({
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '9812345678',
      password: 'userpassword123',
      role: 'user',
      addresses: [{
        type: 'home',
        flatNo: 'A-204, Green Heights',
        street: 'GT Road',
        landmark: 'Opposite Mall',
        city: 'Phagwara',
        pincode: '144401',
        isDefault: true
      }]
    });

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`Inserted ${createdCategories.length} categories`);

    // Map category IDs to services
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    const servicesWithCategory = services.map(srv => ({
      ...srv,
      category: categoryMap[srv.categorySlug] || null
    }));

    const createdServices = await Service.insertMany(servicesWithCategory);
    console.log(`Inserted ${createdServices.length} services`);

    console.log('✅ Database Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

importData();
