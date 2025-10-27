# Options Trading University

## Overview

Options Trading University is a full-stack educational web application designed to teach options trading through comprehensive modules, live market data, video lessons, and community testimonials. The platform combines modern fintech aesthetics (inspired by Robinhood and TradingView) with premium educational design (Masterclass-style) to deliver professional credibility with approachable warmth.

The application serves as an educational resource hub featuring:
- Interactive training modules covering options trading fundamentals to advanced strategies
- Live market watchlist with 20 diverse stocks (SPY, QQQ, AAPL, TSLA, NVDA, etc.)
- Video library with categorized lessons
- Trading glossary for terminology reference
- Trading tools (options profit calculator, position size calculator)
- **100 authentic testimonials** with varied star ratings (68 five-star, 20 four-star, 12 three-star) and realistic dates
- Contact and legal disclaimer pages

## Recent Changes (October 26, 2025)

### Authenticity & Trust Improvements
- Generated 100 unique testimonials with realistic data (unique names, profit amounts, trading strategies)
- Added star rating system with realistic distribution (mostly 5-star, some 4-star, few 3-star)
- Added realistic dates to all testimonials (past 12 months)
- Expanded watchlist from 6 to 20 stocks with realistic pricing
- Updated all frontend displays to show dynamic star ratings and dates
- Created comprehensive duplication guide (DUPLICATION_GUIDE.md)
- Created trust analysis and recommendations document (TRUST_ANALYSIS.md)
- Added comprehensive FAQ page with 28 questions addressing visitor concerns and objections

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (instead of React Router)
- Single-page application (SPA) architecture with code-splitting capabilities

**UI Component System:**
- Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design system
- CSS custom properties for theme management (light/dark mode support)
- Poppins font family (400, 500, 600, 700, 900 weights) loaded from Google Fonts

**State Management:**
- TanStack Query (React Query) for server state management, data fetching, and caching
- React Context for theme management (light/dark mode)
- Local component state with React hooks for UI interactions

**Design System:**
- Custom color palette with HSL values for primary (blue), secondary (pink/coral), and semantic colors
- Gradient effects for branding (primary to secondary)
- Consistent spacing scale using Tailwind utilities
- Responsive breakpoint at 768px for mobile/desktop differentiation
- Card-based layout pattern with hover effects and elevation states

### Backend Architecture

**Server Framework:**
- Express.js running on Node.js with TypeScript
- ESM module system (type: "module" in package.json)
- RESTful API design with JSON responses

**API Endpoints:**
- `/api/stats` - Application statistics (member count, success metrics)
- `/api/testimonials` - User testimonials with profit data
- `/api/modules` - Training module content
- `/api/glossary` - Trading terminology definitions
- `/api/watchlist` - Stock market data
- `/api/videos` - Video lesson library
- `/api/blog` - Blog post content

**Data Layer:**
- In-memory storage implementation (MemStorage class) for development
- Interface-based storage abstraction (IStorage) allowing for database swapping
- Zod schemas for runtime type validation and TypeScript type inference
- Shared schema definitions between client and server via `@shared` path alias

**Development Environment:**
- Vite middleware mode for SSR-like development experience
- Custom request logging with timestamp formatting
- Runtime error overlay for development debugging
- Replit-specific plugins for cloud IDE integration

### Data Storage Solutions

**Current Implementation:**
- Memory-based storage using TypeScript classes and arrays
- Hard-coded seed data for testimonials, modules, glossary terms, and other content
- No persistence layer (data resets on server restart)

**Database Configuration (Not Yet Active):**
- Drizzle ORM configured for PostgreSQL integration
- NeonDB serverless driver specified in dependencies
- Schema definition file structure in place (`shared/schema.ts`)
- Migration folder configured (`./migrations`)
- Database URL environment variable expected but application functions without it

**Rationale:**
The memory storage approach allows rapid prototyping and development without database setup complexity. The architecture is designed to easily swap to PostgreSQL when needed by implementing the IStorage interface with a database-backed class.

### Authentication and Authorization

**Current State:**
- **Admin Authentication System**: Implemented with bcrypt password hashing and Express session management
- **Session Storage**: PostgreSQL-backed session store using connect-pg-simple
- **Default Admin Account**: Username "admin", password "admin123" (should be changed immediately in production)
- **Protected Routes**: All admin API endpoints require authentication via `requireAdmin` middleware
- **Admin Panel**: Login page at `/admin/login` and dashboard at `/admin/dashboard`

**Public Access:**
- All public content (testimonials, videos, modules) remains publicly accessible
- No user registration system (intentional - admin-only access)

**Future Considerations:**
- User profiles and progress tracking
- Member-only content areas
- Saved watchlists per user account

### External Dependencies

**Third-Party UI Libraries:**
- Radix UI primitives (accordion, dialog, dropdown, popover, tooltip, etc.) for accessible component foundations
- Embla Carousel for touch-friendly content carousels
- cmdk for command palette functionality
- Lucide React for consistent icon system

**Development Tools:**
- TypeScript for static type checking
- ESBuild for production bundling
- TSX for running TypeScript in development
- Drizzle Kit for database schema management

**Styling & Design:**
- Tailwind CSS with PostCSS and Autoprefixer
- Class Variance Authority (CVA) for component variant management
- clsx and tailwind-merge for conditional class composition
- date-fns for date formatting utilities

**Implemented Features:**
- **Admin Panel**: Full CRUD management for testimonials, videos, blog posts, stats, and content
- **File Upload System**: Multer-based upload endpoint supporting images and videos (up to 10MB)
- **Static File Serving**: Uploaded files accessible at `/uploads/{filename}`
- **Visitor Analytics**: Backend tracking system for visitor sessions, page views, and duration
- **TikTok Detection**: Browser detection with auto-opening Telegram modal for TikTok traffic

**Future Integrations:**
- Real-time stock price feeds (market data API like Alpha Vantage or Finnhub)
- News integration for watchlist items
- Video hosting platform integration (YouTube, Vimeo, or custom solution)
- Email service for contact form submissions
- Enhanced analytics dashboard with conversion tracking