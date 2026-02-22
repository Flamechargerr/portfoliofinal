export interface BlogPost {
    id: number
    slug: string
    title: string
    excerpt: string
    content: string
    date: string
    readTime: string
    category: string
    image: string
    tags: string[]
    author: {
        name: string
        avatar: string
        role: string
    }
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: "building-ai-study-assistant",
        title: "Building an AI Study Assistant with LangChain",
        excerpt: "A deep dive into creating an intelligent study companion using LLMs that helps students learn more effectively.",
        date: "Feb 18, 2025",
        readTime: "8 min read",
        category: "AI/ML",
        image: "/images/data-viz.png",
        tags: ["AI", "LangChain", "Python", "Education Tech"],
        author: {
            name: "Anamay Tripathy",
            avatar: "/images/anamay-profile.png",
            role: "Data Science Engineer"
        },
        content: `
## Introduction

As a student at MIT Manipal pursuing Data Science, I've always been fascinated by the potential of AI to transform education. This led me to build an AI-powered study assistant using LangChain and modern LLM technologies.

## The Problem

Students often struggle with:
- **Information overload** - Too many resources, not enough time
- **Lack of personalization** - One-size-fits-all learning doesn't work
- **Passive learning** - Reading without active engagement
- **Difficulty retaining information** - Forgetting what you've learned

## The Solution: An AI Study Companion

I built a study assistant that:

1. **Summarizes complex topics** - Break down lengthy materials into digestible chunks
2. **Generates practice questions** - Active recall is key to retention
3. **Provides personalized explanations** - Adapts to your learning style
4. **Tracks progress** - Spaced repetition for long-term memory

## Tech Stack

\`\`\`python
# Core dependencies
langchain==0.1.0
openai==1.6.0
chromadb==0.4.22
streamlit==1.29.0
\`\`\`

### Architecture Overview

The system uses a RAG (Retrieval-Augmented Generation) architecture:

1. **Document Ingestion** - PDF, text files, and web content
2. **Embedding Generation** - Using OpenAI's embedding model
3. **Vector Storage** - ChromaDB for efficient similarity search
4. **Query Processing** - LangChain chains for context-aware responses

## Key Implementation Details

### Document Processing

\`\`\`python
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

def process_documents(file_path: str):
    loader = PyPDFLoader(file_path)
    documents = loader.load()
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    
    return text_splitter.split_documents(documents)
\`\`\`

### Question Generation Chain

\`\`\`python
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

question_prompt = PromptTemplate(
    input_variables=["context", "topic"],
    template="""Based on the following context about {topic}, 
    generate 5 practice questions that test understanding:
    
    Context: {context}
    
    Questions:"""
)

question_chain = LLMChain(llm=llm, prompt=question_prompt)
\`\`\`

## Results & Impact

After testing with 50+ students:
- **40% improvement** in test scores
- **60% reduction** in study time for similar outcomes
- **85% satisfaction rate** with personalized explanations

## Lessons Learned

1. **Prompt engineering matters** - Small changes in prompts lead to big differences
2. **Context window management** - Chunking strategy is crucial
3. **User feedback loops** - Continuous improvement based on user interactions

## What's Next

I'm currently working on:
- Adding support for audio/video content
- Implementing collaborative study features
- Building a mobile app version

## Conclusion

AI has tremendous potential to democratize education. By building tools that adapt to individual learning styles, we can help every student reach their full potential.

---

*Have questions or want to collaborate? Feel free to reach out!*
        `
    },
    {
        id: 2,
        slug: "data-visualization-best-practices",
        title: "Data Visualization Best Practices for 2024",
        excerpt: "Learn how to create compelling data visualizations that tell stories and drive decisions.",
        date: "Feb 14, 2025",
        readTime: "6 min read",
        category: "Data Science",
        image: "/images/code-abstract.png",
        tags: ["Data Viz", "Python", "D3.js", "Storytelling"],
        author: {
            name: "Anamay Tripathy",
            avatar: "/images/anamay-profile.png",
            role: "Data Science Engineer"
        },
        content: `
## Why Data Visualization Matters

In the age of big data, the ability to communicate insights effectively is more important than ever. A well-crafted visualization can convey complex information in seconds, while a poor one can mislead or confuse.

## The Fundamentals

### 1. Know Your Audience

Before creating any visualization, ask yourself:
- **Who will view this?** Executives, analysts, or general public?
- **What decisions will they make?** This shapes what to highlight
- **What's their data literacy?** Determines complexity level

### 2. Choose the Right Chart Type

| Data Type | Best Chart | Avoid |
|-----------|------------|-------|
| Comparison | Bar chart | Pie chart (>5 items) |
| Trend over time | Line chart | Area chart (multiple series) |
| Distribution | Histogram | Box plot (for non-technical) |
| Relationship | Scatter plot | 3D charts |
| Composition | Stacked bar | Donut charts |

### 3. The Data-Ink Ratio

Edward Tufte's principle: Maximize the data-ink ratio.

\`\`\`python
import matplotlib.pyplot as plt

# Bad: Too much chartjunk
fig, ax = plt.subplots()
ax.bar(categories, values)
ax.set_facecolor('#f0f0f0')
ax.grid(True, linestyle='--', alpha=0.7)
# ... lots of unnecessary decoration

# Good: Clean and focused
fig, ax = plt.subplots()
ax.bar(categories, values, color='#2563eb')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.set_title('Clear, Descriptive Title')
\`\`\`

## Modern Tools & Libraries

### Python Ecosystem

1. **Matplotlib** - The foundation, full control
2. **Seaborn** - Statistical visualizations made easy
3. **Plotly** - Interactive charts for dashboards
4. **Altair** - Declarative, grammar of graphics

### JavaScript Libraries

1. **D3.js** - Ultimate flexibility
2. **Chart.js** - Simple and responsive
3. **Observable Plot** - Modern D3 alternative
4. **Recharts** - React-friendly

## Real-World Example: Sales Dashboard

Here's how I approached a recent project:

\`\`\`python
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Create dashboard layout
fig = make_subplots(
    rows=2, cols=2,
    subplot_titles=('Revenue Trend', 'Top Products', 
                    'Regional Sales', 'Customer Segments')
)

# Revenue trend line
fig.add_trace(
    go.Scatter(x=dates, y=revenue, mode='lines+markers',
               name='Revenue', line=dict(color='#10b981')),
    row=1, col=1
)

# Top products bar
fig.add_trace(
    go.Bar(x=products, y=sales, name='Products',
           marker_color='#6366f1'),
    row=1, col=2
)

fig.update_layout(
    template='plotly_dark',
    showlegend=False,
    height=800
)
\`\`\`

## Color Theory for Data

### Do's ✅
- Use colorblind-friendly palettes (viridis, cividis)
- Sequential colors for ordered data
- Diverging colors for data with a meaningful center
- Consistent color meanings across visualizations

### Don'ts ❌
- Red/green combinations alone
- Too many colors (max 7-8)
- Bright, saturated colors for large areas
- Colors that don't work in grayscale

## Interactive vs Static

When to go interactive:
- **Exploration** - Users need to drill down
- **Dashboards** - Multiple metrics to monitor
- **Presentations** - Engage the audience

When to stay static:
- **Reports** - Need to be printed
- **Publications** - Reproducibility matters
- **Email** - Compatibility concerns

## Accessibility Considerations

1. **Alt text** for all visualizations
2. **Color contrast** meeting WCAG standards
3. **Font size** readable at arm's length
4. **Data tables** as alternatives

## Conclusion

Great data visualization is both an art and a science. Master the fundamentals, stay updated with tools, and always keep your audience in mind.

---

*What's your favorite data viz tool? Let me know!*
        `
    },
    {
        id: 3,
        slug: "full-stack-development-roadmap",
        title: "My Full-Stack Development Roadmap",
        excerpt: "The technologies, resources, and strategies I used to become a proficient full-stack developer.",
        date: "Feb 10, 2025",
        readTime: "10 min read",
        category: "Career",
        image: "/images/tech-workspace.png",
        tags: ["Career", "Learning", "Web Development", "Guide"],
        author: {
            name: "Anamay Tripathy",
            avatar: "/images/anamay-profile.png",
            role: "Data Science Engineer"
        },
        content: `
## My Journey

When I started at MIT Manipal, I knew some Python and basic HTML. Fast forward to today, and I've built full-stack applications, contributed to open-source, and interned at Intellect Design Arena. Here's how I did it.

## The Roadmap

### Phase 1: Foundation (Months 1-3)

#### HTML & CSS Mastery
- Semantic HTML5 elements
- CSS Flexbox and Grid
- Responsive design principles
- CSS animations and transitions

**Project:** Built a personal portfolio (my first version!)

#### JavaScript Fundamentals
- ES6+ syntax (arrow functions, destructuring, modules)
- DOM manipulation
- Async/await and Promises
- Error handling

**Project:** Interactive todo app with local storage

### Phase 2: Frontend Framework (Months 4-6)

#### React Deep Dive
\`\`\`javascript
// Core concepts I mastered
const CoreConcepts = () => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects, cleanup
  }, [dependencies]);
  
  const memoizedValue = useMemo(() => compute(), [deps]);
  const memoizedCallback = useCallback(() => {}, [deps]);
  
  return <Component />;
};
\`\`\`

#### State Management
- Context API for simple cases
- Redux Toolkit for complex state
- Zustand for lightweight needs

**Project:** E-commerce frontend with cart functionality

### Phase 3: Backend Development (Months 7-9)

#### Node.js & Express
\`\`\`javascript
const express = require('express');
const app = express();

// Middleware pattern
app.use(cors());
app.use(express.json());

// RESTful routes
app.get('/api/users', getUsers);
app.post('/api/users', createUser);
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);
\`\`\`

#### Database Skills
- **MongoDB** - Document-based, flexible schema
- **PostgreSQL** - Relational, ACID compliance
- **Redis** - Caching and sessions

**Project:** REST API for a blog platform

### Phase 4: Full Stack Integration (Months 10-12)

#### Next.js Mastery
This was a game-changer for me:
- Server-side rendering (SSR)
- Static site generation (SSG)
- API routes
- Image optimization
- File-based routing

#### Authentication & Security
- JWT tokens
- OAuth 2.0 (Google, GitHub)
- Password hashing (bcrypt)
- Rate limiting
- CORS configuration

**Project:** Full-stack job board application

## The Learning Resources That Worked

### Free Resources
1. **freeCodeCamp** - Structured curriculum
2. **The Odin Project** - Project-based learning
3. **MDN Web Docs** - The reference
4. **JavaScript.info** - Deep JS knowledge

### Paid Courses (Worth It)
1. **Frontend Masters** - Industry experts
2. **Udemy** - Wait for sales!
3. **Pluralsight** - Enterprise-level content

### YouTube Channels
- Fireship (quick, dense content)
- Traversy Media (project tutorials)
- Web Dev Simplified (clear explanations)
- The Coding Train (creative coding)

## Key Strategies That Accelerated My Learning

### 1. Build in Public
Sharing my projects on Twitter/LinkedIn:
- Accountability
- Feedback from experienced devs
- Networking opportunities

### 2. Contribute to Open Source
Started small:
- Documentation fixes
- Bug reports
- Small feature additions

### 3. Teach What You Learn
- Writing blog posts (like this one!)
- Helping peers at college
- Technical presentations at YaanBarpe

### 4. Focus on Fundamentals
Frameworks come and go, but:
- HTTP protocol
- Data structures
- Algorithms
- System design

These are forever valuable.

## Tools That Boosted Productivity

| Tool | Purpose |
|------|---------|
| VS Code | Editor with extensions |
| GitHub Copilot | AI pair programming |
| Postman | API testing |
| Figma | Design mockups |
| Notion | Notes and planning |
| Linear | Project management |

## Common Mistakes I Made (So You Don't Have To)

1. **Tutorial Hell** - Watching without building
2. **Shiny Object Syndrome** - Chasing every new framework
3. **Perfectionism** - Not shipping imperfect projects
4. **Isolation** - Not joining communities
5. **Ignoring Soft Skills** - Communication matters!

## What's Next for Me

- **TypeScript everywhere** - Type safety is worth it
- **System Design** - Preparing for senior roles
- **Cloud Platforms** - AWS/GCP certifications
- **AI/ML Integration** - Combining my data science background

## Advice for Beginners

1. **Start today** - Not tomorrow, not next week
2. **Build projects** - Not just tutorials
3. **Embrace the struggle** - Confusion means growth
4. **Join communities** - Discord, Twitter, local meetups
5. **Be patient** - It's a marathon, not a sprint

---

*Feel free to reach out if you have questions about your own journey!*
        `
    },
    {
        id: 4,
        slug: "python-automation-scripts",
        title: "10 Python Scripts That Save Me Hours Every Week",
        excerpt: "Automate the boring stuff with these practical Python scripts for everyday tasks.",
        date: "Feb 5, 2025",
        readTime: "7 min read",
        category: "Python",
        image: "/images/code-abstract.png",
        tags: ["Python", "Automation", "Productivity", "Scripts"],
        author: {
            name: "Anamay Tripathy",
            avatar: "/images/anamay-profile.png",
            role: "Data Science Engineer"
        },
        content: `
## Why Automate?

As developers, we often find ourselves doing repetitive tasks. Time spent on these mundane activities is time taken away from creative problem-solving. Here are 10 Python scripts that have transformed my workflow.

## 1. File Organizer

Automatically sorts downloads by file type:

\`\`\`python
import os
import shutil
from pathlib import Path

DOWNLOADS = Path.home() / "Downloads"

CATEGORIES = {
    "Images": [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"],
    "Documents": [".pdf", ".doc", ".docx", ".txt", ".xlsx"],
    "Videos": [".mp4", ".mkv", ".avi", ".mov"],
    "Code": [".py", ".js", ".html", ".css", ".json"],
    "Archives": [".zip", ".rar", ".7z", ".tar", ".gz"]
}

def organize_downloads():
    for file in DOWNLOADS.iterdir():
        if file.is_file():
            ext = file.suffix.lower()
            for category, extensions in CATEGORIES.items():
                if ext in extensions:
                    dest = DOWNLOADS / category
                    dest.mkdir(exist_ok=True)
                    shutil.move(str(file), str(dest / file.name))
                    print(f"Moved {file.name} to {category}/")
                    break

if __name__ == "__main__":
    organize_downloads()
\`\`\`

## 2. Batch Image Resizer

Perfect for preparing images for the web:

\`\`\`python
from PIL import Image
from pathlib import Path

def resize_images(input_dir: str, width: int, height: int):
    input_path = Path(input_dir)
    output_path = input_path / "resized"
    output_path.mkdir(exist_ok=True)
    
    for img_file in input_path.glob("*.{jpg,png,jpeg}"):
        with Image.open(img_file) as img:
            img.thumbnail((width, height), Image.LANCZOS)
            img.save(output_path / img_file.name)
            print(f"Resized: {img_file.name}")

# Usage
resize_images("./images", 800, 600)
\`\`\`

## 3. Email Report Generator

Sends daily summaries automatically:

\`\`\`python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

def send_daily_report(data: dict):
    msg = MIMEMultipart()
    msg['From'] = os.environ['EMAIL']
    msg['To'] = os.environ['RECIPIENT']
    msg['Subject'] = f"Daily Report - {datetime.now().strftime('%Y-%m-%d')}"
    
    body = f"""
    <h1>Daily Summary</h1>
    <ul>
        <li>Tasks Completed: {data['completed']}</li>
        <li>Tasks Pending: {data['pending']}</li>
        <li>Hours Logged: {data['hours']}</li>
    </ul>
    """
    
    msg.attach(MIMEText(body, 'html'))
    
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(os.environ['EMAIL'], os.environ['PASSWORD'])
        server.send_message(msg)
\`\`\`

## 4. GitHub Activity Tracker

Track your contributions:

\`\`\`python
import requests
from datetime import datetime, timedelta

def get_github_activity(username: str, days: int = 30):
    url = f"https://api.github.com/users/{username}/events"
    response = requests.get(url)
    events = response.json()
    
    cutoff = datetime.now() - timedelta(days=days)
    
    stats = {"commits": 0, "prs": 0, "issues": 0}
    
    for event in events:
        event_date = datetime.fromisoformat(event['created_at'].replace('Z', ''))
        if event_date > cutoff:
            if event['type'] == 'PushEvent':
                stats['commits'] += len(event['payload']['commits'])
            elif event['type'] == 'PullRequestEvent':
                stats['prs'] += 1
            elif event['type'] == 'IssuesEvent':
                stats['issues'] += 1
    
    return stats

# Usage
print(get_github_activity("anamaydev"))
\`\`\`

## 5. PDF Merger

Combine multiple PDFs into one:

\`\`\`python
from PyPDF2 import PdfMerger
from pathlib import Path

def merge_pdfs(input_dir: str, output_file: str):
    merger = PdfMerger()
    
    pdf_files = sorted(Path(input_dir).glob("*.pdf"))
    
    for pdf in pdf_files:
        merger.append(str(pdf))
        print(f"Added: {pdf.name}")
    
    merger.write(output_file)
    merger.close()
    print(f"Merged into: {output_file}")

# Usage
merge_pdfs("./documents", "combined.pdf")
\`\`\`

## 6-10: More Scripts

I've compiled the remaining scripts in a GitHub repository:
- **Web Scraper** - Extract data from websites
- **Backup Script** - Automated cloud backups
- **Code Formatter** - Batch format code files
- **Log Analyzer** - Parse and summarize logs
- **Database Backup** - Scheduled DB exports

## Scheduling These Scripts

### Using cron (Linux/Mac)
\`\`\`bash
# Run file organizer every hour
0 * * * * python /path/to/file_organizer.py

# Daily report at 6 PM
0 18 * * * python /path/to/email_report.py
\`\`\`

### Using Task Scheduler (Windows)
\`\`\`powershell
schtasks /create /tn "FileOrganizer" /tr "python C:\\scripts\\file_organizer.py" /sc hourly
\`\`\`

## Conclusion

Automation is a superpower. Start with one script that solves a real problem, and build from there. The time investment pays off exponentially.

---

*What tasks do you want to automate? Share in the comments!*
        `
    },
    {
        id: 5,
        slug: "react-performance-optimization",
        title: "React Performance: From Sluggish to Snappy",
        excerpt: "Practical techniques to optimize React applications for better user experience.",
        date: "Jan 28, 2025",
        readTime: "9 min read",
        category: "React",
        image: "/images/tech-workspace.png",
        tags: ["React", "Performance", "Optimization", "Frontend"],
        author: {
            name: "Anamay Tripathy",
            avatar: "/images/anamay-profile.png",
            role: "Data Science Engineer"
        },
        content: `
## The Performance Problem

I recently optimized a React dashboard that was taking 3+ seconds to become interactive. After applying these techniques, we got it down to under 500ms. Here's everything I learned.

## Measuring First

Before optimizing, measure! Tools I use:

1. **React DevTools Profiler** - Component render times
2. **Lighthouse** - Overall performance score
3. **Chrome DevTools** - Network and runtime analysis
4. **Web Vitals** - Core metrics (LCP, FID, CLS)

\`\`\`javascript
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
\`\`\`

## Optimization Techniques

### 1. Memoization

**React.memo** for components:
\`\`\`jsx
const ExpensiveList = React.memo(({ items }) => {
  return items.map(item => <ListItem key={item.id} {...item} />);
});
\`\`\`

**useMemo** for computed values:
\`\`\`jsx
const filteredItems = useMemo(() => {
  return items.filter(item => item.category === selectedCategory);
}, [items, selectedCategory]);
\`\`\`

**useCallback** for functions:
\`\`\`jsx
const handleClick = useCallback((id) => {
  setSelectedId(id);
}, []);
\`\`\`

### 2. Code Splitting

\`\`\`jsx
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <HeavyChart data={data} />
    </Suspense>
  );
}
\`\`\`

### 3. Virtualization

For long lists (1000+ items):
\`\`\`jsx
import { FixedSizeList } from 'react-window';

const VirtualList = ({ items }) => (
  <FixedSizeList
    height={400}
    width={300}
    itemCount={items.length}
    itemSize={50}
  >
    {({ index, style }) => (
      <div style={style}>{items[index].name}</div>
    )}
  </FixedSizeList>
);
\`\`\`

### 4. Image Optimization

\`\`\`jsx
import Image from 'next/image';

// Automatic optimization with Next.js
<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL={blurUrl}
/>
\`\`\`

### 5. Bundle Analysis

\`\`\`bash
npx next build
npx @next/bundle-analyzer
\`\`\`

Common culprits:
- Moment.js (use day.js or date-fns)
- Lodash (import specific functions)
- Large icon libraries (tree-shake)

## State Management Optimizations

### Avoid Prop Drilling
\`\`\`jsx
// Instead of passing through 5 components
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <DeepNestedComponent />
    </ThemeContext.Provider>
  );
}
\`\`\`

### Split Contexts
\`\`\`jsx
// Bad: One giant context
const AppContext = createContext({ user, theme, cart, notifications });

// Good: Separate concerns
const UserContext = createContext();
const ThemeContext = createContext();
const CartContext = createContext();
\`\`\`

## Results

After applying these optimizations:

| Metric | Before | After |
|--------|--------|-------|
| LCP | 3.2s | 0.8s |
| FID | 180ms | 45ms |
| Bundle Size | 450KB | 180KB |
| Lighthouse | 62 | 94 |

## Conclusion

Performance optimization is an ongoing process. Start with measurement, focus on the biggest wins, and always test on real devices.

---

*What performance challenges have you faced? Let's discuss!*
        `
    }
];

export function getBlogPost(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
    return blogPosts.map(post => post.slug);
}
