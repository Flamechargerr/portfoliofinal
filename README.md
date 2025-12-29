# Anamay Tripathy - Portfolio Website

A modern, responsive portfolio website built with Next.js 16, featuring smooth animations, interactive components, and a clean design aesthetic.

## 🚀 Features

- **Modern Design**: Dark theme with lime green accents, glassmorphism effects, and smooth animations
- **Blog System**: Full-featured blog with markdown support and category filtering
- **Interactive Components**: 
  - Custom cursor with trail effects
  - Animated skills radar chart
  - GitHub contribution graph
  - Typing animation terminal
  - AI Chatbot assistant
- **Backend API Routes**:
  - Contact form submission
  - Analytics tracking
  - Blog post API
  - Health check endpoint
- **SEO Optimized**: Dynamic sitemap, robots.txt, Open Graph images
- **Accessibility**: Skip links, keyboard navigation, screen reader support
- **Performance**: Code splitting, lazy loading, optimized images

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Charts**: Chart.js, React-Chartjs-2
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/Flamechargerr/anamay-portfolio.git

# Navigate to the project
cd portfolio

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🏗️ Project Structure

\`\`\`
├── app/
│   ├── api/                 # API routes
│   │   ├── analytics/       # Analytics tracking
│   │   ├── blog/            # Blog API
│   │   ├── contact/         # Contact form
│   │   └── health/          # Health check
│   ├── blog/                # Blog pages
│   │   ├── [slug]/          # Dynamic blog posts
│   │   └── page.tsx         # Blog index
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── error.tsx            # Error page
│   ├── not-found.tsx        # 404 page
│   ├── loading.tsx          # Loading state
│   ├── sitemap.ts           # Dynamic sitemap
│   ├── robots.ts            # Robots.txt
│   └── opengraph-image.tsx  # OG image
├── components/
│   ├── hero-section.tsx     # Hero with animations
│   ├── header.tsx           # Navigation
│   ├── footer.tsx           # Footer
│   ├── contact-form.tsx     # Contact form
│   ├── blog-section.tsx     # Blog preview
│   ├── projects-showcase.tsx# Projects grid
│   ├── skills-radar.tsx     # Skills chart
│   ├── github-activity.tsx  # GitHub graph
│   ├── chat-bot.tsx         # AI assistant
│   ├── error-boundary.tsx   # Error handling
│   ├── skeletons.tsx        # Loading states
│   └── ...                  # Other components
├── hooks/
│   ├── use-analytics.ts     # Analytics hook
│   └── use-a11y.ts          # Accessibility hook
├── lib/
│   ├── blog-data.ts         # Blog content
│   └── utils.ts             # Utilities
└── public/
    ├── images/              # Static images
    └── resume.pdf           # Resume file
\`\`\`

## 📝 Scripts

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and configure the build
4. Deploy!

### Manual Deployment

\`\`\`bash
# Build the project
npm run build

# Start production server
npm run start
\`\`\`

## 🔧 Environment Variables

Create a \`.env.local\` file with:

\`\`\`env
# Optional: Email service for contact form
RESEND_API_KEY=your_resend_api_key

# Optional: Analytics (Vercel Analytics is auto-configured)
NEXT_PUBLIC_GA_ID=your_ga_id
\`\`\`

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| \`/api/health\` | GET | Health check |
| \`/api/contact\` | POST | Submit contact form |
| \`/api/analytics\` | POST | Track events |
| \`/api/blog\` | GET | Get all blog posts |
| \`/api/blog/[slug]\` | GET | Get single post |

## 🎨 Customization

### Colors

Edit `app/globals.css` to customize the theme:

\`\`\`css
@theme {
  --color-lorenzo-dark: #0d0d0d;
  --color-lorenzo-light: #f4f4f0;
  --color-lorenzo-accent: #c8f550;
}
\`\`\`

### Content

- Update `lib/blog-data.ts` for blog posts
- Modify `components/projects-showcase.tsx` for projects
- Edit component files for other content

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

## 👤 Author

**Anamay Tripathy**
- GitHub: [@Flamechargerr](https://github.com/Flamechargerr)
- LinkedIn: [anamay-tripathy](https://linkedin.com/in/anamay-tripathy)
- Email: tripathy.anamay23@gmail.com

---

Made with ❤️ and ☕
