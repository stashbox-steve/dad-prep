
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MealPlanner from '@/components/meals/MealPlanner';

const Meals = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow app-container py-4">
        <MealPlanner />
      </main>
      <Footer />
    </div>
  );
};

export default Meals;
