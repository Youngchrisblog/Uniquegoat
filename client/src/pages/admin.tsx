import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Lock, 
  Unlock, 
  TrendingUp, 
  Users, 
  Video, 
  MessageSquare,
  Copy,
  RefreshCw,
  BarChart3,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Testimonial, VideoLesson, Stats } from "@shared/schema";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [generatedCaption, setGeneratedCaption] = useState("");
  const { toast } = useToast();

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
    enabled: isAuthenticated
  });

  const { data: videos } = useQuery<VideoLesson[]>({
    queryKey: ["/api/videos"],
    enabled: isAuthenticated
  });

  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
    enabled: isAuthenticated
  });

  const handleLogin = () => {
    if (password === "0123") {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password",
        variant: "destructive"
      });
    }
  };

  const generateTikTokCaption = () => {
    const hooks = [
      "I turned $500 into $12K in 3 months trading options...",
      "The moment I learned this strategy, my account grew 240%...",
      "Everyone told me options trading was too risky. Then I made $15K in a month...",
      "I was broke 6 months ago. Now I make more from options than my 9-5...",
      "This one trading pattern made me $8K last week...",
      "My wife didn't believe I could make money trading. Then I showed her this...",
      "Day 1 vs Day 90 of learning options trading 📈",
      "Nobody talks about THIS options strategy (made me $20K)...",
      "I quit my job after learning this simple options trick..."
    ];

    const bodies = [
      "Here's exactly what changed everything:\n\n✅ Learned proper risk management\n✅ Stopped chasing random stock tips\n✅ Followed a proven system daily\n✅ Got mentorship from 7-figure traders\n\nThe difference? I joined Options Trading University.",
      "The secret nobody tells you:\n\n→ It's not about finding the next Tesla\n→ It's about reading charts like a pro\n→ Understanding support/resistance\n→ Managing your position sizes\n\nOur community taught me all of this.",
      "What actually works:\n\n📊 Daily premarket analysis\n📈 Live trading room support  \n🎓 Step-by-step video courses\n💬 1,500+ traders helping each other\n\nThis isn't theory. This is real profit.",
      "Stop doing this:\n❌ Trading based on Twitter hype\n❌ Going all-in on one trade\n❌ No stop losses\n❌ Learning alone\n\nStart doing this:\n✅ Following proven setups\n✅ Proper risk management  \n✅ Learning from profitable traders\n✅ Trading with a system",
      "Real talk - I wasted $5K before finding the right education.\n\nNow I'm up $18K because I learned:\n• How to read options chains\n• When to take profits  \n• How to cut losses fast\n• Which patterns actually work\n\nBest investment I ever made."
    ];

    const ctas = [
      "Link in bio to join our community 👆",
      "DM me 'OPTIONS' to learn more 📲",
      "Comment 'READY' for the free training 👇",
      "Click the link in my bio to start learning 🔗",
      "Message me to join 1,500+ profitable traders 💬"
    ];

    const hashtagSets = [
      "#optionstrading #stockmarket #daytrading #trading #stocks #wallstreet #investor #money #passive income #sidehustle #financialfreedom #wealth",
      "#trader #forex #cryptocurrency #bitcoin #investing #millionaire #entrepreneur #success #motivation #business #hustle #rich",
      "#stocktrader #swingtrading #daytrader #technicalanalysis #stockstowatch #marketanalysis #tradingview #profit #gains #finance",
      "#optionsflow #callsoptions #putsoptions #tradinglife #tradingeducation #learntrading #tradingstrategy #marketwatch #nasdaq #sp500"
    ];

    const randomHook = hooks[Math.floor(Math.random() * hooks.length)];
    const randomBody = bodies[Math.floor(Math.random() * bodies.length)];
    const randomCta = ctas[Math.floor(Math.random() * ctas.length)];
    const randomHashtags = hashtagSets[Math.floor(Math.random() * hashtagSets.length)];

    const caption = `${randomHook}\n\n${randomBody}\n\n${randomCta}\n\n${randomHashtags}`;
    setGeneratedCaption(caption);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCaption);
    toast({
      title: "Copied!",
      description: "Caption copied to clipboard",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Lock className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                data-testid="input-admin-password"
              />
            </div>
            <Button 
              className="w-full" 
              onClick={handleLogin}
              data-testid="button-admin-login"
            >
              <Unlock className="w-4 h-4 mr-2" />
              Access Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <Button
            variant="outline"
            onClick={() => setIsAuthenticated(false)}
            data-testid="button-admin-logout"
          >
            <Lock className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid" data-testid="tabs-admin-menu">
            <TabsTrigger value="analytics" data-testid="tab-analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="tiktok" data-testid="tab-tiktok">
              <Video className="w-4 h-4 mr-2" />
              TikTok Generator
            </TabsTrigger>
            <TabsTrigger value="testimonials" data-testid="tab-testimonials">
              <MessageSquare className="w-4 h-4 mr-2" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="videos" data-testid="tab-videos">
              <Video className="w-4 h-4 mr-2" />
              Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" data-testid="text-total-members">{stats?.memberCount || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">Active traders</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" data-testid="text-success-rate">{stats?.successRate || 0}%</div>
                  <p className="text-xs text-muted-foreground mt-1">Win rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Profit</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" data-testid="text-avg-profit">${stats?.avgProfit || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">Per member</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" data-testid="text-total-testimonials">{testimonials?.length || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">Member reviews</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Videos Available</span>
                  <Badge variant="secondary" data-testid="badge-video-count">{videos?.length || 0} lessons</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Locked Premium Content</span>
                  <Badge variant="secondary" data-testid="badge-locked-count">
                    {videos?.filter(v => v.locked).length || 0} videos
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Testimonials with Images</span>
                  <Badge variant="secondary" data-testid="badge-photo-count">
                    {testimonials?.filter(t => t.photo).length || 0} photos
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Profit Screenshots</span>
                  <Badge variant="secondary" data-testid="badge-profit-screenshot-count">
                    {testimonials?.filter(t => t.profitImage).length || 0} images
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tiktok" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>TikTok Caption Generator</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Generate viral captions optimized for TikTok bio link traffic
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={generateTikTokCaption}
                  className="w-full"
                  data-testid="button-generate-caption"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate New Caption
                </Button>

                {generatedCaption && (
                  <div className="space-y-3">
                    <div className="relative">
                      <Textarea
                        value={generatedCaption}
                        readOnly
                        className="min-h-[300px] font-mono text-sm"
                        data-testid="textarea-caption"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2"
                        onClick={copyToClipboard}
                        data-testid="button-copy-caption"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Best Posting Times</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-1">
                          <p>• Morning: 6-9 AM EST</p>
                          <p>• Lunch: 12-2 PM EST</p>
                          <p>• Evening: 7-10 PM EST</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Engagement Tips</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-1">
                          <p>• Post 2-3 times daily</p>
                          <p>• Use trending sounds</p>
                          <p>• Reply to comments fast</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Testimonials Management</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {testimonials?.length || 0} total testimonials
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials?.map((testimonial, index) => (
                    <Card key={testimonial.id} className="border-card-border">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base" data-testid={`text-testimonial-name-${index}`}>
                            {testimonial.name}
                          </CardTitle>
                          <Badge variant="secondary" data-testid={`badge-testimonial-profit-${index}`}>
                            {testimonial.profit}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground" data-testid={`text-testimonial-content-${index}`}>
                          {testimonial.testimonial}
                        </p>
                        <div className="flex gap-2">
                          {testimonial.photo && (
                            <Badge variant="outline">
                              <Users className="w-3 h-3 mr-1" />
                              Has Photo
                            </Badge>
                          )}
                          {testimonial.profitImage && (
                            <Badge variant="outline">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Has Profit Screenshot
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Library Management</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {videos?.length || 0} total videos
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {videos?.map((video, index) => (
                    <Card key={video.id} className="border-card-border">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base" data-testid={`text-video-title-${index}`}>
                            {video.title}
                          </CardTitle>
                          {video.locked ? (
                            <Badge variant="destructive" data-testid={`badge-video-locked-${index}`}>
                              <Lock className="w-3 h-3 mr-1" />
                              Locked
                            </Badge>
                          ) : (
                            <Badge variant="default" data-testid={`badge-video-unlocked-${index}`}>
                              <Unlock className="w-3 h-3 mr-1" />
                              Free
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground" data-testid={`text-video-description-${index}`}>
                          {video.description}
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline">{video.category}</Badge>
                          <Badge variant="outline">{video.duration}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
