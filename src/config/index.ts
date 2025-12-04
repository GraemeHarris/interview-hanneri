import * as dotenv from 'dotenv';
import { Config } from '../types';

dotenv.config();

export function loadConfig(): Config {
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

  if (!anthropicApiKey) {
    console.error('Error: ANTHROPIC_API_KEY is not set in environment variables.');
    console.error('Please create a .env file with your API key.');
    console.error('Example: ANTHROPIC_API_KEY=your_api_key_here');
    process.exit(1);
  }

  return {
    anthropicApiKey,
    pdfPaths: [
      '../../data/BE664472_SPC.pdf',
      '../../data/EU-1-25-1941-001_SPC.pdf',
      '../../data/PL41203-0011_SPC.pdf'
    ],
    outputDirectory: '../output'
  };
}