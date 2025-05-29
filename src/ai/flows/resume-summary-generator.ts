// use server'

/**
 * @fileOverview A resume summary generator AI agent.
 *
 * - generateResumeSummary - A function that handles the resume summary generation process.
 * - GenerateResumeSummaryInput - The input type for the generateResumeSummary function.
 * - GenerateResumeSummaryOutput - The return type for the generateResumeSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeSummaryInputSchema = z.object({
  role: z.string().describe('The role for which the resume summary is being generated.'),
  keywords: z.string().describe('Keywords to include in the resume summary.'),
  experienceSummary: z.string().describe('A summary of the users experience'),
});
export type GenerateResumeSummaryInput = z.infer<typeof GenerateResumeSummaryInputSchema>;

const GenerateResumeSummaryOutputSchema = z.object({
  summary: z.string().describe('The generated resume summary.'),
});
export type GenerateResumeSummaryOutput = z.infer<typeof GenerateResumeSummaryOutputSchema>;

export async function generateResumeSummary(input: GenerateResumeSummaryInput): Promise<GenerateResumeSummaryOutput> {
  return generateResumeSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumeSummaryPrompt',
  input: {schema: GenerateResumeSummaryInputSchema},
  output: {schema: GenerateResumeSummaryOutputSchema},
  prompt: `You are an expert resume writer. Generate a resume summary based on the provided role, keywords, and experience summary.

Role: {{{role}}}
Keywords: {{{keywords}}}
Experience Summary: {{{experienceSummary}}}

Resume Summary:`, // Make sure that the generated resume summary is concise, professional, and tailored to the specified role and keywords.
});

const generateResumeSummaryFlow = ai.defineFlow(
  {
    name: 'generateResumeSummaryFlow',
    inputSchema: GenerateResumeSummaryInputSchema,
    outputSchema: GenerateResumeSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
