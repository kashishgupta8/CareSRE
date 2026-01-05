'use server';

/**
 * @fileOverview Allocates token numbers and time windows to patients based on OPD load, doctor availability, and priority to optimize patient flow.
 *
 * - allocateTokenAndTime - A function that handles the token and time allocation process.
 * - AllocateTokenAndTimeInput - The input type for the allocateTokenAndTime function.
 * - AllocateTokenAndTimeOutput - The return type for the allocateTokenAndTime function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AllocateTokenAndTimeInputSchema = z.object({
  patientId: z.string().describe('The unique identifier for the patient.'),
  symptoms: z.string().describe('The symptoms reported by the patient.'),
  age: z.number().describe('The age of the patient in years.'),
  opdLoad: z.string().describe('The current load status of the OPD.'),
  doctorAvailability: z.string().describe('The availability of doctors, including their schedules.'),
  priority: z.string().describe('The priority of the patient (e.g., critical, urgent, normal).'),
});
export type AllocateTokenAndTimeInput = z.infer<typeof AllocateTokenAndTimeInputSchema>;

const AllocateTokenAndTimeOutputSchema = z.object({
  tokenNumber: z.number().describe('The assigned token number for the patient.'),
  timeWindowStart: z.string().describe('The start time of the allocated time window (e.g., HH:mm).'),
  timeWindowEnd: z.string().describe('The end time of the allocated time window (e.g., HH:mm).'),
  estimatedWaitTime: z.string().describe('The estimated wait time for the patient.'),
  department: z.string().describe('The appropriate OPD department for the patient.'),
});
export type AllocateTokenAndTimeOutput = z.infer<typeof AllocateTokenAndTimeOutputSchema>;

export async function allocateTokenAndTime(input: AllocateTokenAndTimeInput): Promise<AllocateTokenAndTimeOutput> {
  return allocateTokenAndTimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'allocateTokenAndTimePrompt',
  input: {schema: AllocateTokenAndTimeInputSchema},
  output: {schema: AllocateTokenAndTimeOutputSchema},
  prompt: `You are an AI assistant that allocates token numbers and time windows to patients based on OPD load, doctor availability, and priority.

  Patient ID: {{{patientId}}}
  Symptoms: {{{symptoms}}}
  Age: {{{age}}}
  OPD Load: {{{opdLoad}}}
  Doctor Availability: {{{doctorAvailability}}}
  Priority: {{{priority}}}

  Allocate a token number and time window, optimizing patient flow and minimizing wait times. Return the allocated token number, time window start, time window end, estimated wait time, and the recommended department.
  Make sure the time window is within doctor availability window.
  Ensure to provide a valid reason if there is any delay in assigning a slot for patients of different priorities.
`,
});

const allocateTokenAndTimeFlow = ai.defineFlow(
  {
    name: 'allocateTokenAndTimeFlow',
    inputSchema: AllocateTokenAndTimeInputSchema,
    outputSchema: AllocateTokenAndTimeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
