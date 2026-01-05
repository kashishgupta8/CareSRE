'use server';

/**
 * @fileOverview Detects failures like doctor unavailability or OPD overload and triggers alerts with recommended actions.
 *
 * - alertException - A function that handles the alert and exception process.
 * - AlertExceptionInput - The input type for the alertException function.
 * - AlertExceptionOutput - The return type for the alertException function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AlertExceptionInputSchema = z.object({
  failureType: z.string().describe('The type of failure detected (e.g., doctor unavailability, OPD overload).'),
  details: z.string().describe('Detailed information about the failure, including relevant metrics and context.'),
});
export type AlertExceptionInput = z.infer<typeof AlertExceptionInputSchema>;

const AlertExceptionOutputSchema = z.object({
  alertSummary: z.string().describe('A concise summary of the alert.'),
  recommendedActions: z.string().describe('Specific actions recommended to address the failure.'),
});
export type AlertExceptionOutput = z.infer<typeof AlertExceptionOutputSchema>;

export async function alertException(input: AlertExceptionInput): Promise<AlertExceptionOutput> {
  return alertExceptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'alertExceptionPrompt',
  input: {schema: AlertExceptionInputSchema},
  output: {schema: AlertExceptionOutputSchema},
  prompt: `You are an AI assistant designed to detect failures in hospital operations and provide recommended actions.

You will receive information about a failure and provide:
1.  A concise summary of the alert.
2.  Specific actions recommended to address the failure.

Failure Type: {{{failureType}}}
Details: {{{details}}}

Respond with the alert summary and recommended actions.`,
});

const alertExceptionFlow = ai.defineFlow(
  {
    name: 'alertExceptionFlow',
    inputSchema: AlertExceptionInputSchema,
    outputSchema: AlertExceptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
