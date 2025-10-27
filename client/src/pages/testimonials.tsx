import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TelegramContactModal } from "@/components/telegram-contact-modal";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const telegramUsername = "@shtrading01";
  const telegramUrl = "https://t.me/shtrading01";
  const { data: allTestimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const featuredTestimonials = allTestimonials?.slice(0, 10);

  useEffect(() => {
    carouselRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentIndex]);

  const handlePrevious = () => {
    if (featuredTestimonials) {
      setCurrentIndex((prev) => (prev === 0 ? featuredTestimonials.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (featuredTestimonials) {
      setCurrentIndex((prev) => (prev === featuredTestimonials.length - 1 ? 0 : prev + 1));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  const currentTestimonial = featuredTestimonials?.[currentIndex];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            What Our Members Say
          </h1>
          <p className="text-xl text-muted-foreground">
            Real results from real traders in our community
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        {currentTestimonial && (
          <div className="relative" ref={carouselRef}>
            <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-1 rounded-2xl animate-gradient-shift bg-[length:400%_400%]">
              <Card className="border-0 animate-glow-pulse">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary" data-testid={`avatar-testimonial-${currentIndex}`}>
                      {currentTestimonial.photo && (
                        <AvatarImage 
                          src={`/attached_assets/stock_images/${currentTestimonial.photo}`} 
                          alt={currentTestimonial.name}
                        />
                      )}
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold text-xl">
                        {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-2xl" data-testid={`text-name-${currentIndex}`}>{currentTestimonial.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1 font-bold text-lg" data-testid={`badge-profit-${currentIndex}`}>
                        {currentTestimonial.profit}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < currentTestimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`} 
                        />
                      ))}
                    </div>
                    {currentTestimonial.date && (
                      <p className="text-sm text-muted-foreground" data-testid={`text-date-${currentIndex}`}>
                        {new Date(currentTestimonial.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-muted-foreground italic leading-relaxed" data-testid={`text-testimonial-${currentIndex}`}>
                    "{currentTestimonial.testimonial}"
                  </p>
                  
                  {currentTestimonial.profitImage && (
                    <div className="rounded-lg overflow-hidden border border-border">
                      <img 
                        src={`/attached_assets/stock_images/${currentTestimonial.profitImage}`}
                        alt="Trading profits"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                className="hover-elevate active-elevate-2"
                data-testid="button-previous-testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 px-4">
                <span className="text-sm font-semibold">
                  {currentIndex + 1} / {featuredTestimonials?.length || 0}
                </span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="hover-elevate active-elevate-2"
                data-testid="button-next-testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Grid of All Testimonials */}
        <div className="pt-8 border-t border-border">
          <h2 className="text-3xl font-black mb-8 text-center">More Member Feedback</h2>
          <p className="text-center text-muted-foreground mb-8 text-lg">
            Join over 1,500+ traders who are consistently profitable
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTestimonials?.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`border-card-border hover-elevate cursor-pointer transition-all ${
                  index === currentIndex ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setCurrentIndex(index)}
                data-testid={`card-testimonial-${index}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="border border-primary/50" data-testid={`avatar-grid-${index}`}>
                      {testimonial.photo && (
                        <AvatarImage 
                          src={`/attached_assets/stock_images/${testimonial.photo}`} 
                          alt={testimonial.name}
                        />
                      )}
                      <AvatarFallback className="bg-gradient-to-br from-primary/80 to-secondary/80 text-white font-bold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm truncate" data-testid={`text-grid-name-${index}`}>{testimonial.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs font-bold mt-1" data-testid={`badge-grid-profit-${index}`}>
                        {testimonial.profit}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`} 
                        />
                      ))}
                    </div>
                    {testimonial.date && (
                      <p className="text-xs text-muted-foreground">
                        {new Date(testimonial.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-grid-testimonial-${index}`}>
                    "{testimonial.testimonial}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Card className="border-card-border bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Share Your Success Story?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Join our community and start your journey to profitable trading today.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                data-testid="button-join-now"
                onClick={() => setShowTelegramModal(true)}
              >
                Message a Mentor
              </Button>
            </CardContent>
          </Card>
        </div>
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
