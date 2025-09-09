import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Link,
  NavLink,
  useLocation,
  useInRouterContext,
} from "react-router-dom";
import {
  Bell,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  School,
  Sparkles,
  UsersRound,
  HeartHandshake,
  Brain,
  CalendarDays,
} from "lucide-react";
import Chatbot from "@/components/Chatbot";

type Profile = { name?: string; grade?: string; interests?: string[]; role?: string };
const defaultInterests = ["AI", "Robotics", "Math", "Entrepreneurship"];

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/career-pathway", label: "Career Pathway", icon: GraduationCap },
  { to: "/colleges", label: "Colleges", icon: School },
  { to: "/timeline", label: "Timeline", icon: CalendarDays },
  { to: "/recommendations", label: "Recommendations", icon: Sparkles },
  { to: "/scholarships", label: "Scholarships", icon: BookOpen },
  { to: "/mentorship", label: "Mentorship", icon: UsersRound },
  { to: "/parents", label: "Parents", icon: HeartHandshake },
  { to: "/career-quiz", label: "Assessment", icon: Brain },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

export function StudentLayout({ children }: { children: ReactNode }) {
  const inRouter = useInRouterContext();
  const location = inRouter ? useLocation() : ({} as any);
  const title = useMemo(() => {
    if (!inRouter) return "Dashboard";
    const found = nav.find((n) => n.to === location.pathname);
    return found?.label ?? "Dashboard";
  }, [inRouter, (location as any).pathname]);

  if (!inRouter) {
    return <div className="px-6 py-6">{children}</div>;
  }

  const path = (location as any)?.pathname || "";
  const bypass =
    path.startsWith("/landing") ||
    path.startsWith("/signup") ||
    path.startsWith("/signin");
  if (bypass) {
    return (
      <>
        {children}
        <Chatbot />
      </>
    );
  }

  return (
    <>
      <SidebarProvider>
        <Sidebar className="border-r border-sidebar-border " collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-3 p-2">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                <AvatarImage src="/placeholder.svg" alt="Student" />
                <AvatarFallback>IS</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate">Iram Saba Khan</span>
                  <Badge variant="secondary" className="shrink-0">
                    Grade 12
                  </Badge>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {interests.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-accent/40 border-transparent text-foreground/80"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-wide text-muted-foreground/80">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {nav.map(({ to, label, icon: Icon }) => (
                    <SidebarMenuItem key={to}>
                      <NavLink to={to} className="block">
                        {({ isActive }) => (
                          <SidebarMenuButton isActive={isActive}>
                            <Icon className="text-muted-foreground" />
                            <span>{label}</span>
                          </SidebarMenuButton>
                        )}
                      </NavLink>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter>
            <div className="p-2">
              <Link to="/scholarships">
                <Button className="w-full" variant="default">
                  <Sparkles className="mr-2" /> Explore Scholarships
                </Button>
              </Link>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <div className="fixed  top-0 z-10 w-screen bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="flex h-14 items-center gap-3 px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-6" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-primary">
                  NovaPath
                </span>
                <span className="text-muted-foreground">/</span>
                <span className="text-sm text-foreground/80">{title}</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-6 lg:px-8">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <Chatbot />
    </>
  );
}

export default StudentLayout;
