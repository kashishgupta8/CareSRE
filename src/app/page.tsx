import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { Wordmark } from '@/components/ui/wordmark';
import { ArrowRight } from 'lucide-react';

export default function GatewayPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A192F] text-slate-100 p-4">
      <div className="text-center flex flex-col items-center">
        <Logo className="h-20 w-20 mb-4" />
        <Wordmark className="h-24 w-auto mb-2" />

        <h1 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl md:text-4xl text-slate-300 mt-2">
          An AI-Powered Multi-Agent Hospital Management System
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-slate-400">
          Technology that strengthens care, together.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold text-lg">
            <Link href="/home">
              Enter Portal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
       <footer className="absolute bottom-8 text-center text-slate-500">
          <p className="text-sm">&copy; {new Date().getFullYear()} CareSRE. All rights reserved.</p>
       </footer>
    </div>
  );
}
