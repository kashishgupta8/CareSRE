'use server';

/**
 * @fileOverview A patient triage AI agent.
 *
 * - patientTriage - A function that handles the patient triage process.
 * - PatientTriageInput - The input type for the patientTriage function.
 * - PatientTriageOutput - The return type for the patientTriage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PatientTriageInputSchema = z.object({
  symptoms: z.string().describe('The symptoms of the patient.'),
  age: z.number().describe('The age of the patient in years.'),
});
export type PatientTriageInput = z.infer<typeof PatientTriageInputSchema>;

const PatientTriageOutputSchema = z.object({
  urgency: z.enum(['high', 'medium', 'low']).describe('The urgency level of the patient.'),
  department: z.string().describe('The appropriate OPD department for the patient.'),
  reason: z.string().describe('Reasoning for the urgency and department assignment.'),
});
export type PatientTriageOutput = z.infer<typeof PatientTriageOutputSchema>;

export async function patientTriage(input: PatientTriageInput): Promise<PatientTriageOutput> {
  return patientTriageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'patientTriagePrompt',
  input: {schema: PatientTriageInputSchema},
  output: {schema: PatientTriageOutputSchema},
  prompt: `You are an AI assistant that triages patients based on their symptoms and age.

  Given the following symptoms and age, determine the urgency level (high, medium, or low) and the appropriate OPD department for the patient.

  Symptoms: {{{symptoms}}}
  Age: {{{age}}}

  Return the urgency, department, and a brief reasoning for your decision.

  Departments include:
  - Cardiology
  - Neurology
  - Oncology
  - Pediatrics
  - General Medicine

  The output must be in valid JSON format.  The urgency property must be one of: high, medium, low.
  The department property must be one of the valid department names above.
  Ensure that the JSON is parsable.  The model's output will be parsed directly by Typescript.
  Do not include any surrounding text. The JSON response must match PatientTriageOutputSchema, and the descriptions from that schema will be passed to the user.
  `, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
});

const patientTriageFlow = ai.defineFlow(
  {
    name: 'patientTriageFlow',
    inputSchema: PatientTriageInputSchema,
    outputSchema: PatientTriageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
