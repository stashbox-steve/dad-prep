
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ExternalLink, Link as LinkIcon, WalletIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentLinks {
  venmo?: string;
  cashApp?: string;
  ethAddress?: string;
}

interface PaymentSectionProps {
  paymentLinks: PaymentLinks;
  setPaymentLinks: (links: PaymentLinks) => void;
  user: any;
}

const PaymentSection = ({ paymentLinks, setPaymentLinks, user }: PaymentSectionProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [venmoUsername, setVenmoUsername] = React.useState(paymentLinks.venmo || "");
  const [cashAppUsername, setCashAppUsername] = React.useState(paymentLinks.cashApp || "");
  const [ethAddress, setEthAddress] = React.useState(paymentLinks.ethAddress || "");

  const handleSavePaymentLinks = () => {
    if (venmoUsername && !venmoUsername.startsWith('@')) {
      toast({
        title: "Invalid Venmo username",
        description: "Venmo usernames must start with @",
        variant: "destructive",
      });
      return;
    }
    
    if (ethAddress && (!ethAddress.startsWith('0x') || ethAddress.length !== 42)) {
      toast({
        title: "Invalid ETH address",
        description: "Please enter a valid Ethereum address",
        variant: "destructive",
      });
      return;
    }
    
    const links: PaymentLinks = {};
    
    if (venmoUsername) links.venmo = venmoUsername;
    if (cashAppUsername) links.cashApp = cashAppUsername;
    if (ethAddress) links.ethAddress = ethAddress;
    
    setPaymentLinks(links);
    
    if (user) {
      localStorage.setItem(`payment-links-${user.email}`, JSON.stringify(links));
    }
    
    setIsDialogOpen(false);
    
    toast({
      title: "Payment links saved",
      description: "Your payment links have been updated.",
    });
  };

  const renderPaymentLinks = () => {
    if (!paymentLinks.venmo && !paymentLinks.cashApp && !paymentLinks.ethAddress) {
      return (
        <p className="text-sm text-muted-foreground">
          No payment links have been added. Click the button below to add your payment information.
        </p>
      );
    }

    return (
      <div className="space-y-2">
        {paymentLinks.venmo && (
          <div className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-dadblue" />
            <span>Venmo: </span>
            <a 
              href={`https://venmo.com/${paymentLinks.venmo.substring(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dadblue hover:underline flex items-center gap-1"
            >
              {paymentLinks.venmo}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
        {paymentLinks.cashApp && (
          <div className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-dadblue" />
            <span>Cash App: </span>
            <a 
              href={`https://cash.app/${cashAppUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dadblue hover:underline flex items-center gap-1"
            >
              ${paymentLinks.cashApp}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
        {paymentLinks.ethAddress && (
          <div className="flex items-center gap-2">
            <WalletIcon className="h-4 w-4 text-dadblue" />
            <span>ETH: </span>
            <span className="text-dadblue">
              {paymentLinks.ethAddress}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Payment Links</CardTitle>
            <CardDescription>Add your payment details</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Links</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Payment Links</DialogTitle>
                <DialogDescription>
                  Add your payment details to make it easy for friends and family to send gifts.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="venmo">Venmo Username</Label>
                  <Input
                    id="venmo"
                    value={venmoUsername}
                    onChange={(e) => setVenmoUsername(e.target.value)}
                    placeholder="@username"
                  />
                  <p className="text-xs text-muted-foreground">
                    Include the @ symbol (e.g. @johndoe)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cashapp">Cash App Username</Label>
                  <Input
                    id="cashapp"
                    value={cashAppUsername}
                    onChange={(e) => setCashAppUsername(e.target.value)}
                    placeholder="username (without $)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter just the username without the $ symbol
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eth">ETH Address</Label>
                  <Input
                    id="eth"
                    value={ethAddress}
                    onChange={(e) => setEthAddress(e.target.value)}
                    placeholder="0x..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your Ethereum wallet address starting with 0x
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSavePaymentLinks}>Save Links</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {renderPaymentLinks()}
      </CardContent>
    </Card>
  );
};

export default PaymentSection;
