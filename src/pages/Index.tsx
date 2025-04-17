
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PregnancyTracker from '@/components/tracker/PregnancyTracker';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow app-container py-4">
        {!user && (
          <div className="mb-8 p-4 bg-card border rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-2">Create an Account</h2>
            <p className="text-muted-foreground mb-4">
              Sign up to save your pregnancy journey, track favorite names, and more.
            </p>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        )}
        <PregnancyTracker />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
