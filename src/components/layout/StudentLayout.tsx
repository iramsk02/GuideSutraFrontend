import type { ReactNode } from "react";
import {  useEffect, useMemo, useState } from "react";
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
} from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge"
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
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
import Chatbot from "../Chatbot";

type Profile = {
  name?: string;
  grade?: string;
  interests?: string[];
  role?: string;
};
const defaultInterests = ["AI", "Robotics", "Math", "Entrepreneurship"];

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/career-quiz", label: "Assessment", icon: Brain },
  { to: "/career-pathway", label: "Career Pathway", icon: GraduationCap },
  { to: "/colleges", label: "Colleges", icon: School },
  { to: "/timeline", label: "Timeline", icon: CalendarDays },
  { to: "/scholarships", label: "Scholarships", icon: BookOpen },
  { to: "/resources", label: "Resources", icon: BookOpen },
  { to: "/mentorship", label: "Mentorship", icon: UsersRound },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

export function StudentLayout({ children }: { children: ReactNode }) {
  const inRouter = useInRouterContext();
  const location = inRouter ? useLocation() : ({} as any);
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("novapath_profile");
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
  }, []);
  const interests = (
    profile?.interests && profile.interests.length
      ? profile.interests
      : defaultInterests
  ).slice(0, 4);
  const title = useMemo(() => {
    if (!inRouter) return "Dashboard";
    const found = nav.find((n) => n.to === location.pathname);
    return found?.label ?? "Dashboard";
  }, [inRouter, (location as any).pathname]);

  if (!inRouter) {
    return <div className="px-6 py-6">{children}</div>;
  }

  const path = (location as any)?.pathname || "";
  const [bypass, setbypass] = useState();
  useEffect(() => {
    setbypass(path);
  }, [path]);
  
  console.log(path, bypass);
  if (bypass == "/signup" || bypass == "/signin" || bypass == "/") {
    return (
      <>
        {children}
        {/* <Chatbot /> */}
      </>
    );
  }

  return (
    <div className="page-container bg-gray-50 antialiased">
      <SidebarProvider>
        <Sidebar className="border-r border-gray-200 w-64 shadow-lg bg-white" collapsible="icon">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 rounded-full ring-2 ring-blue-200 shadow-md">
                <AvatarImage src="/Profile.png" alt="Student" />
                <AvatarFallback className="bg-blue-600 text-white font-semibold text-lg">
                  {profile?.name?.split(' ').map(n => n[0]).join('') || 'GS'}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold truncate text-gray-900 text-lg">
                    {profile?.name || "Guest"}
                  </span>
                  {profile?.grade && (
                    <Badge variant="secondary" className="shrink-0 text-xs bg-gray-100 text-gray-700 font-medium">
                      {profile.grade}
                    </Badge>
                  )}
                  {profile?.role && (
                    <Badge variant="outline" className="shrink-0 capitalize text-xs bg-gray-100 text-gray-700 font-medium">
                      {profile.role}
                    </Badge>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {interests.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-gray-100 border-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-400 font-semibold px-2 py-1">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {nav.map(({ to, label, icon: Icon }) => {
                    const isAssessment = to === "/career-quiz";
                    return (
                      <SidebarMenuItem key={to}>
                        <NavLink to={to} className="block z-10">
                          {({ isActive }) => (
                            <SidebarMenuButton
                              isActive={isActive}
                              className={`
                                group relative transition-all duration-200 rounded-xl
                                ${isAssessment
                                  ? "bg-amber-50 text-amber-900 border border-amber-200 ring-2 ring-amber-100 shadow-sm hover:bg-amber-100"
                                  : isActive
                                    ? "bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100"
                                    : "text-gray-600 hover:bg-gray-100"
                                }
                              `}
                            >
                              <Icon
                                className={`
                                  transition-colors duration-200
                                  ${isAssessment
                                    ? "text-amber-600"
                                    : isActive
                                      ? "text-blue-600"
                                      : "text-gray-500 group-hover:text-gray-800"
                                  }
                                `}
                              />
                              <span className="font-medium">{label}</span>
                              {isAssessment && (
                                <span className="ml-auto inline-flex items-center rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-medium text-amber-900 animate-pulse">
                                  Start here
                                </span>
                              )}
                            </SidebarMenuButton>
                          )}
                        </NavLink>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter className="p-4">
            <Link to="/scholarships" className="block">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 transition-opacity duration-200 shadow-lg text-white font-semibold rounded-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Explore Scholarships
              </Button>
            </Link>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <div className="fixed ml-64 top-0 z-10 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="flex h-16 items-center gap-4 px-6">
              <Separator orientation="vertical" className="mr-2 h-8 bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-blue-600">
                  GuideSutra
                </span>
                <span className="text-gray-400">/</span>
                <span className="text-sm text-gray-800 font-medium">{title}</span>
              </div>
            </div>
          </div>
          <div className="page-content animate-fade-in mt-16 p-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Chatbot />
    </div>
  );
}

export default StudentLayout;