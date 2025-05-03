
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PregnancyTracker from '@/components/tracker/PregnancyTracker';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useBaseWallet } from '@/hooks/useBaseWallet';

const Index = () => {
  const { user } = useUser();
  const { connectWallet, walletUser, isBaseWalletAvailable } = useBaseWallet();

  const handleConnectBaseWallet = async () => {
    await connectWallet();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow app-container py-4">
        {!user && !walletUser && (
          <div className="mb-8 p-4 bg-card border rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-2">Create an Account</h2>
            <p className="text-muted-foreground mb-4">
              Sign up to save your pregnancy journey, track favorite names, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
              {isBaseWalletAvailable && (
                <Button variant="outline" onClick={handleConnectBaseWallet}>
                  Connect Base Wallet
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              DadPrep is optimized for Base Wallet Mini Apps
            </p>
          </div>
        )}
        <PregnancyTracker />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
