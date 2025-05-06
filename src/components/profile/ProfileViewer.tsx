
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ExternalLink, Lock, LinkIcon, WalletIcon } from "lucide-react";

interface PaymentLinks {
  venmo?: string;
  cashApp?: string;
  ethAddress?: string;
}

interface Privacy {
  showRegistry: boolean;
  showPaymentLinks: boolean;
}

interface ProfileData {
  name: string;
  email: string;
  privacy?: Privacy;
  profileSlug?: string;
}

interface ProfileViewerProps {
  profileData: ProfileData;
  paymentLinks?: PaymentLinks;
  registryItems?: any[];
  isPreview?: boolean;
}

const ProfileViewer: React.FC<ProfileViewerProps> = ({ 
  profileData, 
  paymentLinks,
  registryItems,
  isPreview = false 
}) => {
  // Get registry items from localStorage if not provided (for preview mode)
  const getRegistryItems = () => {
    if (registryItems) return registryItems;
    
    if (isPreview) {
      const savedItems = localStorage.getItem(`registry-items-${profileData.email}`);
      if (savedItems) {
        try {
          return JSON.parse(savedItems);
        } catch (error) {
          console.error('Error parsing saved items', error);
          return [];
        }
      }
    }
    return [];
  };
  
  // Get payment links from localStorage if not provided (for preview mode)
  const getPaymentLinks = () => {
    if (paymentLinks) return paymentLinks;
    
    if (isPreview) {
      const savedLinks = localStorage.getItem(`payment-links-${profileData.email}`);
      if (savedLinks) {
        try {
          return JSON.parse(savedLinks);
        } catch (error) {
          console.error('Error parsing payment links', error);
          return {};
        }
      }
    }
    return {};
  };
  
  const items = getRegistryItems();
  const links = getPaymentLinks();
  const showRegistry = profileData.privacy?.showRegistry || false;
  const showPaymentLinks = profileData.privacy?.showPaymentLinks || false;
  
  // Filter for items still needed
  const neededItems = items.filter(item => item.status === 'Needed');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{profileData.name}'s Baby Registry</CardTitle>
          <CardDescription>
            {isPreview 
              ? "This is how your profile will appear to others"
              : `Welcome to ${profileData.name}'s baby registry`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Thank you for visiting! Below you'll find items needed for the baby.
          </p>
        </CardContent>
      </Card>

      {showRegistry ? (
        <Card>
          <CardHeader>
            <CardTitle>Registry Items</CardTitle>
            <CardDescription>Items needed for the baby</CardDescription>
          </CardHeader>
          <CardContent>
            {neededItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {neededItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>
                        ${item.price.toFixed(2)} · {item.category} · Priority: {item.priority}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-6">
                No items in registry or all items have been purchased.
              </p>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <CardTitle>Registry Items</CardTitle>
            </div>
            <CardDescription>This content is private</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-6">
              The registry items are not shared publicly.
            </p>
          </CardContent>
        </Card>
      )}

      {showPaymentLinks ? (
        <Card>
          <CardHeader>
            <CardTitle>Payment Options</CardTitle>
            <CardDescription>Ways to contribute</CardDescription>
          </CardHeader>
          <CardContent>
            {links && (Object.keys(links).length > 0) ? (
              <div className="space-y-4">
                {links.venmo && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-dadblue" />
                    <span>Venmo: </span>
                    <a 
                      href={`https://venmo.com/${links.venmo.substring(1)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dadblue hover:underline flex items-center gap-1"
                    >
                      {links.venmo}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
                {links.cashApp && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-dadblue" />
                    <span>Cash App: </span>
                    <a 
                      href={`https://cash.app/$${links.cashApp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dadblue hover:underline flex items-center gap-1"
                    >
                      ${links.cashApp}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
                {links.ethAddress && (
                  <div className="flex items-center gap-2">
                    <WalletIcon className="h-4 w-4 text-dadblue" />
                    <span>ETH: </span>
                    <span className="text-dadblue">
                      {links.ethAddress}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-6">
                No payment options have been added.
              </p>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <CardTitle>Payment Options</CardTitle>
            </div>
            <CardDescription>This content is private</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-6">
              Payment information is not shared publicly.
            </p>
          </CardContent>
        </Card>
      )}
      
      {isPreview && (
        <p className="text-sm text-muted-foreground">
          This is a preview of your shared profile. Use the privacy toggles to control what's visible.
        </p>
      )}
    </div>
  );
};

export default ProfileViewer;
