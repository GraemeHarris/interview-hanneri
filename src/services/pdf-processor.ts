import { ProcessingSummary } from '../types';
import { PdfExtractor } from '../services/pdf-extractor';
import { ClaudeService } from '../services/claude-service';
import { ResultWriter } from '../services/result-writer';

export class PdfProcessor {
  private pdfExtractor: PdfExtractor;
  private claudeService: ClaudeService;
  private resultWriter: ResultWriter;

  constructor(
    pdfExtractor: PdfExtractor,
    claudeService: ClaudeService,
    resultWriter: ResultWriter
  ) {
    this.pdfExtractor = pdfExtractor;
    this.claudeService = claudeService;
    this.resultWriter = resultWriter;
  }

  async processPdfs(pdfPaths: string[]): Promise<ProcessingSummary> {
    const startTime = Date.now();
    const errors: Array<{ pdf: string; error: string }> = [];
    let successCount = 0;
    let failureCount = 0;

    for (const pdfPath of pdfPaths) {
      console.log(`\nProcessing: ${pdfPath}...`);

      try {
        const extractedText = await this.pdfExtractor.extractText(pdfPath);
        if (!extractedText) {
          throw new Error('Text extraction failed');
        }

        console.log('  - Text extracted');

        const analysis = await this.claudeService.analyze(extractedText);
        if (!analysis) {
          throw new Error('Analysis failed');
        }

        console.log('  - Analysis complete');

        await new Promise(resolve => setTimeout(resolve, 1000));

        const translation = await this.claudeService.translate(analysis);
        if (!translation) {
          throw new Error('Translation failed');
        }

        console.log('  - Translation complete');

        const result = {
          sourcePdf: pdfPath,
          extractedAt: new Date().toISOString(),
          originalText: extractedText,
          analysis: analysis,
          translation: translation,
          success: true
        };

        await this.resultWriter.writeResult(result);
        successCount++;

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`✗ Failed: ${errorMessage}`);
        errors.push({ pdf: pdfPath, error: errorMessage });
        failureCount++;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const duration = Date.now() - startTime;

    return {
      totalProcessed: pdfPaths.length,
      successCount,
      failureCount,
      errors,
      duration
    };
  }
}