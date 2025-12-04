import * as fs from 'fs/promises';
import pdf from 'pdf-parse';

export class PdfExtractor {
  async extractText(filePath: string): Promise<string | null> {
    try {
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdf(dataBuffer);
      return data.text;
    } catch (error) {
      console.error(`Failed to extract text from ${filePath}:`, error);
      return null;
    }
  }
}