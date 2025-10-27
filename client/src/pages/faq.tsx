import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { TelegramContactModal } from "@/components/telegram-contact-modal";

export default function FAQ() {
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  
  const telegramUsername = "@shtrading01";
  const telegramUrl = "https://t.me/shtrading01";
  
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "Do I need experience to start learning options trading?",
          a: "No prior experience is required. Our training starts with the fundamentals and progressively teaches you advanced strategies. We have members who started with zero trading knowledge and are now consistently profitable."
        },
        {
          q: "How much money do I need to start trading options?",
          a: "You can start with as little as $500-$1,000. We teach position sizing strategies that work for any account size. Many of our successful members started with small accounts and grew them over time."
        },
        {
          q: "How long does it take to become profitable?",
          a: "Results vary significantly based on experience, dedication, and market conditions. Some members see their first profitable trades within weeks, while others take several months to develop consistency. Building a profitable trading skillset is a journey that requires patience, practice, and proper risk management."
        },
        {
          q: "What makes your training different from free YouTube content?",
          a: "Free content teaches concepts, but our program provides actionable trade setups, real-time alerts, personalized feedback, and accountability. You get direct access to experienced traders who review your trades and help you avoid costly mistakes."
        }
      ]
    },
    {
      category: "Training & Support",
      questions: [
        {
          q: "What's included in the training?",
          a: "You get access to comprehensive video lessons covering options fundamentals, technical analysis, trade setup identification, risk management, and advanced strategies. Plus live trade alerts, Discord community access, and direct mentor support."
        },
        {
          q: "How do trade alerts work?",
          a: "Our mentors send real-time trade alerts via Discord and Telegram when high-probability setups appear. Each alert includes entry price, target prices, stop loss, and position sizing guidance. You can execute the trades yourself or use them as learning examples."
        },
        {
          q: "Do you offer one-on-one mentoring?",
          a: "Yes! Premium members get direct access to mentors via Telegram for personalized guidance, trade reviews, and strategy questions. We review your trades and help you develop your edge."
        },
        {
          q: "How quickly do you respond to questions?",
          a: "Our mentors typically respond within 24 hours on weekdays, often much faster. During market hours, response times are usually under 2-3 hours. We understand timing matters in trading and prioritize helping our members."
        },
        {
          q: "Is there a community I can interact with?",
          a: "Absolutely! Our private Discord community has over 1,500 active traders sharing ideas, asking questions, and celebrating wins together. It's one of the most valuable aspects of membership."
        }
      ]
    },
    {
      category: "Pricing & Membership",
      questions: [
        {
          q: "How much does it cost to join?",
          a: "We offer different membership tiers to fit your needs and budget. Message us on Telegram for current pricing and available promotions. We keep prices affordable because we believe everyone deserves access to quality trading education."
        },
        {
          q: "Is there a money-back guarantee?",
          a: "Yes! We offer a 7-day satisfaction guarantee. If you're not happy with the training for any reason, contact us within 7 days for a full refund. We're confident in the value we provide."
        },
        {
          q: "Are there any hidden fees?",
          a: "No hidden fees whatsoever. Your membership fee covers everything: training videos, trade alerts, community access, and mentor support. The only additional cost is your trading capital, which you control."
        },
        {
          q: "Can I cancel my membership anytime?",
          a: "Yes, memberships are month-to-month with no long-term contracts. Cancel anytime with no penalties or hassles."
        }
      ]
    },
    {
      category: "Trading & Strategy",
      questions: [
        {
          q: "What trading strategies do you teach?",
          a: "We focus on high-probability strategies including directional options (calls/puts), credit spreads, debit spreads, iron condors, and earnings plays. You'll learn when to use each strategy based on market conditions."
        },
        {
          q: "What stocks/symbols do you trade?",
          a: "We primarily trade liquid options on popular stocks and ETFs like SPY, QQQ, AAPL, TSLA, NVDA, and others with high volume. We avoid illiquid options that are difficult to enter and exit."
        },
        {
          q: "What's your typical win rate on trade alerts?",
          a: "Recent trade alerts have shown win rates between 65-80% depending on market conditions and strategy type. Individual results vary significantly based on execution timing, account size, and how strictly you follow the trade plan. More importantly, we teach proper risk management so even with a lower win rate, your winning trades can outweigh losses."
        },
        {
          q: "Do you provide trade alerts for every market session?",
          a: "We provide trade alerts when we see high-probability setups, not on a fixed schedule. Some weeks have daily alerts, other weeks have fewer as we wait for quality opportunities. We focus on quality over quantity—better to skip mediocre setups than force trades."
        },
        {
          q: "Do I need special software or tools?",
          a: "Any major brokerage platform works (Robinhood, TD Ameritrade, E*TRADE, Webull, etc.). We teach platform-agnostic strategies. Free charting tools like TradingView are helpful but not required - we provide everything you need to analyze trades."
        }
      ]
    },
    {
      category: "Risk & Reality",
      questions: [
        {
          q: "Can I really make money trading options?",
          a: "Yes, but it requires education, discipline, and proper risk management. Our testimonials show real members making profits, though individual results vary widely. Trading involves substantial risk and past performance doesn't guarantee future results. Success depends more on how well you manage risk and follow a proven system than on luck."
        },
        {
          q: "Do you have proof of your trade results?",
          a: "Yes, we regularly share trade screenshots and profit/loss statements in our community Discord. Many testimonials include actual broker screenshots showing profits. We believe in transparency—you'll see both wins and losses as part of learning what works."
        },
        {
          q: "How risky is options trading?",
          a: "Options can be risky if traded recklessly, but we teach conservative strategies that limit your risk. You'll never risk more than you can afford to lose. Proper position sizing means even losing trades won't devastate your account."
        },
        {
          q: "What if I lose money on a trade?",
          a: "Losses are part of trading. We teach you to keep losses small and let winners run. Our risk management rules ensure no single trade can seriously damage your account. Many members have losing trades but are still profitable overall because they follow our system."
        },
        {
          q: "Is this a get-rich-quick scheme?",
          a: "Absolutely not. Options trading is a skill that takes time to develop. We teach sustainable, repeatable strategies for long-term success. Expect to put in work learning and practicing. Those who treat it seriously see the best results."
        }
      ]
    },
    {
      category: "Technical Questions",
      questions: [
        {
          q: "I'm not tech-savvy. Will I be able to follow along?",
          a: "Yes! Our training is designed for beginners. We walk you through everything step-by-step with video tutorials and screenshots. If you can watch YouTube and send messages, you can do this."
        },
        {
          q: "Do I need to trade during market hours?",
          a: "Options trade during regular market hours (9:30 AM - 4:00 PM ET), but you don't need to watch the market all day. Many members have full-time jobs and trade part-time. We teach setups you can identify in 15-30 minutes daily."
        },
        {
          q: "What if I have more questions?",
          a: "Message us on Telegram anytime! Our mentors are active and responsive. We're here to help you succeed."
        },
        {
          q: "Are you registered or regulated?",
          a: "We provide educational content and trade ideas, not financial advice or investment management services. We are not a registered investment advisor. Always consult with a licensed financial advisor before making investment decisions."
        },
        {
          q: "Can I see inside the members area before joining?",
          a: "We occasionally share preview screenshots in our public channels. Message us on Telegram and we can show you sample lessons, the Discord layout, and examples of trade alerts so you know exactly what you're getting."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Elite Options University. Can't find what you're looking for? Message us on Telegram.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {faqs.map((section, idx) => (
          <Card key={idx} className="border-card-border" data-testid={`card-faq-section-${idx}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{section.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {section.questions.map((faq, qIdx) => (
                  <AccordionItem 
                    key={qIdx} 
                    value={`${idx}-${qIdx}`}
                    className="border-border"
                    data-testid={`accordion-faq-${idx}-${qIdx}`}
                  >
                    <AccordionTrigger className="text-left hover:no-underline hover-elevate px-4 rounded-md">
                      <span className="font-semibold">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground px-4 pb-4 pt-2 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}

        {/* CTA */}
        <Card className="border-card-border bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Still Have Questions?</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Our mentors are here to help! Get personalized answers and see if our community is right for you.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary"
              onClick={() => setShowTelegramModal(true)}
              data-testid="button-message-mentor"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Message a Mentor on Telegram
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
