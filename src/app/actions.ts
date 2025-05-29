"use server";

import { generateResumeSummary, type GenerateResumeSummaryInput, type GenerateResumeSummaryOutput } from '@/ai/flows/resume-summary-generator';
import { z } from 'zod';

const GenerateResumeSummaryInputSchema = z.object({
  role: z.string(),
  keywords: z.string(),
  experienceSummary: z.string(),
});

export async function generateResumeSummaryAction(
  input: GenerateResumeSummaryInput
): Promise<GenerateResumeSummaryOutput> {
  // Validate input using Zod schema from the AI flow if necessary, or trust the form validation.
  // For this example, we assume GenerateResumeSummaryInput is already validated by the form.
  // However, it's good practice to re-validate on server actions.
  const validatedInput = GenerateResumeSummaryInputSchema.parse(input);

  try {
    const result = await generateResumeSummary(validatedInput);
    return result;
  } catch (error) {
    console.error("Error in generateResumeSummaryAction:", error);
    // Return a structured error or throw to be caught by the client
    throw new Error("AI failed to generate summary. Please try again later.");
  }
}
