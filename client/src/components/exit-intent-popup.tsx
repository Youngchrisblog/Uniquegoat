import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, X } from "lucide-react";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(18000);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown && timeOnPage >= 30) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    const shown = sessionStorage.getItem('exitIntentShown');
    if (shown) {
      setHasShown(true);
    }

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown, timeOnPage]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg" data-testid="modal-exit-intent">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          data-testid="button-close-exit-popup"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <Badge variant="destructive" className="text-lg px-4 py-2 animate-pulse">
              <Clock className="w-4 h-4 mr-2" />
              LIMITED TIME OFFER
            </Badge>
          </div>
          <DialogTitle className="text-3xl text-center">
            Wait! Don't Miss Out
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Join now and get <span className="text-2xl font-black text-primary">50% OFF</span> your first month
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <p className="font-bold">What You Get:</p>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✅ Live day trading room with 3-9 trades per week</li>
              <li>✅ Daily premarket analysis and trade setups</li>
              <li>✅ Direct mentor access during market hours</li>
              <li>✅ Complete video training library</li>
              <li>✅ Community of 1,500+ profitable traders</li>
            </ul>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              This offer expires in <span className="font-bold text-primary text-lg">{formatTime(timeLeft)}</span>
            </p>
            <Button
              size="lg"
              className="w-full text-lg py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              asChild
              data-testid="button-claim-discount"
            >
              <a href="https://t.me/shtrading01" target="_blank" rel="noopener noreferrer">
                Claim 50% Discount Now
              </a>
            </Button>
            <p className="text-xs text-muted-foreground">
              No credit card required to start conversation
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
