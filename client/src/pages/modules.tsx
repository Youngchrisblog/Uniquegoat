import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle2 } from "lucide-react";
import { TelegramContactModal } from "@/components/telegram-contact-modal";
import type { Module } from "@shared/schema";

export default function Modules() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  
  const telegramUsername = "@shtrading01";
  const telegramUrl = "https://t.me/shtrading01";
  const { data: modules, isLoading } = useQuery<Module[]>({
    queryKey: ["/api/modules"],
  });

  useEffect(() => {
    const saved = localStorage.getItem("completed-modules");
    if (saved) {
      setCompletedModules(new Set(JSON.parse(saved)));
    }
  }, []);

  const markAsCompleted = (moduleId: number) => {
    const updated = new Set(completedModules);
    updated.add(moduleId);
    setCompletedModules(updated);
    localStorage.setItem("completed-modules", JSON.stringify(Array.from(updated)));
  };

  const totalCount = modules?.length || 0;
  const validCompletedCount = modules ? Array.from(completedModules).filter(id => modules.some(m => m.id === id)).length : 0;
  const progressPercent = totalCount > 0 ? Math.min(100, Math.round((validCompletedCount / totalCount) * 100)) : 0;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (modules && currentIndex < modules.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading modules...</p>
        </div>
      </div>
    );
  }

  const currentModule = modules?.[currentIndex];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Training Modules
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive options trading education from beginner to advanced
          </p>
        </div>

        {/* Progress Tracker */}
        <Card className="border-card-border bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Learning Progress</span>
              <Badge variant="secondary" className="text-lg font-bold">
                {progressPercent}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {validCompletedCount} of {totalCount} modules completed
            </p>
          </CardContent>
        </Card>

        {/* Current Module */}
        {currentModule && (
          <div className="space-y-6">
            <Card className="border-card-border bg-gradient-to-br from-card to-accent/10">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2" data-testid={`text-module-title-${currentIndex}`}>{currentModule.title}</CardTitle>
                    <CardDescription className="text-base" data-testid="text-module-progress">
                      Module {currentIndex + 1} of {modules?.length || 0}
                    </CardDescription>
                  </div>
                  <div className="text-4xl font-black text-primary/20" data-testid={`text-module-number-${currentIndex}`}>
                    {String(currentIndex + 1).padStart(2, '0')}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line" data-testid={`text-module-content-${currentIndex}`}>
                    {currentModule.content}
                  </p>
                </div>
                
                {!completedModules.has(currentModule.id) && (
                  <Button 
                    onClick={() => markAsCompleted(currentModule.id)}
                    className="w-full bg-gradient-to-r from-primary to-secondary"
                    data-testid="button-mark-complete"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Mark as Completed
                  </Button>
                )}
                
                {completedModules.has(currentModule.id) && (
                  <div className="flex items-center justify-center gap-2 py-4 text-primary">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold">Module Completed!</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="hover-elevate active-elevate-2"
                data-testid="button-previous-module"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="text-sm font-semibold text-muted-foreground">
                Module {currentIndex + 1} / {modules?.length || 0}
              </div>

              <Button
                variant="outline"
                onClick={handleNext}
                disabled={!modules || currentIndex === modules.length - 1}
                className="hover-elevate active-elevate-2"
                data-testid="button-next-module"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Module List */}
        <div className="pt-8 border-t border-border">
          <h2 className="text-2xl font-black mb-6">All Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules?.map((module, index) => (
              <Card
                key={module.id}
                className={`border-card-border hover-elevate cursor-pointer transition-all ${
                  index === currentIndex ? 'ring-2 ring-primary bg-accent/20' : ''
                }`}
                onClick={() => setCurrentIndex(index)}
                data-testid={`card-module-${index}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm shrink-0">
                        {index + 1}
                      </div>
                      <CardTitle className="text-base leading-snug">{module.title}</CardTitle>
                    </div>
                    {completedModules.has(module.id) && (
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="border-card-border bg-gradient-to-br from-primary/10 to-secondary/10 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Get Personalized Guidance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Accelerate your learning with direct mentor support and access to our private community.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              data-testid="button-message-mentor"
              onClick={() => setShowTelegramModal(true)}
            >
              Message a Mentor
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
