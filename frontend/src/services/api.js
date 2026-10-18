import { initialCategories, initialServices } from '../data/mockData';

const BASE_URL = '/api';

export const api = {
  // Fetch Categories
  async getCategories() {
    try {
      const res = await fetch(`${BASE_URL}/categories`);
      if (res.ok) {
        const data = await res.json();
        if (data.categories && data.categories.length > 0) {
          return data.categories;
        }
      }
    } catch (err) {
      console.warn('Backend unavailable, using client dataset for categories:', err.message);
    }
    return initialCategories;
  },

  // Fetch Services (with optional category & query)
  async getServices(category = 'all', searchQuery = '') {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all') params.append('category', category);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`${BASE_URL}/services?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.services) {
          return data.services;
        }
      }
    } catch (err) {
      console.warn('Backend unavailable, using client dataset for services:', err.message);
    }

    // Client fallback
    let list = [...initialServices];
    if (category && category !== 'all') {
      list = list.filter(s => s.categorySlug === category);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.shortDesc.toLowerCase().includes(q) ||
        s.categorySlug.toLowerCase().includes(q) ||
        (s.tags && s.tags.some(t => t.toLowerCase().includes(q)))
      );
    }
    return list;
  },

  // Create Booking
  async createBooking(bookingData, token = null) {
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers,
        body: JSON.stringify(bookingData)
      });

      if (res.ok) {
        const data = await res.json();
        return data.booking;
      }
    } catch (err) {
      console.warn('Backend unavailable, saving booking locally:', err.message);
    }

    // Local fallback booking creation
    const localBooking = {
      _id: 'bk_' + Date.now(),
      ...bookingData,
      status: 'partner_assigned',
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      assignedPartner: {
        name: 'Rajesh Sharma',
        phone: '+91 98765 43210',
        rating: 4.9,
        profession: 'Verified Super Specialist',
        photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150',
        vehicleNumber: 'PB 09 AX 4421',
        etaMinutes: 14
      },
      createdAt: new Date().toISOString()
    };

    // Save in localStorage
    const existing = JSON.parse(localStorage.getItem('blinkfix_bookings') || '[]');
    existing.unshift(localBooking);
    localStorage.setItem('blinkfix_bookings', JSON.stringify(existing));

    return localBooking;
  },

  // Get My Bookings
  async getMyBookings(token = null) {
    try {
      if (token) {
        const res = await fetch(`${BASE_URL}/bookings/my`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          return data.bookings;
        }
      }
    } catch (err) {
      console.warn('Using local bookings:', err.message);
    }

    return JSON.parse(localStorage.getItem('blinkfix_bookings') || '[]');
  },

  // User Login
  async login(email, password) {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        return await res.json();
      }
      const errData = await res.json();
      throw new Error(errData.message || 'Login failed');
    } catch (err) {
      if (err.message.includes('fetch')) {
        // Mock fallback login
        return {
          success: true,
          token: 'mock_jwt_token_123',
          user: {
            _id: 'usr_demo',
            name: email.split('@')[0] || 'Rahul Sharma',
            email: email,
            phone: '9876543210',
            role: 'user'
          }
        };
      }
      throw err;
    }
  },

  // User Register
  async register(name, email, phone, password) {
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });
      if (res.ok) {
        return await res.json();
      }
      const errData = await res.json();
      throw new Error(errData.message || 'Registration failed');
    } catch (err) {
      if (err.message.includes('fetch')) {
        return {
          success: true,
          token: 'mock_jwt_token_new',
          user: {
            _id: 'usr_' + Date.now(),
            name,
            email,
            phone,
            role: 'user'
          }
        };
      }
      throw err;
    }
  }
};
