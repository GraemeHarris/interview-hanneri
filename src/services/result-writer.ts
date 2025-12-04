import * as fs from 'fs/promises';
import * as path from 'path';
import { ProcessingResult } from '../types';

export class ResultWriter {
  private outputDirectory: string;

  constructor(outputDirectory: string) {
    this.outputDirectory = outputDirectory;
  }

  async writeResult(result: ProcessingResult): Promise<boolean> {
    try {
      await fs.mkdir(this.outputDirectory, { recursive: true });

      const pdfName = path.basename(result.sourcePdf, '.pdf');
      const outputFileName = `${pdfName}-result.json`;
      const outputPath = path.join(this.outputDirectory, outputFileName);

      await fs.writeFile(
        outputPath,
        JSON.stringify(result, null, 2),
        'utf-8'
      );

      console.log(`✓ Result saved: ${outputFileName}`);
      return true;
    } catch (error) {
      console.error(`Failed to write result for ${result.sourcePdf}:`, error);
      return false;
    }
  }
}