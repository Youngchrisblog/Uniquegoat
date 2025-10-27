import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, TrendingUp, Users, BookOpen } from "lucide-react";

interface JoinPopupProps {
  delay?: number;
  trigger?: "time" | "scroll" | "exit";
}

export function JoinPopup({ delay = 30000, trigger = "time" }: JoinPopupProps) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("join-popup-seen");
    if (hasSeenPopup) return;

    if (trigger === "time") {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("join-popup-seen", "true");
      }, delay);
      return () => clearTimeout(timer);
    }

    if (trigger === "scroll") {
      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 50 && !hasSeenPopup) {
          setShowPopup(true);
          sessionStorage.setItem("join-popup-seen", "true");
          window.removeEventListener("scroll", handleScroll);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }

    if (trigger === "exit") {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !hasSeenPopup) {
          setShowPopup(true);
          sessionStorage.setItem("join-popup-seen", "true");
        }
      };
      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, [delay, trigger]);

  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-join-popup">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            🎯 Don't Leave Empty-Handed!
          </DialogTitle>
          <DialogDescription className="text-base">
            Join 1,500+ traders who are already profiting with our proven strategies
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10">
              <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">76% Win Rate</p>
                <p className="text-xs text-muted-foreground">Average member performance</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/10">
              <Users className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Daily Live Calls</p>
                <p className="text-xs text-muted-foreground">Trade alongside our mentors</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10">
              <BookOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Complete Training Library</p>
                <p className="text-xs text-muted-foreground">15+ modules, 86 terms, tools & more</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              className="w-full bg-gradient-to-r from-primary to-secondary text-lg py-6"
              data-testid="button-popup-join"
              asChild
            >
              <a href="https://t.me/shtrading01" target="_blank" rel="noopener noreferrer">
                Message a Mentor Now
              </a>
            </Button>
            
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setShowPopup(false)}
              data-testid="button-popup-close"
            >
              I'll explore more first
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
