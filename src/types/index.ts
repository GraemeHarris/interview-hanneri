export interface Config {
  anthropicApiKey: string;
  pdfPaths: string[];
  outputDirectory: string;
}

export interface ProcessingResult {
  sourcePdf: string;
  extractedAt: string;
  originalText: string;
  analysis: string;
  translation: string;
  success: boolean;
  error?: string;
}

export interface ProcessingSummary {
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  errors: Array<{ pdf: string; error: string }>;
  duration: number;
}