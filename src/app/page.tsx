import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Clock, Users } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Wordmark } from '@/components/ui/wordmark';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');
  const patientImage = PlaceHolderImages.find((img) => img.id === 'patient-portal');
  const doctorImage = PlaceHolderImages.find((img) => img.id === 'doctor-portal');
  const adminImage = PlaceHolderImages.find((img) => img.id === 'admin-portal');

  const features = [
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: 'AI-Powered Triage',
      description: 'Intelligently assess patient symptoms to determine urgency and direct them to the correct department.',
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: 'Optimized Scheduling',
      description: 'Allocate appointment slots and manage patient flow in real-time to reduce wait times.',
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Real-time Dashboards',
      description: 'Provide administrators with live insights into OPD load, resource allocation, and performance metrics.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Logo className="w-8 h-8" />
            <Wordmark className="h-7" />
          </Link>
          <nav className="ml-auto hidden md:flex gap-6 text-sm font-medium">
             <Link href="#features" className="text-muted-foreground hover:text-foreground">Features</Link>
             <Link href="#portals" className="text-muted-foreground hover:text-foreground">Portals</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full py-24 md:py-32 lg:py-48">
          <div className="container relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl lg:text-7xl">
                The Future of Hospital Operations
              </h1>
              <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground">
                CareSRE uses AI to optimize patient flow, reduce wait times, and provide real-time operational intelligence.
              </p>
              <div className="mt-10 flex gap-4">
                <Button asChild size="lg">
                  <Link href="/patient/register">
                    Register as Patient
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#portals">
                    Login Portals
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto md:aspect-[4/3]">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover rounded-xl shadow-2xl"
                  priority
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-28 bg-secondary">
           <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-headline sm:text-4xl">Why CareSRE?</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Our intelligent platform transforms hospital management.
              </p>
            </div>
            <div className="grid gap-8 mt-12 md:grid-cols-3">
              {features.map((feature, i) => (
                <Card key={i} className="flex flex-col text-center items-center p-6">
                    <div className="mb-4 bg-primary/10 p-3 rounded-full">
                       {feature.icon}
                    </div>
                    <CardTitle className="font-headline text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="portals" className="py-20 md:py-28 bg-background">
          <div className="container">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline sm:text-4xl">Choose Your Portal</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Securely access the tools and information you need.
                </p>
            </div>
            <div className="grid gap-8 mt-12 md:grid-cols-3">
              {[
                { image: patientImage, title: 'Patient', desc: 'Register, check your appointment, and manage your visit.', link: '/patient/register', buttonText: 'Patient Registration' },
                { image: doctorImage, title: 'Doctor', desc: 'View your patient schedule and access patient data securely.', link: '/doctor/login', buttonText: 'Doctor Portal' },
                { image: adminImage, title: 'Administrator', desc: 'Monitor real-time OPD load and get AI-powered insights.', link: '/admin/login', buttonText: 'Admin Dashboard' },
              ].map(portal => (
                <Card key={portal.title} className="hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group">
                  {portal.image && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                         <Image
                          src={portal.image.imageUrl}
                          alt={portal.image.description}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          data-ai-hint={portal.image.imageHint}
                         />
                      </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline">{portal.title}</CardTitle>
                    <CardDescription className="mt-2 min-h-[40px]">{portal.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex items-end">
                    <Button asChild className="w-full">
                      <Link href={portal.link}>{portal.buttonText} <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t bg-muted">
        <div className="container text-center text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
              <Logo className="w-6 h-6 text-primary" />
              <Wordmark className="h-5" />
          </div>
          <p className="text-sm mt-4 md:mt-0">&copy; {new Date().getFullYear()} CareSRE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
