import { config } from 'dotenv';
config();

import '@/ai/flows/patient-triage-agent.ts';
import '@/ai/flows/admin-insight-agent.ts';
import '@/ai/flows/token-time-allocation-agent.ts';
import '@/ai/flows/alert-exception-agent.ts';
import '@/ai/flows/crowd-prediction-agent.ts';