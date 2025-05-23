
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
  
  // Handle POST request (button click)
  if (req.method === 'POST') {
    try {
      console.log('Frame POST request received');
      
      return res.status(200).json({
        frames: {
          version: 'vNext',
          image: 'https://dad-prep-baby-guide.lovable.app/lovable-uploads/04181d7a-dfe2-4343-a71a-f3499f896bf4.png',
          title: 'Tracking Your Pregnancy Journey',
          buttons: [
            {
              label: 'View More Resources',
              action: 'post_redirect',
              target: 'https://dad-prep-baby-guide.lovable.app'
            }
          ],
        }
      });
    } catch (error) {
      console.error('Frame error on POST:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  // Handle GET request (initial frame load)
  try {
    console.log('Frame GET request received');
    
    return res.status(200).json({
      frames: {
        version: 'vNext',
        image: 'https://dad-prep-baby-guide.lovable.app/lovable-uploads/04181d7a-dfe2-4343-a71a-f3499f896bf4.png',
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
