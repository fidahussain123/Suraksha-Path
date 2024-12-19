import React from 'react';

export interface Resource {
  id: string;
  type: 'food' | 'water' | 'shelter' | 'medical' | 'clothing';
  name: string;
  quantity: number;
  unit: string;
  location: {
    lat: number;
    lng: number;
  };
  status: 'available' | 'low' | 'critical';
  contact: {
    phone: string;
    email?: string;
  };
}

export interface LocationSearch {
  disasterId: string;
  location: {
    lat: number;
    lng: number;
  };
  radius: number; // in kilometers
}