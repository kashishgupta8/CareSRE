'use server';
/**
 * @fileOverview Predicts congestion levels in different OPDs and suggests actions to mitigate overcrowding.
 *
 * - predictOpdCongestion - A function that handles the OPD congestion prediction process.
 * - PredictOpdCongestionInput - The input type for the predictOpdCongestion function.
 * - PredictOpdCongestionOutput - The return type for the predictOpdCongestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictOpdCongestionInputSchema = z.object({
  opdName: z.string().describe('The name of the OPD.'),
  currentTime: z.string().describe('The current time.'),
  patientCount: z.number().describe('The current number of patients in the OPD.'),
  waitingTime: z.number().describe('The average waiting time for patients in the OPD.'),
});
export type PredictOpdCongestionInput = z.infer<typeof PredictOpdCongestionInputSchema>;

const PredictOpdCongestionOutputSchema = z.object({
  congestionLevel: z.string().describe('The predicted congestion level (Low, Medium, High).'),
  suggestedActions: z.string().describe('Suggested actions to mitigate overcrowding (e.g., shifting slots, delaying walk-ins).'),
});
export type PredictOpdCongestionOutput = z.infer<typeof PredictOpdCongestionOutputSchema>;

export async function predictOpdCongestion(input: PredictOpdCongestionInput): Promise<PredictOpdCongestionOutput> {
  return predictOpdCongestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictOpdCongestionPrompt',
  input: {schema: PredictOpdCongestionInputSchema},
  output: {schema: PredictOpdCongestionOutputSchema},
  prompt: `You are an AI assistant that helps predict congestion levels in different OPDs of a hospital.

  Based on the current time, patient count, and average waiting time, predict the congestion level (Low, Medium, High) for the specified OPD and suggest actions to mitigate overcrowding.

  OPD Name: {{{opdName}}}
  Current Time: {{{currentTime}}}
  Patient Count: {{{patientCount}}}
  Average Waiting Time: {{{waitingTime}}} minutes

  Respond with the predicted congestion level and suggested actions.`,
});

const predictOpdCongestionFlow = ai.defineFlow(
  {
    name: 'predictOpdCongestionFlow',
    inputSchema: PredictOpdCongestionInputSchema,
    outputSchema: PredictOpdCongestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
