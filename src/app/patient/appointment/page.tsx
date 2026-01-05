'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import { Home, User, Clock, BriefcaseMedical, Tag, AlertTriangle, MessageSquare } from 'lucide-react';
import type { AppointmentDetails } from '@/lib/types';
import { cn } from '@/lib/utils';

function AppointmentCard() {
  const searchParams = useSearchParams();

  const details: AppointmentDetails = {
    patientName: searchParams.get('patientName') || 'N/A',
    tokenNumber: Number(searchParams.get('tokenNumber')) || 0,
    timeWindowStart: searchParams.get('timeWindowStart') || 'N/A',
    timeWindowEnd: searchParams.get('timeWindowEnd') || 'N/A',
    estimatedWaitTime: searchParams.get('estimatedWaitTime') || 'N/A',
    department: searchParams.get('department') || 'N/A',
    urgency: (searchParams.get('urgency') as AppointmentDetails['urgency']) || 'low',
    reason: searchParams.get('reason') || 'No details provided.',
  };

  const getUrgencyClass = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-destructive/80 border-destructive text-destructive-foreground';
      case 'medium': return 'bg-amber-500 border-amber-600 text-black';
      default: return 'bg-green-500 border-green-600 text-white';
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in-95">
      <CardHeader className="bg-primary text-primary-foreground p-6 rounded-t-lg text-center">
        <CardTitle className="font-headline text-3xl">Appointment Confirmed</CardTitle>
        <CardDescription className="text-primary-foreground/80">Please find your appointment details below. A screenshot is recommended.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 grid gap-6">
        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <User className="w-8 h-8 text-primary flex-shrink-0"/>
          <div>
            <p className="text-sm text-muted-foreground">Patient Name</p>
            <p className="text-lg font-semibold">{details.patientName}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <Tag className="w-8 h-8 text-primary"/>
            <div>
              <p className="text-sm text-muted-foreground">Token Number</p>
              <p className="text-3xl font-bold">#{details.tokenNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <BriefcaseMedical className="w-8 h-8 text-primary"/>
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="text-lg font-semibold">{details.department}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="w-8 h-8 text-primary"/>
            <div>
              <p className="text-sm text-muted-foreground">Appointment Time</p>
              <p className="text-lg font-semibold">{details.timeWindowStart} - {details.timeWindowEnd}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-primary"/>
            <div>
              <p className="text-sm text-muted-foreground">Urgency</p>
              <Badge className={cn('text-md capitalize', getUrgencyClass(details.urgency))}>{details.urgency}</Badge>
            </div>
          </div>
        </div>
         <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
          <MessageSquare className="w-6 h-6 text-primary flex-shrink-0 mt-1"/>
          <div>
            <p className="text-sm font-semibold">Triage Assessment</p>
            <p className="text-sm text-muted-foreground">{details.reason}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 border-t flex justify-center">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Go to Homepage
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}


export default function AppointmentPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
      <Suspense fallback={<Card className="w-full max-w-2xl h-96 animate-pulse" />}>
        <AppointmentCard />
      </Suspense>
    </div>
  );
}
