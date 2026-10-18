import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    city: 'Phagwara, Punjab',
    state: 'India',
    address: 'Near Law Gate, LPU Campus Rd',
    pincode: '144401',
    deliveryTime: '15 MINS'
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const quickCities = [
    { city: 'Phagwara, Punjab', address: 'Model Town / LPU Campus Area', pincode: '144401' },
    { city: 'Jalandhar, Punjab', address: 'Civil Lines, Model Town', pincode: '144001' },
    { city: 'New Delhi, Delhi', address: 'Connaught Place & South Ext', pincode: '110001' },
    { city: 'Bengaluru, Karnataka', address: 'Koramangala 4th Block, Indiranagar', pincode: '560034' },
    { city: 'Mumbai, Maharashtra', address: 'Bandra West, Link Road', pincode: '400050' },
    { city: 'Gurugram, Haryana', address: 'Cyber City, Sector 29', pincode: '122002' },
  ];

  const updateLocation = (newLoc) => {
    setLocation(prev => ({ ...prev, ...newLoc }));
    setIsLocationModalOpen(false);
  };

  return (
    <LocationContext.Provider value={{
      location,
      quickCities,
      isLocationModalOpen,
      setIsLocationModalOpen,
      updateLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
