
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Check if running in Base Wallet environment
const isInBaseWallet = window.location.href.includes('base.org') || 
                      window.location.href.includes('coinbase.com') ||
                      navigator.userAgent.includes('Base');

// Apply optimizations for Base Wallet
if (isInBaseWallet) {
  console.log('Running in Base Wallet environment');
  document.documentElement.classList.add('in-base-wallet');
}

createRoot(document.getElementById("root")!).render(<App />);
