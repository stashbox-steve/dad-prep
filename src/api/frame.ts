
import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract the frame data from the request
    const { untrustedData } = req.body;
    
    // If there's no untrustedData in the request
    if (!untrustedData) {
      console.log('No untrustedData in request:', req.body);
      
      // Return a fallback response that still works
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
    }
    
    const { buttonIndex } = untrustedData;

    // Handle the "Track Pregnancy" button click
    if (buttonIndex === 1) {
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
              target: 'https://dadprep.lovable.dev'
            }
          ],
        }
      });
    }

    // Default response if no button was clicked or buttonIndex was not 1
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
