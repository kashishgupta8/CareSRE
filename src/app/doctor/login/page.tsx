import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/ui/logo';

export default function DoctorLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Logo className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">Doctor Portal</CardTitle>
          <CardDescription>Sign in to view your schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/doctor/dashboard" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="doctor@example.com" required defaultValue="doctor@caresre.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
           <div className="mt-4 text-center text-sm">
            <Link href="/" className="underline">
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
