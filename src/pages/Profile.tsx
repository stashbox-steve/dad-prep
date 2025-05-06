
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Share, Eye, Lock, User } from 'lucide-react';
import ProfileViewer from '@/components/profile/ProfileViewer';

const Profile = () => {
  const { user, updateUser, updatePrivacySettings } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [previewMode, setPreviewMode] = useState(false);
  
  if (!user) {
    // Redirect to auth if not logged in
    setTimeout(() => navigate('/auth'), 100);
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow app-container py-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Please sign in to view your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/auth')}>
                Sign In
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const shareProfile = () => {
    const shareUrl = `${window.location.origin}/profile/${user.profileSlug}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${user.name}'s Baby Registry`,
        text: 'Check out my baby registry!',
        url: shareUrl,
      }).catch(() => {
        // Fallback to clipboard if share API fails
        copyToClipboard(shareUrl);
      });
    } else {
      copyToClipboard(shareUrl);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Link copied",
        description: "Profile link copied to clipboard",
      });
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };
  
  const handleNameUpdate = () => {
    if (name.trim() !== user.name) {
      updateUser({ name: name.trim() });
      toast({
        title: "Profile updated",
        description: "Your name has been updated",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow app-container py-4">
        {previewMode ? (
          <div className="mb-4">
            <Button 
              variant="outline" 
              onClick={() => setPreviewMode(false)}
              className="mb-4"
            >
              Exit Preview
            </Button>
            <ProfileViewer profileData={user} isPreview={true} />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="section-heading">Your Profile</h2>
              <p className="text-muted-foreground mb-4">
                Manage your profile and privacy settings
              </p>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <div className="flex gap-2">
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <Button onClick={handleNameUpdate}>Update</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user.email}
                        disabled
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control what others can see on your shared profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-registry">Show Registry</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow others to see your registry items
                      </p>
                    </div>
                    <Switch
                      id="show-registry"
                      checked={user.privacy?.showRegistry || false}
                      onCheckedChange={(checked) => {
                        updatePrivacySettings({ showRegistry: checked });
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-payment">Show Payment Links</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow others to see your payment information
                      </p>
                    </div>
                    <Switch
                      id="show-payment"
                      checked={user.privacy?.showPaymentLinks || false}
                      onCheckedChange={(checked) => {
                        updatePrivacySettings({ showPaymentLinks: checked });
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Share Profile</CardTitle>
                  <CardDescription>
                    Let friends and family see your registry
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="pt-2">
                      <p className="mb-2">Your profile URL:</p>
                      <code className="block p-2 bg-secondary rounded text-sm overflow-auto break-all">
                        {window.location.origin}/profile/{user.profileSlug}
                      </code>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={shareProfile} className="flex items-center gap-2">
                        <Share className="h-4 w-4" />
                        Share Link
                      </Button>
                      
                      <Button variant="outline" onClick={() => setPreviewMode(true)} className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
