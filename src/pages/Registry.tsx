
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RegistryManager from '@/components/registry/RegistryManager';

const Registry = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow app-container py-4">
        <RegistryManager />
      </main>
      <Footer />
    </div>
  );
};

export default Registry;
