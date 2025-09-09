import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  Building2,
  Medal,
  Twitter,
  Github,
  Linkedin,
  ArrowRight,
  Compass,
  GraduationCap,
  BookOpenCheck,
  Users,
  ShieldCheck,
  University,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen  flex flex-col bg-gradient-to-b from-blue-50/60 to-white">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full border-b mt-0 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold text-primary">
            NovaPath
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            <a
              href="#about"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </a>
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-foreground"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/mentorship"
              className="hidden text-sm text-muted-foreground md:block"
            >
              Login
            </Link>
            <Link to="/signup">
              <Button className="rounded-full px-5">Signup</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-10 md:pt-20 md:pb-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Confused about your career?{" "}
              <span className="text-primary">
                Get your personalized roadmap
              </span>{" "}
              today.
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Take our quick test to discover the right stream, colleges, and
              career for you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/career-quiz">
                <Button size="lg" className="rounded-full px-6">
                  Take Career Test
                </Button>
              </Link>
              <Link to="/colleges">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6"
                >
                  Explore Colleges
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-primary/10 blur-2xl" />
            <div className="relative rounded-3xl border bg-white shadow-sm p-6">
              {/* Simple illustration */}
              <svg viewBox="0 0 500 300" className="w-full h-auto">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="100%" stopColor="#a7f3d0" />
                  </linearGradient>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="500"
                  height="300"
                  rx="16"
                  fill="url(#g1)"
                  opacity="0.35"
                />
                <g>
                  <rect
                    x="50"
                    y="110"
                    width="110"
                    height="70"
                    rx="10"
                    fill="#fff"
                  />
                  <rect
                    x="60"
                    y="125"
                    width="90"
                    height="10"
                    rx="5"
                    fill="#93c5fd"
                  />
                  <rect
                    x="60"
                    y="145"
                    width="70"
                    height="10"
                    rx="5"
                    fill="#e5e7eb"
                  />
                </g>
                <g>
                  <rect
                    x="190"
                    y="90"
                    width="120"
                    height="90"
                    rx="10"
                    fill="#fff"
                  />
                  <rect
                    x="205"
                    y="105"
                    width="90"
                    height="12"
                    rx="6"
                    fill="#a7f3d0"
                  />
                  <rect
                    x="205"
                    y="130"
                    width="70"
                    height="10"
                    rx="5"
                    fill="#e5e7eb"
                  />
                  <rect
                    x="205"
                    y="150"
                    width="60"
                    height="10"
                    rx="5"
                    fill="#e5e7eb"
                  />
                </g>
                <g>
                  <polyline
                    points="60,240 160,200 240,220 320,170 420,150"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="60" cy="240" r="5" fill="#2563eb" />
                  <circle cx="160" cy="200" r="5" fill="#2563eb" />
                  <circle cx="240" cy="220" r="5" fill="#2563eb" />
                  <circle cx="320" cy="170" r="5" fill="#2563eb" />
                  <circle cx="420" cy="150" r="5" fill="#2563eb" />
                </g>
              </svg>
              <p className="mt-3 text-sm text-muted-foreground">
                Students exploring courses, laptops, and a growth chart showing
                progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section id="features" className="mx-auto w-full px-4 pb-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="rounded-2xl">
            <CardContent className="p-6 flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-3 text-blue-700">
                <Building2 />
              </div>
              <div>
                <p className="text-2xl font-bold">7200+</p>
                <p className="text-muted-foreground">Colleges</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6 flex items-center gap-3">
              <div className="rounded-full bg-emerald-100 p-3 text-emerald-700">
                <Briefcase />
              </div>
              <div>
                <p className="text-2xl font-bold">100+</p>
                <p className="text-muted-foreground">Careers</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6 flex items-center gap-3">
              <div className="rounded-full bg-violet-100 p-3 text-violet-700">
                <Medal />
              </div>
              <div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-muted-foreground">Scholarships</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto w-full px-4 pb-12">
        <h2 className="text-xl font-semibold mb-4">How it works</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              icon: <BookOpenCheck />,
              title: "Take Test",
              desc: "10 min aptitude & interests",
            },
            {
              icon: <Compass />,
              title: "Get Roadmap",
              desc: "Personalized stream & plan",
            },
            {
              icon: <University />,
              title: "Explore",
              desc: "Colleges, careers, scholarships",
            },
            { icon: <Users />, title: "Connect", desc: "Mentors & counselors" },
          ].map((s) => (
            <Card key={s.title} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="rounded-full bg-accent p-3 w-fit mb-3 text-muted-foreground">
                  {s.icon}
                </div>
                <p className="font-medium">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="about" className="mx-auto w-full px-4 pb-12">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              icon: <Compass />,
              title: "Personalized Roadmap",
              desc: "Smart guidance based on your profile.",
            },
            {
              icon: <Building2 />,
              title: "College Explorer",
              desc: "Filter 7200+ colleges with ease.",
            },
            {
              icon: <Medal />,
              title: "Scholarship Finder",
              desc: "Track deadlines and apply fast.",
            },
            {
              icon: <Users />,
              title: "Expert Mentorship",
              desc: "Book sessions with mentors & alumni.",
            },
          ].map((f) => (
            <Card key={f.title} className="rounded-2xl border-blue-100">
              <CardContent className="p-6">
                <div className="rounded-full bg-blue-50 text-blue-700 p-3 w-fit mb-3">
                  {f.icon}
                </div>
                <p className="font-medium">{f.title}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto w-full px-4 pb-12">
        <h2 className="text-xl font-semibold mb-4">What students say</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              name: "Aisha",
              quote: "NovaPath helped me pick CS and shortlist scholarships.",
              img: "/placeholder.svg",
            },
            {
              name: "Rahul",
              quote: "The roadmap made decisions simple and stress-free.",
              img: "/placeholder.svg",
            },
            {
              name: "Meera",
              quote: "Mentor calls were super helpful for my PhD plans.",
              img: "/placeholder.svg",
            },
          ].map((t) => (
            <Card key={t.name} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={t.img} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="font-medium">{t.name}</p>
                </div>
                <p className="text-sm text-foreground/80">“{t.quote}”</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Roadmap preview */}
      <section className="mx-auto w-full px-4 pb-12">
        <Card className="rounded-2xl">
          <CardContent className="p-6 md:p-8 grid gap-6 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-lg font-semibold">See your career roadmap</h3>
              <p className="text-sm text-muted-foreground">
                A visual plan from degree to internships and jobs—built from
                your strengths.
              </p>
              <div className="mt-4 flex gap-3">
                <Link to="/career-pathway">
                  <Button>Take the Test</Button>
                </Link>
                <Link to="/career-pathway">
                  <Button variant="outline">Learn more</Button>
                </Link>
              </div>
            </div>
            <div className="relative rounded-xl border bg-white p-4">
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="text-blue-600" /> B.Sc →{" "}
                <Briefcase className="text-emerald-600" /> AI Engineer →{" "}
                <Medal className="text-violet-600" /> Scholarships
              </div>
              <div className="mt-3 h-2 rounded-full bg-blue-100">
                <div className="h-2 w-1/2 rounded-full bg-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-2xl border p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-600" /> Trusted by 50,000+
              students
            </span>
            <span className="flex items-center gap-2">
              <Building2 /> Partner Colleges
            </span>
            <span className="flex items-center gap-2">
              <Building2 /> Global Universities
            </span>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="mx-auto w-full px-4 pb-12">
        <h2 className="text-xl font-semibold mb-4">Resources</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Top Emerging Careers in 2025", img: "/placeholder.svg" },
            {
              title: "How to Choose a College that Fits",
              img: "/placeholder.svg",
            },
            {
              title: "Scholarship Deadlines You Can’t Miss",
              img: "/placeholder.svg",
            },
          ].map((b) => (
            <Card key={b.title} className="rounded-2xl overflow-hidden">
              <img
                src={b.img}
                alt="thumb"
                className="h-32 w-full object-cover"
              />
              <CardContent className="p-4">
                <p className="font-medium leading-tight">{b.title}</p>
                <Button variant="link" className="px-0">
                  Read more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full px-4 pb-12">
        <h2 className="text-xl font-semibold mb-4">FAQs</h2>
        <Accordion type="single" collapsible className="p-2 rounded-2xl border">
          <AccordionItem value="q1">
            <AccordionTrigger>Is the test free?</AccordionTrigger>
            <AccordionContent>
              Yes, the career test is free and takes about 10 minutes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>Can I change my stream later?</AccordionTrigger>
            <AccordionContent>
              Absolutely. The roadmap adapts as your interests evolve.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>
              Do you work with international colleges?
            </AccordionTrigger>
            <AccordionContent>
              We list global programs and can connect you with mentors abroad.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Newsletter */}
      <section className="mx-auto w-full px-4 pb-12">
        <Card className="rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-100">
          <CardContent className="p-6 md:p-8">
            <div className="md:flex md:items-center md:justify-between md:gap-6">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold">
                  Get the latest career insights & scholarship alerts
                </h3>
                <p className="text-sm text-muted-foreground">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="rounded-full"
                />
                <Button className="rounded-full px-6">Subscribe</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <Card className="rounded-2xl text-center">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold">
              Don’t leave your future to chance. Start now!
            </h3>
            <div className="mt-4">
              <Link to="/career-pathway">
                <Button className="rounded-full px-6">
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer id="contact" className="mt-auto border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 grid gap-4 md:grid-cols-2">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NovaPath. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 justify-start md:justify-end text-sm">
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
            <span className="flex items-center gap-2">
              <a
                href="#"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github />
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
