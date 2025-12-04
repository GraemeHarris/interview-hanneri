import Anthropic from "@anthropic-ai/sdk";

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
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        temperature: 0.5,
        messages: [
          {
            role: "user",
            content: `Analyze the following document and extract key information: I'm providing an example of the json output that we want: 
            {"howToTake": "ZOLSKETIL pegylated liposomal is a special formulation ...",
"whatIsUsedFor": "ZOLSKETIL pegylated liposomal is an anti-cancer agent..",
"activeSubstances": ["doxorubicin hydrochloride"],
"regulatoryDetails": "Marketing authorization granted on May 31, 2022....", "marketAuthHolderDetails": {
	"name": "Accord Healthcare S.L.U.",
	"address": "World Trade Center, Moll de Barcelona, s/n..."
},
"posologyAndAdministration": "ZOLSKETIL pegylated liposomal must only be administered..."}
            \n\n${text}`,
          },
        ],
      });

      const content = message.content[0];
      if (content.type === "text") {
        return content.text;
      }
      return null;
    } catch (error) {
      console.error("Analysis failed:", error);
      return null;
    }
  }

  async translate(text: string): Promise<string | null> {
    try {
      const message = await this.client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        temperature: 0.5,
        messages: [
          {
            role: "user",
            content: `Translate the following text from Dutch to English:\n\n${text}`,
          },
        ],
      });

      const content = message.content[0];
      if (content.type === "text") {
        return content.text;
      }
      return null;
    } catch (error) {
      console.error("Translation failed:", error);
      return null;
    }
  }

  async detectLanguage(text: string): Promise<string | null> {
    try {
      const message = await this.client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 100,
        temperature: 0,
        messages: [
          {
            role: "user",
            content: `Detect the language of the following text. Respond with ONLY the language name (e.g., "English", "Dutch", "French"). Text:\n\n${text.substring(
              0,
              500
            )}`,
          },
        ],
      });

      const content = message.content[0];
      if (content.type === "text") {
        return content.text.trim();
      }
      return null;
    } catch (error) {
      console.error("Language detection failed:", error);
      return null;
    }
  }
}
