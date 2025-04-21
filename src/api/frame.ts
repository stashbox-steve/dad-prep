
import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract the frame data from the request
    const { untrustedData } = req.body;
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

    // Default response if no button was clicked
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
    return res.status(500).json({ error: 'Internal server error' });
  }
}
