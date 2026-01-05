import { PatientRegistrationForm } from '@/components/patient-registration-form';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';

export default function PatientRegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
      <div className="absolute top-6 left-6">
        <Link href="/" className="font-bold text-lg flex items-center gap-2">
          <Logo className="w-6 h-6 text-primary" />
          <span className="font-headline">CareSRE</span>
        </Link>
      </div>
      <PatientRegistrationForm />
    </div>
  );
}
