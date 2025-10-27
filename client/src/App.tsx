import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { TikTokDetector } from "@/components/tiktok-detector";
import { JoinPopup } from "@/components/join-popup";
import { FloatingJoinButton } from "@/components/floating-join-button";
import { LiveNotifications } from "@/components/live-notifications";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { TelegramContactModal } from "@/components/telegram-contact-modal";

import Home from "@/pages/home";
import Testimonials from "@/pages/testimonials";
import Modules from "@/pages/modules";
import Watchlist from "@/pages/watchlist";
import Glossary from "@/pages/glossary";
import Contact from "@/pages/contact";
import Terms from "@/pages/terms";
import Videos from "@/pages/videos";
import Tools from "@/pages/tools";
import FAQ from "@/pages/faq";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/modules" component={Modules} />
      <Route path="/watchlist" component={Watchlist} />
      <Route path="/glossary" component={Glossary} />
      <Route path="/videos" component={Videos} />
      <Route path="/tools" component={Tools} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Terms} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const handleMessageMentorClick = () => {
    setShowTelegramModal(true);
  };

  const telegramUsername = "@shtrading01";
  const telegramUrl = "https://t.me/shtrading01";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <header className="flex items-center justify-between px-4 py-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
                  <SidebarTrigger data-testid="button-sidebar-toggle" className="hover-elevate active-elevate-2 h-11 w-11 text-lg" />
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button
                      variant="default"
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity hidden sm:flex"
                      data-testid="button-message-mentor"
                      onClick={handleMessageMentorClick}
                    >
                      Message a Mentor
                    </Button>
                  </div>
                </header>
                <main className="flex-1 overflow-y-auto bg-background">
                  <Router />
                </main>
                <footer className="py-4 px-6 border-t border-border bg-sidebar text-sidebar-foreground text-center text-sm">
                  <p>© 2025 Elite Options University. All rights reserved.</p>
                </footer>
              </div>
            </div>
            <TikTokDetector />
            <JoinPopup delay={30000} trigger="time" />
            <FloatingJoinButton />
            <LiveNotifications />
            <ExitIntentPopup />
            <TelegramContactModal
              open={showTelegramModal}
              onOpenChange={setShowTelegramModal}
              telegramUsername={telegramUsername}
              telegramUrl={telegramUrl}
            />
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
