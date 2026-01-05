
'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { patientTriage } from '@/ai/flows/patient-triage-agent';
import { allocateTokenAndTime } from '@/ai/flows/token-time-allocation-agent';
import { predictOpdCongestion } from '@/ai/flows/crowd-prediction-agent';
import { alertException } from '@/ai/flows/alert-exception-agent';
import { getAdminInsights } from '@/ai/flows/admin-insight-agent';
import type { AppointmentDetails } from '@/lib/types';
import { revalidatePath } from 'next/cache';

const PatientRegistrationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.coerce.number().int().min(0, { message: 'Age must be a positive number.' }).max(120),
  symptoms: z.string().min(10, { message: 'Please describe your symptoms in at least 10 characters.' }),
});

export async function registerPatient(prevState: any, formData: FormData) {
  const validatedFields = PatientRegistrationSchema.safeParse({
    name: formData.get('name'),
    age: formData.get('age'),
    symptoms: formData.get('symptoms'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }

  const { name, age, symptoms } = validatedFields.data;

  try {
    const triageResult = await patientTriage({ age, symptoms });
    
    const allocationResult = await allocateTokenAndTime({
      patientId: name, // Using name as a temporary ID
      age,
      symptoms,
      opdLoad: 'Medium', // Example data
      doctorAvailability: 'Available', // Example data
      priority: triageResult.urgency,
    });
    
    const appointmentDetails: AppointmentDetails = {
      patientName: name,
      ...triageResult,
      ...allocationResult,
    };

    const params = new URLSearchParams();
    Object.entries(appointmentDetails).forEach(([key, value]) => {
      params.append(key, String(value));
    });

    redirect(`/patient/appointment?${params.toString()}`);

  } catch (error) {
    console.error('Patient registration failed:', error);
    return {
      message: 'An unexpected error occurred. Our AI systems may be busy. Please try again later.',
    };
  }
}

const CrowdPredictionSchema = z.object({
  opdName: z.string(),
  patientCount: z.coerce.number(),
  waitingTime: z.coerce.number(),
});

export async function runCrowdPredictionAgent(formData: FormData) {
  const validatedFields = CrowdPredictionSchema.safeParse({
    opdName: formData.get('opdName'),
    patientCount: formData.get('patientCount'),
    waitingTime: formData.get('waitingTime'),
  });

  if (!validatedFields.success) {
    return { error: 'Invalid input.' };
  }

  const result = await predictOpdCongestion({
    ...validatedFields.data,
    currentTime: new Date().toLocaleTimeString(),
  });
  
  revalidatePath('/admin/dashboard');
  return { result };
}

export async function runAlertExceptionAgent() {
  const result = await alertException({
    failureType: 'OPD Overload',
    details: 'Cardiology OPD patient count is at 150% capacity. Average wait time has increased to 90 minutes.',
  });
  revalidatePath('/admin/dashboard');
  return { result };
}

const AdminInsightSchema = z.object({
  stats: z.string().min(20, { message: 'Please provide more detailed stats.'}),
});

export async function runAdminInsightAgent(formData: FormData) {
  const validatedFields = AdminInsightSchema.safeParse({
    stats: formData.get('stats'),
  });

   if (!validatedFields.success) {
    return { error: 'Invalid input.' };
  }

  const result = await getAdminInsights({
    dailyOpdStats: validatedFields.data.stats,
  });

  revalidatePath('/admin/dashboard');
  return { result };
}
