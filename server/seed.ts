import { storage } from "./storage";

async function seed() {
  console.log("🌱 Seeding database...");

  // Seed testimonials
  const testimonialData = [
    {
      name: "Sarah Mitchell",
      testimonial: "Joining OTU was the best decision for my trading career. The mentorship and daily trade ideas have been invaluable. I've gone from losing money to consistently profitable trades.",
      profit: "+$12,450 Profit",
      photo: "confident_profession_fe0ae90e.jpg",
      profitImage: "stock_market_trading_51de70e1.jpg"
    },
    {
      name: "Marcus Chen",
      testimonial: "The technical analysis training completely changed how I approach the markets. I now understand chart patterns, support/resistance levels, and have the confidence to execute my own trades.",
      profit: "+$8,920 Profit",
      photo: "confident_profession_0cd5d1a1.jpg",
      profitImage: "stock_market_trading_6ebeb0f3.jpg"
    },
    {
      name: "Emily Rodriguez",
      testimonial: "What sets OTU apart is the community support. Having access to experienced mentors during trading hours and learning from 1,500+ members has accelerated my growth tremendously.",
      profit: "+$15,200 Profit",
      photo: "confident_profession_7ebb8479.jpg",
      profitImage: "stock_market_trading_eb8e29af.jpg"
    },
    {
      name: "David Thompson",
      testimonial: "I was skeptical at first, but the results speak for themselves. The premarket hitlist and live streams help me prepare for each trading day. This isn't get-rich-quick - it's real education that works.",
      profit: "+$9,340 Profit",
      photo: "confident_profession_3756bc2c.jpg",
      profitImage: "stock_market_trading_51de70e1.jpg"
    },
    {
      name: "Jessica Park",
      testimonial: "Started with zero options knowledge. After 3 months with OTU, I understand risk management, position sizing, and have a systematic approach. My win rate has improved from 40% to over 70%.",
      profit: "+$11,680 Profit",
      photo: "confident_profession_c8bc4fee.jpg",
      profitImage: "stock_market_trading_6ebeb0f3.jpg"
    },
    {
      name: "James Wilson",
      testimonial: "The day trade room is incredible. Clear entry points, profit targets, and stop losses on every trade. No more guessing. The mentors explain their reasoning which helps me learn continuously.",
      profit: "+$14,100 Profit",
      photo: "confident_profession_fe0ae90e.jpg",
      profitImage: "stock_market_trading_eb8e29af.jpg"
    },
  ];

  console.log("  Creating testimonials...");
  for (const testimonial of testimonialData) {
    await storage.createTestimonial(testimonial);
  }

  // Seed stocks
  const stockData = [
    { symbol: "AAPL", name: "Apple Inc.", price: 178.25, change: 2.45, changePercent: 1.39 },
    { symbol: "TSLA", name: "Tesla, Inc.", price: 242.84, change: -3.21, changePercent: -1.30 },
    { symbol: "NVDA", name: "NVIDIA Corporation", price: 495.22, change: 12.33, changePercent: 2.55 },
    { symbol: "SPY", name: "SPDR S&P 500 ETF Trust", price: 452.08, change: 1.25, changePercent: 0.28 },
  ];

  console.log("  Creating stocks...");
  for (const stock of stockData) {
    await storage.createStock(stock);
  }

  // Seed video lessons
  const videoData = [
    {
      title: "Options Trading Basics",
      description: "Learn the fundamentals of options trading including calls, puts, and basic strategies.",
      duration: "45 min",
      category: "Fundamentals",
      locked: false,
    },
    {
      title: "Technical Analysis 101",
      description: "Master chart reading, support and resistance, and candlestick patterns.",
      duration: "60 min",
      category: "Technical Analysis",
      locked: false,
    },
    {
      title: "Advanced Options Strategies",
      description: "Iron condors, spreads, straddles, and advanced multi-leg strategies.",
      duration: "90 min",
      category: "Advanced",
      locked: true,
    },
  ];

  console.log("  Creating video lessons...");
  for (const video of videoData) {
    await storage.createVideoLesson(video);
  }

  // Seed blog posts
  const blogData = [
    {
      title: "How I Turned $5,000 into $50,000 in 6 Months",
      excerpt: "My journey from complete beginner to profitable trader.",
      content: "This is the full story...",
      author: "Marcus Chen",
      date: "2025-01-15",
      category: "Success Stories",
      readTime: "8 min",
    },
  ];

  console.log("  Creating blog posts...");
  for (const post of blogData) {
    await storage.createBlogPost(post);
  }

  console.log("✅ Database seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});
