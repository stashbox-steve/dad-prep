
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PregnancyTracker from '@/components/tracker/PregnancyTracker';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow app-container py-4">
        <PregnancyTracker />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
