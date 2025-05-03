
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { BaseWalletUser } from '@/types/babyNames';

declare global {
  interface Window {
    Base?: {
      isConnected: () => Promise<boolean>;
      connect: () => Promise<{
        address: string;
        displayName?: string;
        profileImage?: string;
      }>;
      getUser: () => Promise<{
        address: string;
        displayName?: string;
        profileImage?: string;
      }>;
      onAccountChange: (callback: (account: string) => void) => void;
    };
  }
}

export const useBaseWallet = () => {
  const [walletUser, setWalletUser] = useState<BaseWalletUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBaseWalletAvailable, setIsBaseWalletAvailable] = useState(false);

  useEffect(() => {
    const checkBaseWallet = async () => {
      setIsLoading(true);
      try {
        // Check if Base Wallet is available in the environment
        setIsBaseWalletAvailable(!!window.Base);
        
        if (window.Base) {
          // Check if already connected
          const isConnected = await window.Base.isConnected();
          
          if (isConnected) {
            const user = await window.Base.getUser();
            setWalletUser(user);
          }
          
          // Listen for account changes
          window.Base.onAccountChange((newAccount) => {
            if (newAccount) {
              window.Base?.getUser().then(setWalletUser);
            } else {
              setWalletUser(null);
            }
          });
        }
      } catch (error) {
        console.error('Error checking Base Wallet:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkBaseWallet();
  }, []);

  const connectWallet = async () => {
    if (!window.Base) {
      toast({
        title: 'Base Wallet Not Available',
        description: 'Please open this app in Base Wallet to use this feature.',
        variant: 'destructive',
      });
      return null;
    }
    
    try {
      const user = await window.Base.connect();
      setWalletUser(user);
      toast({
        title: 'Connected to Base Wallet',
        description: `Welcome ${user.displayName || user.address.substring(0, 10)}...`,
      });
      return user;
    } catch (error) {
      console.error('Error connecting Base Wallet:', error);
      toast({
        title: 'Connection Failed',
        description: 'Could not connect to Base Wallet.',
        variant: 'destructive',
      });
      return null;
    }
  };

  return {
    walletUser,
    isLoading,
    connectWallet,
    isBaseWalletAvailable
  };
};
