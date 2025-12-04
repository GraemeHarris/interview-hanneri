import { loadConfig } from './config';
import { PdfExtractor } from './services/pdf-extractor';
import { ClaudeService } from './services/claude-service';
import { ResultWriter } from './services/result-writer';
import { PdfProcessor } from './services/pdf-processor';

async function main() {
  console.log('=== PDF to Claude Analyzer ===\n');

  const config = loadConfig();
  console.log(`Loaded configuration`);
  console.log(`PDFs to process: ${config.pdfPaths.length}`);
  console.log(`Output directory: ${config.outputDirectory}\n`);

  const pdfExtractor = new PdfExtractor();
  const claudeService = new ClaudeService(config.anthropicApiKey);
  const resultWriter = new ResultWriter(config.outputDirectory);
  const processor = new PdfProcessor(pdfExtractor, claudeService, resultWriter);

  console.log('Starting processing...');

  const summary = await processor.processPdfs(config.pdfPaths);

  console.log('\n=== Processing Summary ===');
  console.log(`Total PDFs: ${summary.totalProcessed}`);
  console.log(`Successful: ${summary.successCount}`);
  console.log(`Failed: ${summary.failureCount}`);
  console.log(`Duration: ${(summary.duration / 1000).toFixed(2)}s`);

  if (summary.errors.length > 0) {
    console.log('\n=== Errors ===');
    summary.errors.forEach(({ pdf, error }) => {
      console.log(`- ${pdf}: ${error}`);
    });
  }

  console.log('\nDone!');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});