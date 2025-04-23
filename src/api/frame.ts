
import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  // Set CORS headers to allow Farcaster to access this endpoint
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST and GET methods
  if (req.method !== 'POST' && req.method !== 'GET') {
    console.log(`Invalid method: ${req.method}`);
    return res.status(200).json({ 
      frames: {
        version: 'vNext',
        image: 'https://lovable.dev/opengraph-image-p98pqg.png',
        title: 'DadPrep - Method Not Allowed',
        buttons: [{ label: 'Try Again', action: 'post' }]
      }
    });
  }

  try {
    console.log('Frame request received:', req.method, JSON.stringify(req.body || {}));
    
    // Extract data based on request method
    let buttonIndex = 0;
    
    if (req.method === 'POST') {
      // Try multiple possible request formats from Farcaster
      const { untrustedData } = req.body || {};
      
      if (untrustedData && untrustedData.buttonIndex !== undefined) {
        buttonIndex = untrustedData.buttonIndex;
        console.log('Button index from untrustedData:', buttonIndex);
      } else if (req.body && req.body.buttonIndex !== undefined) {
        buttonIndex = req.body.buttonIndex;
        console.log('Button index from body:', buttonIndex);
      } else if (req.body && req.body.data && req.body.data.buttonIndex !== undefined) {
        buttonIndex = req.body.data.buttonIndex;
        console.log('Button index from body.data:', buttonIndex);
      } else if (req.query && req.query.buttonIndex !== undefined) {
        buttonIndex = Number(req.query.buttonIndex);
        console.log('Button index from query:', buttonIndex);
      } else {
        console.log('No button data found in request. Request body:', JSON.stringify(req.body || {}), 'Query:', JSON.stringify(req.query || {}));
      }
    }

    // Handle the "Track Pregnancy" button click
    if (buttonIndex === 1) {
      console.log('Track Pregnancy button clicked');
      // Return the next frame with pregnancy tracking info
      return res.status(200).json({
        frames: {
          version: 'vNext',
          image: 'https://lovable.dev/opengraph-image-p98pqg.png',
          title: 'DadPrep Pregnancy Tracker',
          buttons: [
            {
              label: 'Visit DadPrep',
              action: 'link',
              target: 'https://dad-prep-baby-guide.lovable.app'
            }
          ],
        }
      });
    }

    // Default response for initial load or unknown button clicks
    console.log('Returning default frame response');
    return res.status(200).json({
      frames: {
        version: 'vNext',
        image: 'https://lovable.dev/opengraph-image-p98pqg.png',
        title: 'DadPrep - The Ultimate Baby Guide for Fathers',
        buttons: [
          {
            label: 'Track Pregnancy',
            action: 'post'
          }
        ],
      }
    });
  } catch (error) {
    console.error('Frame error:', error);
    
    // Even on error, return a valid frame response
    return res.status(200).json({
      frames: {
        version: 'vNext',
        image: 'https://lovable.dev/opengraph-image-p98pqg.png',
        title: 'DadPrep - Error Recovered',
        buttons: [
          {
            label: 'Try Again',
            action: 'post'
          }
        ],
      }
    });
  }
}
