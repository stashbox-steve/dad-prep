
import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  console.log('Frame handler called with method:', req.method);
  
  // CORS headers for Farcaster
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Default response for initial frame load
    return res.status(200).json({
      frames: {
        version: 'vNext',
        image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1', // Grey tabby kitten image as baby placeholder
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
    
    // Error response
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to process frame request'
    });
  }
}

