import Anthropic from '@anthropic-ai/sdk';

export class ClaudeService {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({
      apiKey: apiKey,
    });
  }

  async analyze(text: string): Promise<string | null> {
    try {
      const message = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        temperature: 0.5,
        messages: [
          {
            role: 'user',
            content: `Analyze the following document and extract key information:\n\n${text}`
          }
        ]
      });

      const content = message.content[0];
      if (content.type === 'text') {
        return content.text;
      }
      return null;
    } catch (error) {
      console.error('Analysis failed:', error);
      return null;
    }
  }

  async translate(text: string): Promise<string | null> {
    try {
      const message = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        temperature: 0.5,
        messages: [
          {
            role: 'user',
            content: `Translate the following text from Dutch to English:\n\n${text}`
          }
        ]
      });

      const content = message.content[0];
      if (content.type === 'text') {
        return content.text;
      }
      return null;
    } catch (error) {
      console.error('Translation failed:', error);
      return null;
    }
  }
}