
export type AppointmentDetails = {
  patientName: string;
  tokenNumber: number;
  timeWindowStart: string;
  timeWindowEnd: string;
  estimatedWaitTime: string;
  department: string;
  urgency: 'high' | 'medium' | 'low';
  reason: string;
};
