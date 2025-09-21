import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Separator } from "../components/ui/separator";
import {
  GraduationCap,
  LineChart,
  BookOpenCheck,
  HeartHandshake,
  LifeBuoy,
  Phone,
  Globe2,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Higher Education = Better Jobs",
    value: "2.1x",
    sub: "Increase in employment for graduates",
    icon: LineChart,
    color: "text-blue-600",
  },
  {
    title: "Salary Boost",
    value: "+48%",
    sub: "Median salary uplift with a degree",
    icon: GraduationCap,
    color: "text-emerald-600",
  },
  {
    title: "Career Flexibility",
    value: "3x",
    sub: "More roles open to graduates",
    icon: BookOpenCheck,
    color: "text-sky-600",
  },
];

const articles = [
  {
    title: "Why B.Com is Still Valuable in Govt Jobs",
    preview:
      "Commerce builds strong fundamentals for civil services, finance departments, and public sector roles. Learn how accounting, economics, and law translate into government careers...",
  },
  {
    title: "STEM vs. Arts: Choosing What Fits Your Child",
    preview:
      "Rather than chasing trends, look at strengths and interests. We compare learning styles, workloads, and career paths across STEM and Arts...",
  },
  {
    title: "Understanding College Fees and Scholarships",
    preview:
      "Fees vary by institute type. This guide breaks down tuition, living costs, and where to find reliable scholarships and aid...",
  },
];

const faqs = [
  {
    q: "Is Arts a safe option?",
    a: "Yes. Arts opens doors to journalism, design, law, public policy, UPSC, and more. Success depends on skills, projects, and internships, not just the stream name.",
  },
  {
    q: "Should my child take a gap year?",
    a: "A planned gap year for test prep, projects, or internships can be helpful. Ensure a clear plan and timeline to maintain momentum.",
  },
  {
    q: "How do I evaluate college quality?",
    a: "Check accreditation, faculty, curriculum, internship pipelines, alumni outcomes, and total cost. Speak to current students and alumni when possible.",
  },
];

const resources = [
  { label: "Parent Guide: How to Support Decisions", href: "#" },
  { label: "Scholarship Directory", href: "/scholarships" },
  { label: "Mentorship & Counseling", href: "/mentorship" },
];

export default function Parents() {
  return (
    <div className="ml-60 grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Main */}
      <div className="space-y-6 mt-20">
        {/* Hero */}
        <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-100">
          <CardContent className="py-8">
            <div className="flex flex-col gap-4 items-start justify-between md:flex-row md:items-center">
              <div>
                <h1 className="text-2xl font-semibold">
                  Guidance for Parents – Help Your Child Choose Smartly
                </h1>
                <p className="text-muted-foreground">
                  Simple, reliable information to support informed decisions
                  about higher education.
                </p>
              </div>
              <Link to="/mentorship">
                <Button className="gap-2">
                  <HeartHandshake className="h-4 w-4" /> Talk to a Counselor
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Infographic Section */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <Card key={s.title} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className={`rounded-md bg-white p-2 ${s.color}`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{s.title}</p>
                    <p className="text-2xl font-semibold">{s.value}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-foreground/80">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Articles */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Articles for Parents</CardTitle>
            <CardDescription>
              Short reads to understand streams, exams, and careers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {articles.map((a) => (
                <Card key={a.title} className="border-blue-100">
                  <CardContent className="pt-6">
                    <h3 className="font-medium leading-tight">{a.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {a.preview}
                    </p>
                    <Button variant="link" className="px-0 mt-2">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Clear answers to common concerns.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem value={`q${i}`} key={i}>
                  <AccordionTrigger className="text-left">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-4 lg:sticky lg:top-16 h-max">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <LifeBuoy className="h-5 w-5" /> Recommended Resources
            </CardTitle>
            <CardDescription>Trusted links for parents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {resources.map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between gap-2"
              >
                <p className="leading-tight">{r.label}</p>
                <Link to={r.href}>
                  <Button size="sm" variant="outline">
                    Open
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-700 flex items-center gap-2">
              <Phone className="h-5 w-5" /> Helpline
            </CardTitle>
            <CardDescription>Speak to a counselor</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>Mon–Fri, 9am–6pm IST</p>
            <p>Call: +91-800-555-0101</p>
            <Button asChild className="w-full">
              <a href="mailto:help@GuideSutra.example">Email Us</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
