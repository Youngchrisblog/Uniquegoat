import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Send } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TelegramContactModal } from "@/components/telegram-contact-modal";

export default function Contact() {
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  
  const telegramUsername = "@shtrading01";
  const telegramUrl = "https://t.me/shtrading01";

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground">
            Reach out to us directly. We typically respond within 24 hours.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-card-border hover-elevate">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-6 h-6 text-primary" />
                <CardTitle>Email Us</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Send us an email and our support team will get back to you within 24 hours.
              </p>
              <a
                href="mailto:eddyward863@gmail.com"
                className="text-primary font-semibold hover:underline inline-flex items-center gap-2"
                data-testid="link-email"
              >
                eddyward863@gmail.com
                <Send className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>

          <Card className="border-card-border hover-elevate">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-6 h-6 text-primary" />
                <CardTitle>Message a Mentor</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Get instant access to our mentors via Telegram for personalized guidance.
              </p>
              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                data-testid="button-telegram"
                onClick={() => setShowTelegramModal(true)}
              >
                Open Telegram
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-center">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="email" className="border-card-border">
              <Card className="border-card-border">
                <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="button-toggle-email">
                  <CardTitle className="text-base text-left">
                    📧 What's your official email?
                  </CardTitle>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    You can reach us at <strong>eddyward863@gmail.com</strong>. 
                    Our support team replies within 24 hours to all inquiries.
                  </p>
                </AccordionContent>
              </Card>
            </AccordionItem>

            <AccordionItem value="tiktok" className="border-card-border">
              <Card className="border-card-border">
                <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="button-toggle-tiktok">
                  <CardTitle className="text-base text-left">
                    📱 Can I message on TikTok?
                  </CardTitle>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Yes! Message us on TikTok at <strong>@thewealthking0</strong>. 
                    A mentor will reply to guide you through your next step.
                  </p>
                </AccordionContent>
              </Card>
            </AccordionItem>

            <AccordionItem value="community" className="border-card-border">
              <Card className="border-card-border">
                <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="button-toggle-community">
                  <CardTitle className="text-base text-left">
                    💬 How do I join the community?
                  </CardTitle>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Once onboarded, you'll be added to our private Telegram group for live updates, 
                    discussions, and direct support from mentors and fellow traders.
                  </p>
                </AccordionContent>
              </Card>
            </AccordionItem>

            <AccordionItem value="response" className="border-card-border">
              <Card className="border-card-border">
                <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="button-toggle-response">
                  <CardTitle className="text-base text-left">
                    ⏱️ How quickly will I get a response?
                  </CardTitle>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We aim to respond to all inquiries within 24 hours. For urgent matters, 
                    contacting us via Telegram typically gets the fastest response.
                  </p>
                </AccordionContent>
              </Card>
            </AccordionItem>
          </Accordion>
        </div>

        {/* CTA */}
        <Card className="border-card-border bg-gradient-to-br from-primary/10 to-secondary/10 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Join our community of 1,500+ traders and transform your trading journey today.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              data-testid="button-join-community"
              onClick={() => setShowTelegramModal(true)}
            >
              Message a Mentor
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <TelegramContactModal
        open={showTelegramModal}
        onOpenChange={setShowTelegramModal}
        telegramUsername={telegramUsername}
        telegramUrl={telegramUrl}
      />
    </div>
  );
}
