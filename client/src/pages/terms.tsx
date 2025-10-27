import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ShieldCheck, BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Terms() {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShieldCheck className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Important Disclaimer
          </h1>
          <p className="text-xl text-muted-foreground">
            Please read this information carefully before participating
          </p>
        </div>

        {/* Disclaimer Sections */}
        <Accordion type="single" collapsible className="space-y-3">
          <AccordionItem value="risk" className="border-card-border">
            <Card className="border-card-border">
              <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="button-toggle-risk">
                <div className="flex items-center gap-3 text-left">
                  <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
                  <CardTitle className="text-xl">Risk Warning</CardTitle>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <p className="text-muted-foreground leading-relaxed">
                  Options trading involves substantial risk and is not suitable for every investor. 
                  Losses can exceed initial investments. You should carefully consider whether trading 
                  is appropriate for you in light of your experience, objectives, financial resources, 
                  and other relevant circumstances. Please trade responsibly and understand all associated 
                  risks before participating in any trading activity.
                </p>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="guarantees" className="border-card-border">
            <Card className="border-card-border">
              <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="button-toggle-guarantees">
                <div className="flex items-center gap-3 text-left">
                  <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                  <CardTitle className="text-xl">No Guarantees</CardTitle>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Past performance does not guarantee future results. All content shared through Options 
                  Trading University (OTU) or its affiliates is strictly for informational and educational 
                  purposes only.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Results shown in testimonials are individual experiences and may not be typical. Your 
                  results may vary significantly based on your skill, experience, capital, risk tolerance, 
                  and market conditions.
                </p>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="educational" className="border-card-border">
            <Card className="border-card-border">
              <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="button-toggle-educational">
                <div className="flex items-center gap-3 text-left">
                  <BookOpen className="w-6 h-6 text-primary shrink-0" />
                  <CardTitle className="text-xl">Educational Purpose</CardTitle>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The purpose of Options Trading University is to educate and inspire traders through 
                  training modules, market analysis, and community support. Nothing provided by OTU 
                  constitutes personalized investment advice.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Each participant is solely responsible for their own financial decisions. We strongly 
                  recommend consulting with a qualified financial advisor before making any investment 
                  decisions. You should conduct your own research and due diligence before entering any trade.
                </p>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="liability" className="border-card-border">
            <Card className="border-card-border">
              <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="button-toggle-liability">
                <div className="flex items-center gap-3 text-left">
                  <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
                  <CardTitle className="text-xl">Limitation of Liability</CardTitle>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Options Trading University, its affiliates, and mentors are not liable for any losses 
                  or damages arising from your use of our services, educational content, or trade ideas.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By using our services, you acknowledge that trading carries inherent risks and that 
                  you accept full responsibility for your trading decisions and their outcomes.
                </p>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="registration" className="border-card-border">
            <Card className="border-card-border">
              <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="button-toggle-registration">
                <div className="flex items-center gap-3 text-left">
                  <BookOpen className="w-6 h-6 text-primary shrink-0" />
                  <CardTitle className="text-xl">Not a Registered Investment Advisor</CardTitle>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <p className="text-muted-foreground leading-relaxed">
                  Options Trading University is not a registered investment advisor, broker-dealer, or 
                  financial planner. We provide educational content and community support for traders. 
                  All information is provided for educational purposes only and should not be considered 
                  as financial advice or a recommendation to buy or sell any security.
                </p>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>

        {/* Footer Note */}
        <Card className="border-card-border bg-muted/30">
          <CardContent className="py-6">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              By accessing and using Options Trading University's services, you acknowledge that you have 
              read, understood, and agreed to this disclaimer. If you do not agree with these terms, please 
              do not use our services.
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Last updated: October 2025
        </p>
      </div>
    </div>
  );
}
