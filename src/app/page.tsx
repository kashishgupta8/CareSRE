import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');
  const patientImage = PlaceHolderImages.find((img) => img.id === 'patient-portal');
  const doctorImage = PlaceHolderImages.find((img) => img.id === 'doctor-portal');
  const adminImage = PlaceHolderImages.find((img) => img.id === 'admin-portal');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Logo className="w-6 h-6 text-primary" />
            <span className="font-headline">CareSRE</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30" />
          <div className="container relative z-10 text-center text-primary-foreground">
            <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl lg:text-7xl">
              AI-Powered Hospital Operations
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/90">
              Optimizing patient flow and resource management with intelligent automation.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="#portals">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="portals" className="py-20 md:py-28 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold text-center font-headline">Choose Your Portal</h2>
            <p className="mt-4 text-lg text-center text-muted-foreground">
              Access the tools and information you need.
            </p>
            <div className="grid gap-8 mt-12 md:grid-cols-3">
              <Card className="hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                {patientImage && (
                    <div className="relative aspect-[4/3]">
                       <Image
                        src={patientImage.imageUrl}
                        alt={patientImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={patientImage.imageHint}
                       />
                    </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline">Patient</CardTitle>
                  <CardDescription className="mt-2">Register, check your appointment, and manage your visit.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-end">
                  <Button asChild className="w-full">
                    <Link href="/patient/register">Patient Registration <ArrowRight className="ml-2 h-4 w-4"/></Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                  {doctorImage && (
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={doctorImage.imageUrl}
                        alt={doctorImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={doctorImage.imageHint}
                      />
                    </div>
                  )}
                <CardHeader>
                  <CardTitle className="font-headline">Doctor</CardTitle>
                  <CardDescription className="mt-2">View your patient schedule and access patient data securely.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-end">
                  <Button asChild className="w-full">
                    <Link href="/doctor/login">Doctor Portal <ArrowRight className="ml-2 h-4 w-4"/></Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                  {adminImage && (
                    <div className="relative aspect-[4/3]">
                       <Image
                        src={adminImage.imageUrl}
                        alt={adminImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={adminImage.imageHint}
                       />
                    </div>
                  )}
                <CardHeader>
                  <CardTitle className="font-headline">Administrator</CardTitle>
                  <CardDescription className="mt-2">Monitor real-time OPD load and get AI-powered insights.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-end">
                  <Button asChild className="w-full">
                    <Link href="/admin/login">Admin Dashboard <ArrowRight className="ml-2 h-4 w-4"/></Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t bg-muted/40">
        <div className="container text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CareSRE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
