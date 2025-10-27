import { Link, useLocation } from "wouter";
import {
  Home,
  Eye,
  BookOpen,
  BookText,
  MessageSquare,
  Mail,
  FileText,
  PlayCircle,
  Calculator,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Watchlist", url: "/watchlist", icon: Eye },
  { title: "Modules", url: "/modules", icon: BookOpen },
  { title: "Video Library", url: "/videos", icon: PlayCircle },
  { title: "Glossary", url: "/glossary", icon: BookText },
  { title: "Tools", url: "/tools", icon: Calculator },
  { title: "Testimonials", url: "/testimonials", icon: MessageSquare },
  { title: "FAQ", url: "/faq", icon: HelpCircle },
  { title: "Contact", url: "/contact", icon: Mail },
  { title: "Disclaimer", url: "/terms", icon: FileText },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary">
            <span className="text-white font-black text-xl">OTU</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              OPTIONS TRADING
            </span>
            <span className="text-sm text-muted-foreground font-semibold">UNIVERSITY</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url} data-testid={`link-${item.title.toLowerCase()}`}>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
