
'use client';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { runCrowdPredictionAgent, runAlertExceptionAgent, runAdminInsightAgent } from '@/app/actions';
import { Loader2, Zap, Users, Clock, Hospital, Brain, HeartPulse, Lightbulb, Siren, Bot } from 'lucide-react';

const opdDepartments = [
  { name: 'Cardiology', icon: HeartPulse, patients: 82, wait: 45 },
  { name: 'Neurology', icon: Brain, patients: 56, wait: 30 },
  { name: 'General Medicine', icon: Hospital, patients: 112, wait: 25 },
];

export default function AdminDashboard() {
  const [isPending, startTransition] = useTransition();

  const [crowdResult, setCrowdResult] = useState<{congestionLevel?: string, suggestedActions?: string} | null>(null);
  const [alertResult, setAlertResult] = useState<{alertSummary?: string, recommendedActions?: string} | null>(null);
  const [insightResult, setInsightResult] = useState<{insights?: string} | null>(null);
  const [selectedOpd, setSelectedOpd] = useState('Cardiology');
  const [currentPatients, setCurrentPatients] = useState(82);
  const [currentWaitTime, setCurrentWaitTime] = useState(45);
  
  const handleOpdChange = (opdName: string) => {
    const opd = opdDepartments.find(d => d.name === opdName);
    if (opd) {
      setSelectedOpd(opd.name);
      setCurrentPatients(opd.patients);
      setCurrentWaitTime(opd.wait);
    }
  };
  
  const handleCrowdPrediction = (formData: FormData) => {
    startTransition(async () => {
      const { result } = await runCrowdPredictionAgent(formData);
      setCrowdResult(result);
    });
  };

  const handleAlertTrigger = () => {
    startTransition(async () => {
      const { result } = await runAlertExceptionAgent();
      setAlertResult(result);
    });
  };

  const handleInsightGeneration = (formData: FormData) => {
    startTransition(async () => {
      const { result } = await runAdminInsightAgent(formData);
      setInsightResult(result);
    });
  };

  return (
    <div className="grid gap-6 auto-rows-max">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {opdDepartments.map((dept) => (
          <Card key={dept.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{dept.name}</CardTitle>
              <dept.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dept.patients} Patients</div>
              <p className="text-xs text-muted-foreground">Avg wait time: {dept.wait} min</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lightbulb className="text-primary"/> AI-Powered Crowd Prediction</CardTitle>
            <CardDescription>Predict OPD congestion and get actionable suggestions.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleCrowdPrediction} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>OPD Department</Label>
                   <Select name="opdName" defaultValue={selectedOpd} onValueChange={handleOpdChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select OPD" />
                    </SelectTrigger>
                    <SelectContent>
                      {opdDepartments.map(d => <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-count">Patient Count</Label>
                  <Input id="patient-count" name="patientCount" type="number" value={currentPatients} onChange={e => setCurrentPatients(parseInt(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wait-time">Avg. Wait (min)</Label>
                  <Input id="wait-time" name="waitingTime" type="number" value={currentWaitTime} onChange={e => setCurrentWaitTime(parseInt(e.target.value))} />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                Predict Congestion
              </Button>
            </form>
            {crowdResult && (
              <Alert className="mt-4 bg-accent/20 border-accent">
                <Lightbulb className="h-4 w-4 text-accent-foreground" />
                <AlertTitle>Prediction Result</AlertTitle>
                <AlertDescription>
                  <p><strong>Congestion Level:</strong> {crowdResult.congestionLevel}</p>
                  <p><strong>Suggested Actions:</strong> {crowdResult.suggestedActions}</p>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Siren className="text-destructive"/> AI Alert & Exception Agent</CardTitle>
            <CardDescription>Detect and respond to operational failures in real-time.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Button onClick={handleAlertTrigger} variant="destructive" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                Simulate OPD Overload Alert
              </Button>
              {alertResult && (
                <Alert variant="destructive" className="mt-4">
                  <Siren className="h-4 w-4" />
                  <AlertTitle>{alertResult.alertSummary}</AlertTitle>
                  <AlertDescription>
                    {alertResult.recommendedActions}
                  </AlertDescription>
                </Alert>
              )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot className="text-primary"/> AI Admin Insight Agent</CardTitle>
          <CardDescription>Generate actionable insights from daily operational statistics.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleInsightGeneration} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="daily-stats">Daily OPD Statistics</Label>
              <Textarea id="daily-stats" name="stats" placeholder="Enter daily stats here. E.g., Cardiology: 82 patients, 2 doctors, 45m avg wait. Neurology: 56 patients, 1 doctor, 30m avg wait. 3 critical cases arrived via emergency." className="min-h-[100px] font-code" />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
              Generate Insights
            </Button>
          </form>
           {insightResult && (
              <Alert className="mt-4 bg-accent/20 border-accent">
                <Lightbulb className="h-4 w-4 text-accent-foreground" />
                <AlertTitle>Generated Insights</AlertTitle>
                <AlertDescription className="whitespace-pre-wrap">
                  {insightResult.insights}
                </AlertDescription>
              </Alert>
            )}
        </CardContent>
      </Card>

    </div>
  );
}
