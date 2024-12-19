import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

export function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center gradient-bg">
      <div className="text-center animate-fade-in">
        <Shield className="h-20 w-20 text-white mb-4 mx-auto" />
        <h1 className="text-4xl font-bold text-white mb-2">सुरक्षाPath</h1>
        <p className="text-white text-xl">Empowering Communities in Crisis</p>
      </div>
    </div>
  );
}