import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function TikTokDetector() {
  const [showTikTokModal, setShowTikTokModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    const isTikTok = userAgent.includes("TikTok") || userAgent.includes("musical_ly");
    
    if (isTikTok) {
      setTimeout(() => setShowTikTokModal(true), 13000);
    }
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Paste this link in your browser to continue",
    });
  };

  const telegramLink = "https://t.me/shtrading01";

  const copyTelegramLink = () => {
    navigator.clipboard.writeText(telegramLink);
    toast({
      title: "Telegram Link Copied!",
      description: "Open Telegram and paste this link",
    });
  };

  return (
    <Dialog open={showTikTokModal} onOpenChange={setShowTikTokModal}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-tiktok">
        <DialogHeader>
          <DialogTitle>Open in Your Browser</DialogTitle>
          <DialogDescription>
            For the best experience and to join our Telegram community, please open this site in your browser
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="bg-muted">
            <CardContent className="pt-6 space-y-3">
              <p className="text-sm font-medium">Option 1: Copy & Open in Browser</p>
              <Button
                className="w-full"
                onClick={copyLink}
                data-testid="button-copy-link"
              >
                <Copy className="mr-2 w-4 h-4" />
                Copy Website Link
              </Button>
              <p className="text-xs text-muted-foreground">
                Tap the ⋯ menu → Open in Browser
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary/10">
            <CardContent className="pt-6 space-y-3">
              <p className="text-sm font-medium">Option 2: Join Telegram Directly</p>
              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary"
                onClick={copyTelegramLink}
                data-testid="button-copy-telegram"
              >
                <Copy className="mr-2 w-4 h-4" />
                Copy Telegram Link
              </Button>
              <p className="text-xs text-muted-foreground">
                Open Telegram app and paste the link to message our mentor
              </p>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowTikTokModal(false)}
            data-testid="button-close-tiktok-modal"
          >
            I'll Browse Here First
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
