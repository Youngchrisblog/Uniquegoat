import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlayCircle, Clock, BookOpen, Filter, CheckCircle, Lock } from "lucide-react";
import type { VideoLesson } from "@shared/schema";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VideoPlayer } from "@/components/video-player";
import { useToast } from "@/hooks/use-toast";

const UNLOCK_PASSWORD = "0123";

export default function Videos() {
  const { data: videos, isLoading, error } = useQuery<VideoLesson[]>({
    queryKey: ["/api/videos"],
  });
  const { toast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set());
  const [unlockedVideos, setUnlockedVideos] = useState<Set<number>>(new Set());
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [pendingVideo, setPendingVideo] = useState<VideoLesson | null>(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedWatched = localStorage.getItem("watched-videos");
    if (savedWatched) {
      setWatchedVideos(new Set(JSON.parse(savedWatched)));
    }
    
    const savedUnlocked = localStorage.getItem("unlocked-videos");
    if (savedUnlocked) {
      setUnlockedVideos(new Set(JSON.parse(savedUnlocked)));
    }
  }, []);

  const markAsWatched = (videoId: number) => {
    const updated = new Set(watchedVideos);
    updated.add(videoId);
    setWatchedVideos(updated);
    localStorage.setItem("watched-videos", JSON.stringify(Array.from(updated)));
  };

  const handleVideoClick = (video: VideoLesson) => {
    if (video.locked && !unlockedVideos.has(video.id)) {
      setPendingVideo(video);
      setShowPasswordDialog(true);
      setPassword("");
    } else {
      setSelectedVideo(video);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === UNLOCK_PASSWORD && pendingVideo) {
      const updated = new Set(unlockedVideos);
      updated.add(pendingVideo.id);
      setUnlockedVideos(updated);
      localStorage.setItem("unlocked-videos", JSON.stringify(Array.from(updated)));
      setSelectedVideo(pendingVideo);
      setShowPasswordDialog(false);
      setPendingVideo(null);
      setPassword("");
      toast({
        title: "Video Unlocked!",
        description: "You now have access to this premium content.",
      });
    } else {
      toast({
        title: "Incorrect Password",
        description: "Please enter the correct password to unlock this content.",
        variant: "destructive",
      });
      setPassword("");
    }
  };

  const categories = ["All", "Beginner", "Intermediate", "Advanced", "All Levels"];

  const filteredVideos = selectedCategory === "All" 
    ? videos 
    : videos?.filter(v => v.category === selectedCategory);

  const totalCount = videos?.length || 0;
  const validWatchedCount = videos ? Array.from(watchedVideos).filter(id => videos.some(v => v.id === id)).length : 0;
  const progressPercent = totalCount > 0 ? Math.min(100, Math.round((validWatchedCount / totalCount) * 100)) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading video library...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Error Loading Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Unable to load video library. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <PlayCircle className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Video Library
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access our complete collection of trading education videos. Learn at your own pace from beginner fundamentals to advanced strategies.
          </p>
        </div>

        {/* Category Filter */}
        <Card className="border-card-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Filter by Level</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`button-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

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
              {validWatchedCount} of {totalCount} videos completed
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-card-border bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardHeader className="pb-2">
              <CardDescription>Total Videos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-primary">{videos?.length || 0}</div>
            </CardContent>
          </Card>
          <Card className="border-card-border bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardHeader className="pb-2">
              <CardDescription>Total Watch Time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-primary">12+ Hours</div>
            </CardContent>
          </Card>
          <Card className="border-card-border bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardHeader className="pb-2">
              <CardDescription>Skill Levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-primary">All Levels</div>
            </CardContent>
          </Card>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos?.map((video, index) => (
            <Card 
              key={video.id} 
              className="border-card-border hover-elevate transition-all group"
              data-testid={`card-video-${index}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge 
                    variant={video.category === "Beginner" ? "secondary" : video.category === "Advanced" ? "default" : "outline"}
                    data-testid={`badge-category-${index}`}
                  >
                    {video.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span data-testid={`text-duration-${index}`}>{video.duration}</span>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors" data-testid={`text-video-title-${index}`}>
                  {video.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-video-description-${index}`}>
                  {video.description}
                </p>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2" 
                    onClick={() => handleVideoClick(video)}
                    data-testid={`button-watch-${index}`}
                  >
                    {video.locked && !unlockedVideos.has(video.id) ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Premium Content
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4" />
                        Watch Video
                      </>
                    )}
                  </Button>
                  {watchedVideos.has(video.id) && (
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" data-testid={`icon-watched-${index}`} />
                  )}
                  {video.locked && !unlockedVideos.has(video.id) && (
                    <Lock className="w-4 h-4 text-muted-foreground shrink-0" data-testid={`icon-locked-${index}`} />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Member CTA */}
        <Card className="border-card-border bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-2xl">Become a Member for Full Access</CardTitle>
                <CardDescription className="text-base mt-1">
                  Unlock all video lessons, live trading sessions, and exclusive content
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              size="lg" 
              className="gap-2 bg-gradient-to-r from-primary to-secondary" 
              data-testid="button-join-telegram"
              asChild
            >
              <a href="https://t.me/shtrading01" target="_blank" rel="noopener noreferrer">
                Join Our Community
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-md" data-testid="dialog-password">
          <DialogHeader>
            <DialogTitle>Premium Content</DialogTitle>
            <DialogDescription>
              This video is premium content. Enter your password to unlock.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-password"
                autoFocus
              />
              <p className="text-xs text-muted-foreground mt-2">
                Members receive the password after joining the community
              </p>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" data-testid="button-unlock">
                Unlock Video
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowPasswordDialog(false);
                  setPassword("");
                }}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0" data-testid="dialog-video-player">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0">
            {selectedVideo && selectedVideo.youtubeId && (
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  data-testid="youtube-player"
                  onLoad={() => markAsWatched(selectedVideo.id)}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
