
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BabyNameExplorer from '@/components/names/BabyNameExplorer';

const Names = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow app-container py-4">
        <BabyNameExplorer />
      </main>
      <Footer />
    </div>
  );
};

export default Names;
