
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Video } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const appointments = [
  { time: '09:00 AM', patient: 'John Smith', issue: 'Annual Checkup', status: 'Confirmed' },
  { time: '09:30 AM', patient: 'Emily Davis', issue: 'Follow-up', status: 'Confirmed' },
  { time: '10:00 AM', patient: 'Michael Johnson', issue: 'Chest Pain', status: 'Urgent' },
  { time: '10:30 AM', patient: 'Sarah Wilson', issue: 'Prescription Refill', status: 'Confirmed' },
  { time: '11:00 AM', patient: 'David Brown', issue: 'Headache', status: 'Confirmed' },
  { time: '11:30 AM', patient: 'Jessica Miller', issue: 'Virtual Consultation', status: 'Virtual' },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Urgent':
      return <Badge variant="destructive">Urgent</Badge>;
    case 'Virtual':
      return <Badge className="bg-blue-500 text-white">Virtual</Badge>;
    default:
      return <Badge variant="secondary">Confirmed</Badge>;
  }
};

export default function DoctorDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Appointments</CardTitle>
        <CardDescription>A list of your scheduled patients for today.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Reason for Visit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.time}>
                <TableCell className="font-medium">{appt.time}</TableCell>
                <TableCell>{appt.patient}</TableCell>
                <TableCell>{appt.issue}</TableCell>
                <TableCell>{getStatusBadge(appt.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Patient Details</DropdownMenuItem>
                      {appt.status === 'Virtual' && <DropdownMenuItem><Video className="mr-2 h-4 w-4" /> Start Video Call</DropdownMenuItem>}
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
