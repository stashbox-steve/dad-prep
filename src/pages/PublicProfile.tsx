
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileViewer from '@/components/profile/ProfileViewer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();

  useEffect(() => {
    console.log("Looking for profile with slug:", slug);
    
    const findProfileBySlug = () => {
      // Look directly for the user in localStorage
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("Found user in localStorage:", parsedUser);
          
          if (parsedUser.profileSlug === slug) {
            console.log("Profile slug matches:", parsedUser.profileSlug);
            setProfileData(parsedUser);
            
            // Get registry items
            const savedItems = localStorage.getItem(`registry-items-${parsedUser.email}`);
            if (savedItems) {
              try {
                setRegistryItems(JSON.parse(savedItems));
              } catch (error) {
                console.error('Error parsing saved items', error);
              }
            }
            
            // Get payment links
            const savedLinks = localStorage.getItem(`payment-links-${parsedUser.email}`);
            if (savedLinks) {
              try {
                setPaymentLinks(JSON.parse(savedLinks));
              } catch (error) {
                console.error('Error parsing payment links', error);
              }
            }
          } else {
            setError('Profile not found');
            toast({
              variant: "destructive",
              title: "Profile not found",
              description: "The profile you're looking for does not exist.",
            });
          }
        } catch (error) {
          console.error('Error parsing user data', error);
          setError('Error loading profile');
        }
      } else {
        setError('No user profiles found');
      }
      
      setIsLoading(false);
    };

    if (slug) {
      findProfileBySlug();
    } else {
      setError('Invalid profile URL');
      setIsLoading(false);
    }
  }, [slug, toast]);

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
