import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Export configuration
export const config = {
  baseUrl: process.env.FLOWYTEAM_API_URL || 'https://flowyteam.com',
};

export default config;
