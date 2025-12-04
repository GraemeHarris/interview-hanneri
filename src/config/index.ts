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
      'I:/Grownup Stuff/Work/Metly/interview-hanneri/data/BE664472_SPC.pdf',
      'I:/Grownup Stuff/Work/Metly/interview-hanneri/data/EU-1-25-1941-001_SPC.pdf',
      'I:/Grownup Stuff/Work/Metly/interview-hanneri/data/PL41203-0011_SPC.pdf'
    ],
    outputDirectory: 'I:/Grownup Stuff/Work/Metly/interview-hanneri/results'
  };
}