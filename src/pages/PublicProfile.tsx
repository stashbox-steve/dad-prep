
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileViewer from '@/components/profile/ProfileViewer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  privacy?: {
    showRegistry: boolean;
    showPaymentLinks: boolean;
  };
  profileSlug?: string;
}

interface PaymentLinks {
  venmo?: string;
  cashApp?: string;
  ethAddress?: string;
}

const PublicProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [registryItems, setRegistryItems] = useState([]);
  const [paymentLinks, setPaymentLinks] = useState<PaymentLinks>({});
  const [error, setError] = useState('');

  useEffect(() => {
    const findProfileBySlug = () => {
      // In a real app, this would be an API call
      // For our localStorage implementation, we need to check all users
      const allUsers = Object.keys(localStorage)
        .filter(key => key.startsWith('user'))
        .map(key => {
          try {
            return JSON.parse(localStorage.getItem(key) || '');
          } catch (e) {
            return null;
          }
        })
        .filter(Boolean);

      const foundUser = allUsers.find(user => user.profileSlug === slug);
      
      if (foundUser) {
        setProfileData(foundUser);
        
        // Get registry items
        const savedItems = localStorage.getItem(`registry-items-${foundUser.email}`);
        if (savedItems) {
          try {
            setRegistryItems(JSON.parse(savedItems));
          } catch (error) {
            console.error('Error parsing saved items', error);
          }
        }
        
        // Get payment links
        const savedLinks = localStorage.getItem(`payment-links-${foundUser.email}`);
        if (savedLinks) {
          try {
            setPaymentLinks(JSON.parse(savedLinks));
          } catch (error) {
            console.error('Error parsing payment links', error);
          }
        }
      } else {
        setError('Profile not found');
      }
      
      setIsLoading(false);
    };

    if (slug) {
      findProfileBySlug();
    } else {
      setError('Invalid profile URL');
      setIsLoading(false);
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow app-container py-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center">Loading profile...</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow app-container py-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Not Found</CardTitle>
              <CardDescription>
                {error || "We couldn't find the profile you're looking for"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">The profile you're looking for might have been removed or the URL is incorrect.</p>
              <Link to="/">
                <Button>Back to Home</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow app-container py-4">
        <ProfileViewer 
          profileData={profileData}
          registryItems={registryItems}
          paymentLinks={paymentLinks}
        />
      </main>
      <Footer />
    </div>
  );
};

export default PublicProfile;
