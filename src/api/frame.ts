
import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  console.log('Frame handler called with method:', req.method);
  console.log('Request headers:', req.headers);
  
  // Set CORS headers to allow Farcaster to access this endpoint
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
    return res.status(200).end();
  }
  
  // Make the handler more permissive - accept any method for testing
  console.log(`Request method: ${req.method}`);
  
  try {
    console.log('Request body:', JSON.stringify(req.body || {}));
    console.log('Request query:', JSON.stringify(req.query || {}));
    
    // Extract button data from various possible formats
    let buttonIndex = 0;
    
    if (req.method === 'POST') {
      // Try all known Farcaster request formats
      if (req.body?.untrustedData?.buttonIndex !== undefined) {
        buttonIndex = req.body.untrustedData.buttonIndex;
      } else if (req.body?.buttonIndex !== undefined) {
        buttonIndex = req.body.buttonIndex;
      } else if (req.body?.data?.buttonIndex !== undefined) {
        buttonIndex = req.body.data.buttonIndex;
      } else if (req.query?.buttonIndex !== undefined) {
        buttonIndex = Number(req.query.buttonIndex);
      }
      
      console.log('Extracted buttonIndex:', buttonIndex);
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
