
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Baby, CalendarCheck, Utensils, BookOpen, ShoppingBag, Smile, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ThemeToggle } from '../theme/theme-toggle';
import { useUser } from '@/contexts/UserContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { toast } = useToast();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <nav className="bg-card shadow-sm border-b mb-6">
      <div className="app-container py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <Baby className="h-8 w-8 text-dadblue mr-2" />
            <Link to="/" className="text-2xl font-bold text-dadblue">DadPrep</Link>
          </div>
          
          <div className="flex items-center space-x-1">
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <User className="mr-1 h-4 w-4" /> 
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem disabled>Profile</DropdownMenuItem>
                  <DropdownMenuItem disabled>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex justify-between mt-4 overflow-x-auto pb-1">
          <Link to="/" className="flex flex-col items-center px-4 py-2 text-sm text-muted-foreground hover:text-dadblue">
            <CalendarCheck className="h-5 w-5 mb-1" />
            <span>Tracker</span>
          </Link>
          <Link to="/meals" className="flex flex-col items-center px-4 py-2 text-sm text-muted-foreground hover:text-dadblue">
            <Utensils className="h-5 w-5 mb-1" />
            <span>Meals</span>
          </Link>
          <Link to="/names" className="flex flex-col items-center px-4 py-2 text-sm text-muted-foreground hover:text-dadblue">
            <BookOpen className="h-5 w-5 mb-1" />
            <span>Names</span>
          </Link>
          <Link to="/registry" className="flex flex-col items-center px-4 py-2 text-sm text-muted-foreground hover:text-dadblue">
            <ShoppingBag className="h-5 w-5 mb-1" />
            <span>Registry</span>
          </Link>
          <Link to="/dad-jokes" className="flex flex-col items-center px-4 py-2 text-sm text-muted-foreground hover:text-dadblue">
            <Smile className="h-5 w-5 mb-1" />
            <span>Dad Jokes</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
