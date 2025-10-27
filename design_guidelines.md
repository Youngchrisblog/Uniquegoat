# Options Trading University - Compact Design Guidelines

## Design Principles
Modern fintech (Robinhood, TradingView) + premium education (Masterclass) aesthetic. Professional credibility with approachable warmth, data-driven trust signals, community-focused social proof.

---

## Typography (Poppins - Google Fonts)

**Hierarchy**:
- Hero: 48px/32px (mobile), weight 900, line-height 1.1
- Section Heads: 36px/28px (mobile), weight 700
- Card Titles: 24px, weight 700
- Body Large: 18px, weight 400, line-height 1.6
- Body: 16px, weight 400, line-height 1.7
- Captions: 14px, weight 500

**Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 900 (black)

---

## Layout & Spacing

**Containers**:
- Full sections: max-width 1280px
- Text content: max-width 900px
- Cards/Components: max-width 1200px

**Spacing** (Tailwind scale):
- Component padding: p-6/p-8 (mobile), p-12/p-16 (desktop)
- Section spacing: py-16 (mobile), py-24/py-32 (desktop)
- Element gaps: gap-4 to gap-8
- Mobile horizontal: 20px padding

**Grids**:
- Stats: 3 cols (desktop) / 1 col (mobile), gap-6
- Features: 2 cols (desktop) / 1 col (mobile)
- Testimonials: Carousel (mobile) / 2-3 visible (desktop)

---

## Color System Structure

**Define**:
- Primary Action: Bold blue (trust)
- Secondary Accent: Vibrant pink/coral (energy, CTAs)
- Success: Green (profits, positive metrics)
- Neutral Base: Deep navy/black (sidebar, footer)
- Background: Light blue or off-white
- Text: High contrast dark

**Accessibility**: WCAG AA - 4.5:1 body text, 3:1 large text

---

## Components

### Navigation
**Desktop Sidebar** (240px, fixed):
- Glassmorphism background (backdrop-blur)
- Gradient brand text at top
- Active state: background highlight + left border accent
- Smooth slide-in animation (mobile)

**Mobile Top Bar** (sticky):
- Hamburger (left), brand (center), CTA (right)
- Backdrop blur on scroll

### Hero Section
**Layout**: Full-width gradient background, centered content
- Headline: gradient text (blue→pink), max-width 650px
- Two CTAs: Primary (solid gradient) + Secondary (outlined)
- Image options: Background with overlay OR split 60/40 (desktop)
- Optional glassmorphism content card

### Statistics Cards
3 equal cards, horizontal (stack mobile):
- Gradient backgrounds (varied: blue→pink, purple→blue)
- Large number with counting animation on scroll
- Icon above, label below
- border-radius 12px, subtle shadow

### Content Cards
**Standard**:
- White bg, 12px border-radius, 24px padding
- Subtle shadow, hover lift (translateY -4px)

**Glassmorphism** (premium):
- Semi-transparent white (opacity 0.7-0.9)
- Backdrop blur 8-16px, 1px subtle border, 32px padding

### Testimonials Section
**Container**: Animated multi-color gradient background (purple, blue, pink, orange - 20s loop)
**Cards**: White, rounded, inside gradient container
- 60px circular avatar (left)
- Name, title, date, star rating
- Italic testimonial text
- Optional profit screenshot (8px border-radius, subtle shadow)
- Animated border glow (subtle pulse, 4s loop)
- Carousel with smooth transitions

### Membership/Pricing Cards
- Plan name, price, feature list (generous 12-16px spacing)
- Blue checkmarks (left-aligned)
- Prominent CTA button at bottom
- Optional "Most Popular" badge

### Footer
Dark background (#0b1328), light text:
- Multi-column (desktop): links, contact, social
- Stack on mobile
- Copyright/legal links
- Optional newsletter signup

---

## Visual Elements

### Glassmorphism
Apply to: Navigation, floating CTAs, modals, premium highlights
- Opacity 0.7-0.9, backdrop-blur 8-16px, 1px light border, soft shadows

### Gradients
**Directions**: 90deg (L→R), 135deg (diagonal), 180deg (T→B)
**Usage**:
- Hero background (subtle)
- Stats cards (vibrant)
- Brand text/logos (blue→pink)
- CTA buttons (directional)
- Testimonials section (multi-color animated)

### Animations (Subtle, Purposeful)
- **Stats Counter**: 0→target on scroll into view
- **Button Hover**: scale(1.05), shadow increase
- **Card Hover**: translateY(-4px), shadow expansion
- **Gradient Shift**: 20s loop (testimonials bg)
- **Border Glow**: 4s pulse (featured testimonials)
- **Scroll Fade-in**: Cards fade + slight upward motion
- **Smooth Scrolling**: Anchor links, respect prefers-reduced-motion

---

## Images

### Hero
Professional trading desk/success imagery:
- Full-width background with gradient overlay OR 60/40 split (desktop)
- Darkening overlay for text readability

### Testimonial Profiles
60-80px circular crops, subtle shadow/border, left-aligned in cards

### Proof Screenshots
Trading platform profits within testimonial cards:
- 8px border-radius, subtle shadow, max-width constraint
- Blur sensitive details, show % gains

### Logo/Branding
40x40px square icon, rounded corners, top-left sidebar/mobile header

### Background Patterns (Optional)
Subtle geometric/chart motifs, 5-10% opacity, non-distracting

---

## Interactions

### Modals/Popups
- Centered (desktop), slide-up (mobile)
- White cards, rounded tops, close button (top-right)
- Gradient headlines, dark blur backdrop (50% opacity)

### Forms
- 6px border-radius, 12px vertical / 14px horizontal padding
- Light bg (off-white), brand color focus border
- Monospace for code/username inputs

### Mobile Sidebar Overlay
- 40% dark backdrop, click to close, 0.3s ease transitions

---

## Accessibility Checklist
- WCAG AA contrast ratios
- Clear hover/focus states on interactive elements
- 44x44px minimum touch targets (mobile)
- Alt text for images
- Semantic HTML (nav, main, section, article)
- Skip-to-content links
- Smooth scroll with prefers-reduced-motion support

---

## Homepage Structure (Narrative Flow)

1. **Hero** (aspiration): Large image, dual CTAs
2. **Stats** (proof): 3 animated metrics
3. **Value Props** (education): 4-6 content cards
4. **Testimonials** (social proof): Animated gradient section, carousel
5. **Membership** (action): Detailed benefits checklist
6. **Community Card** (trust)
7. **Final CTA / Charity Message**
8. **Footer**

**Flow Goal**: Aspiration → Proof → Education → Social Proof → Action → Trust

---

**Token Budget**: ~1,950 tokens | All critical information preserved for actionable frontend development.