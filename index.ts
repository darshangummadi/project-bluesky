import { BskyAgent } from '@atproto/api';
import { RichText } from '@atproto/api';
import TLDs from 'tlds';
import { AppBskyRichtextFacet } from '@atproto/api';
import dotenv from 'dotenv';

dotenv.config();

const agent = new BskyAgent({ service: 'https://bsky.social' });

async function run() {
  try {
    if (!process.env.BSKY_HANDLE || !process.env.BSKY_PASSWORD) {
      throw new Error('Environment variables BSKY_HANDLE and BSKY_PASSWORD must be set');
    }

    await agent.login({
      identifier: process.env.BSKY_HANDLE,
      password: process.env.BSKY_PASSWORD,
    });

    const post = await agent.post({
      text: 'Darshan',
      createdAt: new Date().toISOString(),
    });

    console.log('Posted:', post);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

run().catch(console.error);
