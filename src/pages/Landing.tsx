
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
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
import { useEffect } from "react";

export default function Landing() {
    const apiUrl = import.meta.env.VITE_API_URL;
  useEffect( () => {
    
    const response =async ()=>{ await fetch(`${apiUrl}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        
      }); }
     
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-extrabold text-3xl text-gray-900 tracking-tight">
            Guide<span className="text-blue-600">Sutra</span>
          </Link>
          <nav className="hidden gap-8 text-sm md:flex">
            <a
              href="#about"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/signin"
              className="hidden text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium md:block"
            >
              Login
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 shadow-lg transition-transform hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full px-24 pt-20 pb-16 md:pt-28 md:pb-24 grid items-center gap-16 md:grid-cols-2">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter text-gray-900">
            Discover the right path
            <br className="hidden md:block" />
            <span className="text-blue-600"> for your future.</span>
          </h1>
          <p className="mt-6 text-gray-600 text-xl leading-relaxed">
            Personalized assessments, clear career pathways, and a comprehensive college finder—all in one seamless experience.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/signup?role=student">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-xl transition-transform hover:scale-105">
                Take Career Test
              </Button>
            </Link>
            <Link to="/colleges">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-3 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-100 text-gray-700 transition-transform hover:scale-105"
              >
                Explore Colleges
              </Button>
            </Link>
          </div>
          <div className="mt-8">
            <div className="text-sm text-gray-500 mb-3 font-medium">
              Get started as
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup?role=student">
                <Button variant="secondary" className="rounded-full px-6 py-2 font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors">
                  Student
                </Button>
              </Link>
              <Link to="/signup?role=parent">
                <Button variant="secondary" className="rounded-full px-6 py-2 font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors">
                  Parent
                </Button>
              </Link>
              <Link to="/signup?role=counselor">
                <Button variant="secondary" className="rounded-full px-6 py-2 font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors">
                  Counselor
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative p-8">
          <div className="absolute inset-0 rounded-3xl bg-blue-100/50 blur-2xl opacity-70" />
          <div className="relative rounded-3xl border border-gray-200 bg-white shadow-xl p-8">
            <svg viewBox="0 0 500 300" className="w-full h-auto">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="500" height="300" rx="16" fill="url(#g1)" opacity="0.15" />
              <g>
                <rect x="50" y="110" width="110" height="70" rx="10" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
                <rect x="60" y="125" width="90" height="10" rx="5" fill="#60a5fa" />
                <rect x="60" y="145" width="70" height="10" rx="5" fill="#e5e7eb" />
              </g>
              <g>
                <rect x="190" y="90" width="120" height="90" rx="10" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
                <rect x="205" y="105" width="90" height="12" rx="6" fill="#34d399" />
                <rect x="205" y="130" width="70" height="10" rx="5" fill="#e5e7eb" />
                <rect x="205" y="150" width="60" height="10" rx="5" fill="#e5e7eb" />
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
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mx-auto w-full px-24 pb-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <Card className="rounded-3xl border-gray-200 shadow-sm transition-transform hover:scale-105">
            <CardContent className="p-8 flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-4 text-blue-700">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">70+</p>
                <p className="text-gray-500">Colleges</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-gray-200 shadow-sm transition-transform hover:scale-105">
            <CardContent className="p-8 flex items-center gap-4">
              <div className="rounded-full bg-emerald-100 p-4 text-emerald-700">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">100+</p>
                <p className="text-gray-500">Careers</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-gray-200 shadow-sm transition-transform hover:scale-105">
            <CardContent className="p-8 flex items-center gap-4">
              <div className="rounded-full bg-violet-100 p-4 text-violet-700">
                <Medal className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">50+</p>
                <p className="text-gray-500">Scholarships</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      ---

      {/* How It Works */}
      <section className="mx-auto w-full px-24 pb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">How it works</h2>
        <div className="grid gap-6 md:grid-cols-4">
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
            <Card key={s.title} className="rounded-3xl border-gray-200 shadow-sm transition-transform hover:scale-105">
              <CardContent className="p-8">
                <div className="rounded-full bg-blue-50 p-4 w-fit mb-4 text-blue-600">
                  {s.icon}
                </div>
                <p className="font-bold text-lg text-gray-900">{s.title}</p>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      ---

      {/* Features */}
      <section id="features" className="mx-auto w-full px-24 pb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Features</h2>
        <div className="grid gap-6 md:grid-cols-4">
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
            <Card key={f.title} className="rounded-3xl border-blue-100 bg-white shadow-sm transition-transform hover:scale-105">
              <CardContent className="p-8">
                <div className="rounded-full bg-blue-50 text-blue-700 p-4 w-fit mb-4">
                  {f.icon}
                </div>
                <p className="font-bold text-lg text-gray-900">{f.title}</p>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      ---

      {/* Testimonials */}
      <section className="mx-auto w-full px-24 pb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">What students say</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Aisha",
              quote: "GuideSutra helped me pick CS and shortlist scholarships.",
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
            <Card key={t.name} className="rounded-3xl border-gray-200 shadow-sm transition-transform hover:scale-105">
              <CardContent className="p-8 relative">
                <span className="absolute top-4 right-4 text-gray-200 text-6xl font-serif">"</span>
                <div className="flex items-center gap-3 mb-4 z-10">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={t.img} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed z-10">“{t.quote}”</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      ---

      {/* Roadmap preview */}
      <section className="mx-auto w-full px-24 pb-16">
        <Card className="rounded-3xl border-gray-200 shadow-md">
          <CardContent className="p-8 md:p-12 grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">See your career roadmap</h3>
              <p className="mt-2 text-gray-600">
                A visual plan from degree to internships and jobs—built from your strengths and interests.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/signup">
                  <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                    Take the Test
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" className="rounded-full border-gray-300 text-gray-700">
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <GraduationCap className="text-blue-600" /> B.Sc →{" "}
                <Briefcase className="text-emerald-600" /> AI Engineer →{" "}
                <Medal className="text-violet-600" /> Scholarships
              </div>
              <div className="mt-4 h-2 rounded-full bg-blue-100">
                <div className="h-2 w-1/2 rounded-full bg-blue-500" />
              </div>
              <p className="mt-2 text-xs text-gray-500">Progress: 50% completed</p>
            </div>
          </CardContent>
        </Card>
      </section>

      ---

      {/* Trust */}
      <section className="mx-auto w-full px-24 pb-16">
        <div className="rounded-3xl border border-gray-200 p-8 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-8 text-lg text-gray-500">
            <span className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-600 w-6 h-6" /> Trusted by 50,000+ students
            </span>
          </div>
        </div>
      </section>

      ---

      {/* Blog */}
      <section className="mx-auto w-full px-24 pb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Resources</h2>
        <div className="grid gap-6 md:grid-cols-3">
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
            <Card key={b.title} className="rounded-3xl overflow-hidden border-gray-200 shadow-sm transition-transform hover:scale-105">
              <img
                src={b.img}
                alt="thumb"
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-6">
                <p className="font-semibold text-lg leading-tight text-gray-900">{b.title}</p>
                <Button variant="link" className="px-0 mt-2 text-blue-600 hover:text-blue-700">
                  Read more <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      ---

      {/* FAQ */}
      <section className="mx-auto w-full px-24 pb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQs</h2>
        <Accordion type="single" collapsible className="w-full p-4 rounded-3xl border border-gray-200 bg-white">
          <AccordionItem value="q1">
            <AccordionTrigger className="text-lg font-medium text-gray-800 hover:no-underline">Is the test free?</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes, the first career test is free and takes about 10 minutes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger className="text-lg font-medium text-gray-800 hover:no-underline">Can I change my stream later?</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Absolutely. The roadmap adapts as your interests evolve.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger className="text-lg font-medium text-gray-800 hover:no-underline">
              Do you work with international colleges?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Currently, we are focused on institutions in Jammu & Kashmir. We plan to expand our coverage in the future.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      ---

      {/* Newsletter */}
      <section className="mx-auto w-full px-24 pb-16">
        <Card className="rounded-3xl bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-100 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="md:flex md:items-center md:justify-between md:gap-8">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-900">
                  Get the latest career insights
                </h3>
                <p className="mt-1 text-gray-600">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="rounded-full shadow-inner bg-white/70 border-gray-300 px-6"
                />
                <Button className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md">Subscribe</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      ---

      {/* Final CTA */}
      <section className="mx-auto w-full px-24 pb-16">
        <Card className="rounded-3xl text-center border-gray-200 shadow-md">
          <CardContent className="p-12">
            <h3 className="text-3xl font-bold text-gray-900">
              Don’t leave your future to chance. Start now!
            </h3>
            <p className="mt-3 text-lg text-gray-600">
              Take the first step towards a confident career choice.
            </p>
            <div className="mt-6">
              <Link to="/signup">
                <Button className="rounded-full px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xl transition-transform hover:scale-105">
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      ---

      {/* Footer */}
      <footer id="contact" className="mt-auto border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 grid gap-6 md:grid-cols-2">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} GuideSutra. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6 justify-start md:justify-end text-sm">
            <a href="#about" className="hover:underline text-gray-600">
              About
            </a>
            <a href="#privacy" className="hover:underline text-gray-600">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:underline text-gray-600">
              Contact
            </a>
            <span className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}