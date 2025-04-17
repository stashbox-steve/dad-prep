
import React from 'react';
import { Link } from 'react-router-dom';
import { Baby, CalendarCheck, Utensils, BookOpen, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const { toast } = useToast();
  
  const handleAccountClick = () => {
    toast({
      title: "Coming Soon!",
      description: "User account functionality will be added in the next update.",
    });
  };

  return (
    <nav className="bg-white shadow-sm border-b mb-6">
      <div className="app-container py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <Baby className="h-8 w-8 text-dadblue mr-2" />
            <Link to="/" className="text-2xl font-bold text-dadblue">DadPrep</Link>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button onClick={handleAccountClick} variant="ghost" size="sm" className="text-neutral-dark">
              Sign In
            </Button>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex justify-between mt-4 overflow-x-auto pb-1">
          <Link to="/" className="flex flex-col items-center px-4 py-2 text-sm text-neutral-dark hover:text-dadblue">
            <CalendarCheck className="h-5 w-5 mb-1" />
            <span>Tracker</span>
          </Link>
          <Link to="/meals" className="flex flex-col items-center px-4 py-2 text-sm text-neutral-dark hover:text-dadblue">
            <Utensils className="h-5 w-5 mb-1" />
            <span>Meals</span>
          </Link>
          <Link to="/names" className="flex flex-col items-center px-4 py-2 text-sm text-neutral-dark hover:text-dadblue">
            <BookOpen className="h-5 w-5 mb-1" />
            <span>Names</span>
          </Link>
          <Link to="/registry" className="flex flex-col items-center px-4 py-2 text-sm text-neutral-dark hover:text-dadblue">
            <ShoppingBag className="h-5 w-5 mb-1" />
            <span>Registry</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
