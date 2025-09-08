import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Building2,
  Medal,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/60 to-white">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full border-b bg-white/80 backdrop-blur">
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
            <Link to="/colleges">
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
              <Link to="/career-pathway">
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
      <section id="features" className="mx-auto max-w-6xl px-4 pb-16">
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
