
import React from 'react';
import { Baby } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="app-container py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Baby className="h-6 w-6 text-dadblue mr-2" />
            <span className="text-lg font-bold text-dadblue">DadPrep</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} DadPrep. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
