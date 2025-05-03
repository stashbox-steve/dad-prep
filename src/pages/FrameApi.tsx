
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import frameHandler from '../api/frame';

const FrameApi = () => {
  const location = useLocation();

  useEffect(() => {
    // This is a client-side component that will trigger the API functionality
    console.log('Frame API route accessed:', location.pathname);
    
    // In a real environment, we'd handle the request/response here
    // But for now, we'll just display information that this route exists
  }, [location]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">DadPrep Frame API</h1>
      <p className="mb-4">This is the Frame API endpoint for DadPrep.</p>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">API Information</h2>
        <p>Endpoint: /api/frame</p>
        <p>Accepts: POST, GET, OPTIONS</p>
        <p>Returns: Farcaster Frame compatible responses</p>
      </div>
      
      <div className="bg-white p-4 rounded shadow mt-4">
        <h2 className="text-xl font-semibold mb-2">Base Wallet Compatible</h2>
        <p className="mb-2">This app is optimized for Base Wallet Mini Apps.</p>
        <p>Use Base Wallet to access additional features like:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Easy onboarding</li>
          <li>Social connections</li>
          <li>In-wallet experience</li>
          <li>Secure authentication</li>
        </ul>
      </div>
    </div>
  );
};

export default FrameApi;
