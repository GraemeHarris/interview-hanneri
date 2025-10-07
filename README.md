# Metly PDF Test

This is mostly a general guide. You will need to clarify and communicate with the metly team to understand the specific requirements. There are no wrong tools to use but you should think about the practicalities of the solution.


## Basic Problem Statement

We constantly need to parse pdf files for extracting data from government documents. This is a basic test bed example of what we need to do.

You will see a sample of the real pdf files we process in the data directory.
We need to parse the pdfs to ensure we get structured typesafe data to be stored in a database and used later in analysis.

In order to do this, you can use any tools at your disposal but we must include a call to an LLM to help us parse the text. You don't need to worry about access to an API, we will be peer programming and so the Metly team will run your code without cost in the session :)

**For testing purposes**: Please use the `@ai-sdk/google` package with Google Gemini models. This will allow us to quickly test your implementation during the session.

## Output Specifications

We need a cli function which takes in a folder to process all pdfs found. From there a structured output should be generated.

An example of one such output (clipped short for brevity)

```json
{"howToTake": "ZOLSKETIL pegylated liposomal is a special formulation ...",
"whatIsUsedFor": "ZOLSKETIL pegylated liposomal is an anti-cancer agent..",
"activeSubstances": ["doxorubicin hydrochloride"],
"regulatoryDetails": "Marketing authorization granted on May 31, 2022....", "marketAuthHolderDetails": {
	"name": "Accord Healthcare S.L.U.",
	"address": "World Trade Center, Moll de Barcelona, s/n..."
},
"posologyAndAdministration": "ZOLSKETIL pegylated liposomal must only be administered..."}
```

## Error Handling

Consider how your solution should handle:
- Malformed or corrupted PDF files
- PDFs that fail to parse
- Processing failures or timeouts
- Missing or invalid data in the extracted output

## Example CLI Usage

```bash
npm run start ./data
# or
bun run start ./data
```
