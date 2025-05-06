
import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  privacy?: {
    showRegistry: boolean;
    showPaymentLinks: boolean;
  };
  profileSlug?: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updatePrivacySettings: (settings: { showRegistry?: boolean; showPaymentLinks?: boolean }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Initialize privacy settings if they don't exist
        if (!parsedUser.privacy) {
          parsedUser.privacy = {
            showRegistry: false,
            showPaymentLinks: false
          };
        }
        // Generate a profile slug if it doesn't exist
        if (!parsedUser.profileSlug) {
          parsedUser.profileSlug = generateProfileSlug(parsedUser.name);
        }
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const generateProfileSlug = (name: string): string => {
    // Create a URL-friendly slug from the user's name plus a random string for uniqueness
    const baseSlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `${baseSlug}-${randomStr}`;
  };

  const login = (userData: User) => {
    // Initialize privacy settings for new users
    if (!userData.privacy) {
      userData.privacy = {
        showRegistry: false,
        showPaymentLinks: false
      };
    }
    // Generate a profile slug if it doesn't exist
    if (!userData.profileSlug) {
      userData.profileSlug = generateProfileSlug(userData.name);
    }
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  
  const updatePrivacySettings = (settings: { showRegistry?: boolean; showPaymentLinks?: boolean }) => {
    if (!user) return;
    
    const updatedPrivacy = {
      ...user.privacy,
      ...settings
    };
    
    const updatedUser = {
      ...user,
      privacy: updatedPrivacy
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout, updateUser, updatePrivacySettings }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
