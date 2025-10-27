import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, Award, Target, CheckCircle2 } from "lucide-react";
import { TestimonialsSlideshow } from "@/components/testimonials-slideshow";
import { LiveTradingFeed } from "@/components/live-trading-feed";
import { TelegramContactModal } from "@/components/telegram-contact-modal";
import type { Stats, Testimonial } from "@shared/schema";

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, ref };
}

function StatCard({ value, label, icon: Icon, prefix = "", suffix = "", testId }: {
  value: number;
  label: string;
  icon: any;
  prefix?: string;
  suffix?: string;
  testId: string;
}) {
  const { count, ref } = useCountUp(value);

  return (
    <Card ref={ref} className="relative overflow-hidden hover-elevate border-card-border bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm" data-testid={testId}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Icon className="w-8 h-8 text-primary" />
          <Badge variant="secondary" className="font-bold" data-testid={`${testId}-badge`}>LIVE</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black text-foreground mb-1 animate-count-up" data-testid={`${testId}-value`}>
          {prefix}{count.toLocaleString()}{suffix}
        </div>
        <p className="text-sm text-muted-foreground font-medium" data-testid={`${testId}-label`}>{label}</p>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [showTelegramModal, setShowTelegramModal] = useState(false);

  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTelegramModal(true);
  };

  const telegramUsername = "@shtrading01";
  const telegramUrl = "https://t.me/shtrading01";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient-shift bg-[length:400%_400%]" />
        
        <div className="relative max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <Badge variant="outline" className="text-sm font-semibold px-4 py-1.5 border-primary/50" data-testid="badge-member-count">
            ⚡ Join 1,500+ Successful Traders
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              Master Options Trading
            </span>
            <br />
            <span className="text-foreground">with Expert Mentorship</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stop chasing hype. Learn proven strategies, master technical analysis, and grow with a community of traders who win together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <div className="flex flex-col gap-2">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                data-testid="button-become-member"
                onClick={handleContactClick}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2"
              data-testid="link-success-stories"
              asChild
            >
              <Link href="/testimonials">
                Success Stories
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Live Trading Feed */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <LiveTradingFeed />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              value={stats?.tradesCalled || 2489}
              label="Trades Called in Our Community"
              icon={TrendingUp}
              suffix="+"
              testId="stat-trades-called"
            />
            <StatCard
              value={stats?.avgProfit || 789}
              label="Avg Profit Per Win"
              icon={Award}
              prefix="$"
              testId="stat-avg-profit"
            />
            <StatCard
              value={stats?.winRate || 76}
              label="Community Win Rate (30 Days)"
              icon={Target}
              suffix="%"
              testId="stat-win-rate"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Slideshow */}
      <section className="py-12 px-6 bg-muted/20">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-black mb-2">What Our Members Say</h2>
            <p className="text-lg text-muted-foreground">Real results from real traders</p>
          </div>
          <TestimonialsSlideshow />
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-12">
          <Card className="border-card-border hover-elevate" data-testid="card-value-prop-experience">
            <CardHeader>
              <CardTitle className="text-2xl">Tired of Chasing Stocks? Experience Matters.</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              Like most beginners, it's easy to chase stocks hyped on social media. That's not a sustainable path to growth. With over 11 years of combined experience, our mentors provide a proven track record of success. All of our services include detailed trading plans for Swings and Day Trades, so you know exactly when to enter and when to secure profits.
            </CardContent>
          </Card>

          <Card className="border-card-border hover-elevate" data-testid="card-value-prop-technical">
            <CardHeader>
              <CardTitle className="text-2xl">Technical Analysis is Your Edge</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              You will get access to past training videos and future educational content on technical trading. Topics include support/resistances, Elliott Wave Theory, and Oscillators. Our goal is to equip you with a system and an edge in your trading so you can outperform most indices.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Membership Features */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border-card-border bg-gradient-to-br from-card to-accent/10" data-testid="card-membership-features">
            <CardHeader>
              <CardTitle className="text-3xl">Elite Options Short Term Options Trading</CardTitle>
              <CardDescription className="text-base">
                Great for new and advanced traders looking for insight, support, and quick day trades.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Access to our Private Day Trade Room (Telegram) where we post day trades, entries, profit targets, and stop losses (3-9 Trades Per Week)",
                "A Premarket Hitlist each morning",
                "Private VIP Support (Telegram) where you can chat directly with a mentor during normal business hours",
                "Live tutorials, trainings, and a library of recorded technical video series",
                "Live Streaming + Day Trading Premarket Preps",
                "Option Puts/Calls Ideas, Daily Educational Videos & MORE"
              ].map((feature, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-relaxed">{feature}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <Card className="border-card-border hover-elevate" data-testid="card-community">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-8 h-8 text-primary" />
                <CardTitle className="text-2xl">A Supportive Community of Over 1,500 Members</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              Depending on your plan, you'll gain access to an online chat board with over 1,500 members to learn from and share trade ideas. You also get direct access to our mentors during trading hours for Q&A and can instantly watch pre-recorded technical training videos.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-black">Ready to Transform Your Trading?</h2>
          <p className="text-xl text-muted-foreground">
            Join our community of successful traders and start your journey today.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            data-testid="button-join-community"
            onClick={handleContactClick}
          >
            Message a Mentor on Telegram
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Telegram Contact Modal */}
      <TelegramContactModal
        open={showTelegramModal}
        onOpenChange={setShowTelegramModal}
        telegramUsername={telegramUsername}
        telegramUrl={telegramUrl}
      />
    </div>
  );
}
