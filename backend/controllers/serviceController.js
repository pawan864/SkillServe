import Category from '../models/Category.js';
import Service from '../models/Service.js';
import { categories as fallbackCategories, services as fallbackServices } from '../data/seedData.js';
import { isDbConnected } from '../config/db.js';

// @desc    Get all categories
// @route   GET /api/categories
export const getCategories = async (req, res) => {
  try {
    if (!isDbConnected) {
      return res.json({ success: true, count: fallbackCategories.length, categories: fallbackCategories });
    }
    let categories = await Category.find().sort({ displayOrder: 1 });
    if (!categories || categories.length === 0) {
      categories = fallbackCategories;
    }
    res.json({ success: true, count: categories.length, categories });
  } catch (error) {
    res.json({ success: true, count: fallbackCategories.length, categories: fallbackCategories });
  }
};

// @desc    Get all services or filter by category & query
// @route   GET /api/services
export const getServices = async (req, res) => {
  try {
    const { category, search, bestseller } = req.query;

    if (!isDbConnected) {
      let filtered = [...fallbackServices];
      if (category && category !== 'all') {
        filtered = filtered.filter(s => s.categorySlug === category);
      }
      if (bestseller === 'true') {
        filtered = filtered.filter(s => s.isBestseller);
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(s => 
          s.title.toLowerCase().includes(q) || 
          s.shortDesc.toLowerCase().includes(q) ||
          s.categorySlug.toLowerCase().includes(q)
        );
      }
      return res.json({ success: true, count: filtered.length, services: filtered });
    }

    let query = {};

    if (category && category !== 'all') {
      query.categorySlug = category;
    }

    if (bestseller === 'true') {
      query.isBestseller = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDesc: { $regex: search, $options: 'i' } },
        { categorySlug: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    let services = await Service.find(query).sort({ rating: -1 });

    if (!services || services.length === 0) {
      // Filter from fallback data
      let filtered = [...fallbackServices];
      if (category && category !== 'all') {
        filtered = filtered.filter(s => s.categorySlug === category);
      }
      if (bestseller === 'true') {
        filtered = filtered.filter(s => s.isBestseller);
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(s => 
          s.title.toLowerCase().includes(q) || 
          s.shortDesc.toLowerCase().includes(q) ||
          s.categorySlug.toLowerCase().includes(q)
        );
      }
      services = filtered;
    }

    res.json({ success: true, count: services.length, services });
  } catch (error) {
    let filtered = [...fallbackServices];
    const { category, search } = req.query;
    if (category && category !== 'all') {
      filtered = filtered.filter(s => s.categorySlug === category);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.shortDesc.toLowerCase().includes(q)
      );
    }
    res.json({ success: true, count: filtered.length, services: filtered });
  }
};

// @desc    Get single service by slug
// @route   GET /api/services/:slug
export const getServiceBySlug = async (req, res) => {
  try {
    let service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      service = fallbackServices.find(s => s.slug === req.params.slug);
    }

    if (service) {
      res.json({ success: true, service });
    } else {
      res.status(404).json({ success: false, message: 'Service not found' });
    }
  } catch (error) {
    const service = fallbackServices.find(s => s.slug === req.params.slug);
    if (service) {
      return res.json({ success: true, service });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
