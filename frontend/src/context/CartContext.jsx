import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('blinkfix_cart');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tip, setTip] = useState(20);
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    localStorage.setItem('blinkfix_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (service) => {
    const key = service._id || service.id || service.slug;
    setCartItems(prev => {
      const current = prev[key];
      const newQty = (current ? current.quantity : 0) + 1;
      return {
        ...prev,
        [key]: {
          service,
          quantity: newQty
        }
      };
    });
  };

  const removeFromCart = (serviceId) => {
    setCartItems(prev => {
      const current = prev[serviceId];
      if (!current) return prev;
      if (current.quantity <= 1) {
        const copy = { ...prev };
        delete copy[serviceId];
        return copy;
      }
      return {
        ...prev,
        [serviceId]: {
          ...current,
          quantity: current.quantity - 1
        }
      };
    });
  };

  const deleteItem = (serviceId) => {
    setCartItems(prev => {
      const copy = { ...prev };
      delete copy[serviceId];
      return copy;
    });
  };

  const clearCart = () => {
    setCartItems({});
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    setCouponError('');
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'BLINKIT50') {
      setCoupon({ code: 'BLINKIT50', discount: 50 });
      return true;
    } else if (cleanCode === 'QUICKFIX' || cleanCode === 'FIRST100') {
      setCoupon({ code: cleanCode, discount: 100 });
      return true;
    } else if (cleanCode === 'FREESHIP') {
      setCoupon({ code: 'FREESHIP', discount: 49 });
      return true;
    } else {
      setCouponError('Invalid coupon code. Try BLINKIT50 or FIRST100');
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponError('');
  };

  const itemsList = Object.values(cartItems);
  const totalItemsCount = itemsList.reduce((sum, item) => sum + item.quantity, 0);
  const itemTotal = itemsList.reduce((sum, item) => sum + (item.service.price * item.quantity), 0);
  
  // Visiting fee is FREE if item total >= 499, otherwise 49
  const visitingFee = itemTotal >= 499 || itemTotal === 0 ? 0 : 49;
  const safetyFee = itemTotal > 0 ? 15 : 0;
  const discountAmount = coupon ? Math.min(coupon.discount, itemTotal) : 0;
  const grandTotal = Math.max(0, itemTotal + visitingFee + safetyFee + tip - discountAmount);

  return (
    <CartContext.Provider value={{
      cartItems,
      itemsList,
      totalItemsCount,
      itemTotal,
      visitingFee,
      safetyFee,
      tip,
      setTip,
      coupon,
      couponError,
      discountAmount,
      grandTotal,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      deleteItem,
      clearCart,
      applyCoupon,
      removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
