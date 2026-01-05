'use server';

/**
 * @fileOverview This file defines the AdminInsightAgent flow, which provides actionable insights to hospital administrators based on daily OPD stats.
 *
 * - getAdminInsights - A function that retrieves actionable insights for hospital administrators.
 * - AdminInsightsInput - The input type for the getAdminInsights function.
 * - AdminInsightsOutput - The return type for the getAdminInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminInsightsInputSchema = z.object({
  dailyOpdStats: z
    .string()
    .describe('Daily OPD statistics, including department-wise patient counts, doctor availability, and any significant events or anomalies.'),
});
export type AdminInsightsInput = z.infer<typeof AdminInsightsInputSchema>;

const AdminInsightsOutputSchema = z.object({
  insights: z
    .string()
    .describe('Actionable insights for hospital administrators, including recommendations for improving patient flow, resource allocation, and overall OPD efficiency.'),
});
export type AdminInsightsOutput = z.infer<typeof AdminInsightsOutputSchema>;

export async function getAdminInsights(input: AdminInsightsInput): Promise<AdminInsightsOutput> {
  return adminInsightAgentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adminInsightAgentPrompt',
  input: {schema: AdminInsightsInputSchema},
  output: {schema: AdminInsightsOutputSchema},
  prompt: `You are an AI assistant providing actionable insights to hospital administrators based on daily OPD statistics.

  Analyze the following daily OPD stats and provide clear, concise, and actionable recommendations for improving hospital operations. Consider patient flow, resource allocation, and overall efficiency.

  Daily OPD Stats:
  {{dailyOpdStats}}

  Insights:`,
});

const adminInsightAgentFlow = ai.defineFlow(
  {
    name: 'adminInsightAgentFlow',
    inputSchema: AdminInsightsInputSchema,
    outputSchema: AdminInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
