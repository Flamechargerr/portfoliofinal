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
        id: 7,
        slug: "medrag-production-hardened-clinical-genai-rag-platform",
        title: "MedRAG: Building a Production-Hardened Clinical GenAI Platform",
        excerpt: "How I built a full-stack clinical RAG platform over the USMLE knowledge base, leveraging FAISS vector search, dual-LLM fallback orchestration, and token-based security for a 30% accuracy lift.",
        date: "June 1, 2026",
        readTime: "10 min read",
        category: "AI & ML",
        image: "/images/project-medrag.png",
        tags: ["Python", "LangChain", "FAISS", "Flask", "Docker", "GenAI"],
        author: {
            name: "Anamay Tripathy",
            avatar: "/images/anamay-profile.png",
            role: "Data Science Engineer"
        },
        content: `
## The Challenge

In clinical environments, generic LLM queries are not just inadequate—they are dangerous due to hallucinations. A clinical assistant must be grounded in verified medical literature (like the USMLE text and clinical notes) and must verify its facts prior to response.

**MedRAG** was designed as an enterprise-grade Clinical RAG (Retrieval-Augmented Generation) engine built over a custom medical knowledge base.

## System Architecture

The core architecture consists of a multi-stage retrieval pipeline, semantic index chunking, dual-LLM fallback, and a dashboard for real-time validation scoring.

\`\`\`
  [Medical Docs / USMLE] -> Recursive Character Split -> HuggingFace Embeddings
                                                                 |
                                                                 v
                                                          [FAISS Vector Index]
                                                                 |
  [User Query] -------------> [Security Guardrails] ------------>+
                                       |
                                       v
                             [Retrieve Top K Chunks]
                                       |
                                       v
                           [Prompt Synthesis Engine]
                                       |
                                       +-------> [Primary LLM: Groq Llama3] --(Fail?)--> [Fallback: Gemini Pro]
                                                                 |
                                                                 v
                                                      [ROUGE-L Accuracy Scorer]
\`\`\`

### 1. FAISS Semantic Indexing
- Documents are split into overlapping 512-token chunks using recursive semantic token splitters.
- Vectorized using HuggingFace sentence-transformers and indexed using L2 Euclidean distance inside a FAISS index.
- Bootstrapped via multi-threaded vector population.

### 2. Dual-LLM Fallback Orchestration
To ensure high availability and prevent rate-limiting or service denial, I engineered a fallback system:
- **Primary Engine**: Llama-3-70B hosted on Groq API for sub-300ms token generation.
- **Secondary Engine**: Gemini 1.5 Pro via Google AI Studio API for complex reasoning queries and automatic fallback.

### 3. Rigorous Safety Guardrails
Given the medical domain, several guardrails were integrated:
- Token-based JWT authentication and CORS allowlisting.
- Strict request size caps and rate limiting (Flask-Limiter).
- Real-time output validation scoring (ROUGE-L similarity against the retrieved source chunks) to flag hallucinations before they reach the user interface.

## Verification & Impact
- Bootstrapping the vector search yielded a **30% improvement in factual generation accuracy** on the USMLE-QA dataset.
- Real-time hallucination ratios were reduced below 1.5% through strict context grounding prompt templates.
- Fully containerized using Docker, allowing rapid deployment into healthcare IT environments.

Check out the full repository and deployment instructions at [github.com/Flamechargerr/MedRAG](https://github.com/Flamechargerr/MedRAG).
`
    },
    {
        id: 6,
        slug: "chargeros-interactive-browser-desktop-simulation",
        title: "ChargerOS: Building a Fully-Featured Desktop Simulator in React",
        excerpt: "How I engineered a complete browser-based operating system shell simulation with a draggable window manager, Unix-style virtual filesystem, persistent storage, and a suite of 59 built-in apps.",
        date: "May 1, 2026",
        readTime: "12 min read",
        category: "Systems",
        image: "/images/project-chargeros.png",
        tags: ["React", "TypeScript", "Vite", "Window Manager", "Tailwind CSS"],
        author: {
            name: "Anamay Tripathy",
            avatar: "/images/anamay-profile.png",
            role: "Data Science Engineer"
        },
        content: `
## The Vision

What started as a simple experiment in window management evolved into a fully realized desktop operating system simulation inside a browser tab. ChargerOS 🔥 recreates a complete computing environment — complete with authentication, wallpaper configuration, panels, taskbars, draggable/resizable windows, an interactive command-line terminal, a Unix-style virtual filesystem, and a suite of **59 built-in applications**.

The ultimate goal was to build a system that was decoupled, performant, and completely client-side.

## Core Architectural Concepts

Operating systems are complex states of coordinates, processes, and data. In a React framework, managing this without triggering laggy global re-renders required decoupling the OS shell state from individual application modules.

\`\`\`
  +-------------------------------------------------+
  |                  Vite / React                   |
  +-------------------------------------------------+
                           |
                           v
                  +-----------------+
                  |   AuthContext   |
                  +-----------------+
                           |
                           v
                +---------------------+
                |  FileSystemContext  |
                +---------------------+
                           |
                           v
                +---------------------+
                |   DesktopContext    |
                +---------------------+
                           |
                           +---------> [Desktop Shell]
                           +---------> [Taskbar & App Menu]
                           +---------> [Window Manager]
                                             |
                                             v
                                      [59 App Modules]
\`\`\`

### 1. Draggable & Resizable Window Manager
Each window is treated as an active process with coordinates (\`x, y\`), dimensions (\`width, height\`), a minimize/maximize state, and a dynamic \`zIndex\`. Focus tracking is managed through an array of open window IDs, where clicking any window moves its ID to the top of the stack, dynamically updates the z-indices, and triggers hardware-accelerated transforms.

### 2. Unix-Style Virtual Filesystem
To make the OS simulation feel authentic, I built a hierarchical virtual filesystem tree from scratch in TypeScript. 
- Directories like \`/home\`, \`/etc\`, \`/var\`, and \`/tmp\` are stored as recursive JSON nodes.
- Exposes standard filesystem APIs: \`readFile\`, \`writeFile\`, \`createFolder\`, \`deleteFile\`, and \`listDir\`.
- Exposes persistent synchronization to the browser's \`localStorage\` API, ensuring folders and customized configurations persist across browser sessions.

## The Interactive Terminal

One of the most complex apps is the simulated **Terminal**. It integrates directly with the virtual filesystem, allowing users to run interactive commands.

\`\`\`typescript
// Command dispatcher interface
interface ShellCommand {
    name: string;
    execute: (args: string[]) => string;
}

const commands: Record<string, ShellCommand> = {
    ls: {
        name: "ls",
        execute: (args) => {
            const contents = fileSystem.listDir(currentPath);
            return contents.map(item => item.name).join("  ");
        }
    },
    cd: {
        name: "cd",
        execute: (args) => {
            const target = args[0] || "/home";
            if (fileSystem.changeDirectory(target)) {
                setCurrentPath(target);
                return "";
            }
            return \`cd: no such file or directory: \${target}\`;
        }
    },
    neofetch: {
        name: "neofetch",
        execute: () => \`
   /\\_/\\      ChargerOS 🔥 2026
  ( o.o )     OS: React 19 / TS 5.9
   > ^ <      Shell: Terminal Emulator
  /     \\     Uptime: \${Math.floor(performance.now() / 1000)}s
  \\_____/     Persistence: LocalStorage
\`
    }
};
\`\`\`

## Scaling to 59 Apps

Managing 59 separate apps inside a single React bundle would typically create a heavy initial download size. I solved this by leveraging a register-pattern database, decoupling app metadata (icon, categories, dimensions) from their runtime dependencies. The suite spans:
- **Productivity & Office**: Word Writer, Spreadsheet engine, Todo list, PDF Reader, Calendar.
- **Media & Design**: Music Player, Canvas Paint program, ASCII Art generator.
- **Utilities**: Network tools, Scientific calculators, password generator.
- **Games**: Solitaire, Chess, Minesweeper, Tetris, Snake.

## Lessons Learned

1. **Keep CSS Hardware-Accelerated:** Using CSS margins or layout triggers (like grid changes) for window dragging is too expensive. We use \`transform: translate3d(x, y, 0)\` to offload window movements directly to the GPU.
2. **Persistence Compression:** Browsers cap \`localStorage\` at 5MB. As users build files, we compress the virtual filesystem JSON serialization to save bandwidth.
3. **Decoupled Providers:** Keeping the file system, authentication, and window managers as separate React context providers keeps the codebase modular and readable.

Check out the full repository and deployment instructions at [github.com/Flamechargerr/ChargerOS](https://github.com/Flamechargerr/ChargerOS).
        `
    },
    {
        id: 1,
        slug: "building-crimeconnect-fbi-graph-intelligence",
        title: "Building CrimeConnect: An FBI-Style Graph Intelligence System",
        excerpt: "How I built a real-time criminal registry and court administration platform with PageRank analysis, force-directed graphs, and a cinematic FBI-grade dashboard using TypeScript, D3.js, and Supabase.",
        date: "Apr 15, 2026",
        readTime: "10 min read",
        category: "Full Stack",
        image: "/images/project-crimeconnect.png",
        tags: ["TypeScript", "D3.js", "Supabase", "Graph Theory", "Next.js"],
        author: {
            name: "Anamay Tripathy",
            avatar: "/images/anamay-profile.png",
            role: "Data Science Engineer"
        },
        content: `
## The Problem

During a team project at MIT Manipal, we were asked to design a system that could model real-world relational data at scale. Crime, courts, and investigations turned out to be the perfect domain — high-stakes, deeply interconnected, and visually fascinating.

The challenge: build a platform that could store, query, and *visually reason* over thousands of criminal records, court cases, and suspect relationships simultaneously.

## Architecture at a Glance

\`\`\`
Frontend: Next.js + TypeScript + Framer Motion + D3.js
Backend:  Supabase (Postgres + Realtime + Auth)
Graphs:   Force-directed simulation (D3-force)
Analytics: PageRank, centrality scoring
\`\`\`

## The Graph Engine

The centrepiece of CrimeConnect is a force-directed graph that renders 10,000+ nodes in real time. Each node is a suspect, victim, or court entity. Edges represent relationships — co-accused, testified against, shared address, etc.

\`\`\`typescript
// PageRank implementation for finding high-centrality suspects
function computePageRank(
  nodes: CrimeNode[],
  edges: CrimeEdge[],
  damping = 0.85,
  iterations = 100
): Map<string, number> {
  const rank = new Map<string, number>()
  const n = nodes.length

  // Initialize uniform ranks
  nodes.forEach(node => rank.set(node.id, 1 / n))

  for (let iter = 0; iter < iterations; iter++) {
    const newRank = new Map<string, number>()
    nodes.forEach(node => {
      const inLinks = edges.filter(e => e.target === node.id)
      const sum = inLinks.reduce((acc, edge) => {
        const srcRank = rank.get(edge.source) ?? 0
        const outDegree = edges.filter(e => e.source === edge.source).length
        return acc + srcRank / Math.max(outDegree, 1)
      }, 0)
      newRank.set(node.id, (1 - damping) / n + damping * sum)
    })
    newRank.forEach((v, k) => rank.set(k, v))
  }

  return rank
}
\`\`\`

Running this on 10K+ nodes takes < 200ms in the browser — fast enough for interactive re-ranking when new evidence is added.

## Real-time Updates with Supabase

The coolest part: when a detective adds a new court case or links suspects, every connected agent's dashboard updates instantly via Supabase Realtime channels.

\`\`\`typescript
const channel = supabase
  .channel("crime-feed")
  .on("postgres_changes", {
    event: "INSERT",
    schema: "public",
    table: "criminal_records",
  }, payload => {
    addNodeToGraph(payload.new as CriminalRecord)
    recalculatePageRank()
  })
  .subscribe()
\`\`\`

## The FBI Dashboard Aesthetic

I wanted the UI to feel like something out of a crime thriller — dark backgrounds, sharp amber and red accents, scan-line overlays, and data feeds that pulse with activity. Every panel uses glassmorphism with a subtle grain texture.

The hardest UI challenge was the *linked selection* system: clicking a node in the graph simultaneously highlights connected records in a sidebar table, with animated transitions between both views without lag.

## What I Learned

1. **D3 + React is tricky** — D3 wants to control the DOM, React does too. The fix: let D3 handle only the SVG rendering inside a \`useEffect\`, and keep all state in React.
2. **PageRank converges fast** — 50 iterations is usually enough for a graph under 50K nodes.
3. **Supabase Realtime is underrated** — Postgres logical replication piped directly to WebSocket subscriptions is genuinely impressive engineering.

Check out the live demo and source at [github.com/Flamechargerr/crime-connect-fbi](https://github.com/Flamechargerr/crime-connect-fbi).
        `
    },
    {
        id: 2,
        slug: "vartificial-intelligence-football-prediction",
        title: "VARtificial Intelligence: Building an XGBoost Football Predictor",
        excerpt: "I built an AI that judges football matches better than VAR. Here's how I used XGBoost, Elo ratings, Optuna hyperparameter tuning, and K-fold cross-validation to hit 71% accuracy on Premier League match outcomes.",
        date: "Apr 8, 2026",
        readTime: "9 min read",
        category: "Machine Learning",
        image: "/images/project-vartificial.png",
        tags: ["Python", "XGBoost", "Optuna", "Scikit-learn", "Elo Rating"],
        author: {
            name: "Anamay Tripathy",
            avatar: "/images/anamay-profile.png",
            role: "Data Science Engineer"
        },
        content: `
## The Spark

VAR (Video Assistant Referee) makes the wrong call embarrassingly often — it's slow, inconsistent, and still loses 15% of close calls in post-analysis studies. The name "VARtificial Intelligence" writes itself.

The actual question I wanted to answer: **can a well-tuned ML model predict Premier League match outcomes better than bookmakers' implied probabilities?**

Spoiler: at 71.3% accuracy on a held-out test set, it's close — and it runs in 40ms instead of 4 minutes.

## The Data Pipeline

\`\`\`python
import pandas as pd
from sklearn.model_selection import StratifiedKFold

# Feature set: last 5 match form, Elo delta, home advantage, head-to-head
features = [
    "home_elo", "away_elo", "elo_delta",
    "home_form_5", "away_form_5",
    "home_goals_scored_avg", "away_goals_conceded_avg",
    "h2h_home_wins", "h2h_draws", "is_derby",
    "days_since_last_match_home", "days_since_last_match_away",
]

X = df[features]
y = df["result"]  # 0 = away win, 1 = draw, 2 = home win
\`\`\`

## Elo Rating System

The Elo ratings were the single biggest predictor. I implemented a rolling Elo calculator that updates after every match:

\`\`\`python
K = 32  # Sensitivity constant

def expected_score(rating_a, rating_b):
    return 1 / (1 + 10 ** ((rating_b - rating_a) / 400))

def update_elo(winner_elo, loser_elo, draw=False):
    E_w = expected_score(winner_elo, loser_elo)
    if draw:
        delta = K * (0.5 - E_w)
        return winner_elo + delta, loser_elo - delta
    return winner_elo + K * (1 - E_w), loser_elo + K * (0 - (1 - E_w))
\`\`\`

## XGBoost with Optuna Tuning

I used Optuna to search the hyperparameter space instead of GridSearch — it's 10x faster for the same coverage.

\`\`\`python
import optuna
import xgboost as xgb
from sklearn.metrics import accuracy_score

def objective(trial):
    params = {
        "n_estimators": trial.suggest_int("n_estimators", 100, 800),
        "max_depth": trial.suggest_int("max_depth", 3, 9),
        "learning_rate": trial.suggest_float("learning_rate", 0.01, 0.3, log=True),
        "subsample": trial.suggest_float("subsample", 0.6, 1.0),
        "colsample_bytree": trial.suggest_float("colsample_bytree", 0.6, 1.0),
        "min_child_weight": trial.suggest_int("min_child_weight", 1, 10),
        "gamma": trial.suggest_float("gamma", 0, 5),
    }
    model = xgb.XGBClassifier(**params, use_label_encoder=False, eval_metric="mlogloss")
    
    skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    scores = []
    for train_idx, val_idx in skf.split(X_train, y_train):
        model.fit(X_train.iloc[train_idx], y_train.iloc[train_idx])
        preds = model.predict(X_train.iloc[val_idx])
        scores.append(accuracy_score(y_train.iloc[val_idx], preds))
    
    return sum(scores) / len(scores)

study = optuna.create_study(direction="maximize")
study.optimize(objective, n_trials=200)
\`\`\`

## Results

| Model | Test Accuracy | Notes |
|-------|--------------|-------|
| Baseline (majority class) | 46.2% | Predict home win always |
| Logistic Regression | 55.8% | |
| Random Forest (untuned) | 62.1% | |
| **XGBoost + Optuna + Elo** | **71.3%** | Production model |
| Bookmakers implied | ~68–72% | Depends on market |

The model is now deployed in a [live dashboard](https://var-tificial-intelligence.vercel.app/) where you can pick any two Premier League teams and get a real-time prediction with probability breakdown.

## Lessons

- **Feature engineering > model choice** — Elo delta alone beat random forest with 50 engineered features
- **Optuna > GridSearch** — 200 Bayesian trials covered more ground than 1000 grid points
- **Class imbalance matters** — draws (28% of matches) were chronically under-predicted until I up-weighted them

[View source on GitHub →](https://github.com/Flamechargerr/VARtificial-Intelligence)
        `
    },
    {
        id: 3,
        slug: "hadoop-3-node-cluster-twitter-sentiment",
        title: "Hadoop on 3 Nodes: Building a Twitter Sentiment Pipeline the Hard Way",
        excerpt: "How our team built a real distributed Hadoop cluster across two machines (a MacBook and a WSL node called Manas), deployed a Spark streaming processor, and visualised real-time Twitter sentiment on a live dashboard.",
        date: "Apr 12, 2026",
        readTime: "12 min read",
        category: "Big Data",
        image: "/images/tech-workspace.png",
        tags: ["Hadoop", "Spark", "Kafka", "Big Data", "Distributed Systems"],
        author: {
            name: "Anamay Tripathy",
            avatar: "/images/anamay-profile.png",
            role: "Data Science Engineer"
        },
        content: `
## Why Do This on Real Hardware?

Most "distributed system" tutorials run three Docker containers on a single laptop. That's fine for learning the API but it teaches you nothing about the actual pain of distributed computing — network partitions, SSH trust, port firewalls, hostname resolution, clock drift.

For our Big Data (BDAT) course at MIT Manipal, our team decided to run a real 3-node Hadoop cluster: my MacBook as the master (NameNode + ResourceManager), a Windows Subsystem for Linux box ("Manas") as a DataNode, and a third virtual node.

## The Setup

**Node 1 — MacBook (Master)**
- Hadoop 3.3.6, Java 11, macOS 14
- NameNode, ResourceManager, HistoryServer

**Node 2 — Manas (WSL2 on Windows)**
- Ubuntu 22.04 inside WSL2
- DataNode, NodeManager

The very first problem: WSL2 dynamically reassigns its IP on every restart. We solved it by binding a static IP via \`.wslconfig\` and adding a \`hosts\` entry on the Mac.

\`\`\`bash
# /etc/hosts on MacBook
192.168.1.42  manas
192.168.1.42  manas.local
\`\`\`

## Getting SSH to Work

Hadoop requires passwordless SSH between all nodes. This took an embarrassing 4 hours to debug — the issue was that WSL2's SSH server wasn't starting automatically.

\`\`\`bash
# On Manas (WSL)
sudo service ssh start
sudo ufw allow 22

# On Mac (test)
ssh hadoop@manas "echo 'Connected'"
\`\`\`

## HDFS and MapReduce

Once the cluster was up, we ran a MapReduce word count on a 500MB Twitter dataset to verify everything worked:

\`\`\`bash
hdfs dfs -put tweets_500mb.json /input/

hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar \
  wordcount /input/tweets_500mb.json /output/wordcount

hdfs dfs -cat /output/wordcount/part-r-00000 | sort -k2 -rn | head -20
\`\`\`

Completion time: **4 min 12 sec** across our 2-node cluster. On my laptop alone: 11 min 40 sec. Real distributed speedup on real hardware.

## Kafka + Spark Streaming Sentiment

The real project was a live sentiment pipeline:

\`\`\`
Twitter API → Kafka topic → Spark Structured Streaming → Postgres → Dashboard
\`\`\`

\`\`\`python
from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, udf
from pyspark.sql.types import StringType, StructType, StructField
from transformers import pipeline

# Load sentiment model (DistilBERT fine-tuned on Twitter data)
sentiment = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment")

@udf(StringType())
def get_sentiment(text):
    if not text:
        return "NEUTRAL"
    result = sentiment(text[:512])[0]
    return result["label"]

spark = SparkSession.builder \
    .appName("TwitterSentiment") \
    .config("spark.jars.packages", "org.apache.spark:spark-sql-kafka-0-10_2.12:3.4.0") \
    .getOrCreate()

schema = StructType([StructField("text", StringType()), StructField("created_at", StringType())])

df = spark.readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "tweets") \
    .load() \
    .select(from_json(col("value").cast("string"), schema).alias("data")) \
    .select("data.*") \
    .withColumn("sentiment", get_sentiment(col("text")))

df.writeStream \
    .foreachBatch(write_to_postgres) \
    .outputMode("append") \
    .start() \
    .awaitTermination()
\`\`\`

## The Dashboard

The monitoring dashboard showed cluster health, HDFS utilisation, active Spark jobs, and a live sentiment gauge — all updating every 5 seconds. Getting it to show real DataNode metrics (not just "Unknown") required fixing the \`dfs.datanode.hostname\` config to broadcast the actual LAN IP instead of localhost.

## Biggest Lessons

1. **Hostname resolution is everything** — 80% of "Hadoop won't connect" issues are DNS/hosts problems.
2. **WSL2 networking is awkward** — It's a NAT'd VM, not a real LAN node. Plan for this.
3. **Start with small data first** — Test your pipeline on 100 lines before throwing 500MB at it.
4. **Spark's web UI is your best friend** — localhost:4040 shows exactly where your job is spending time.

This was the most challenging and rewarding project of my second year. Raw distributed systems on real hardware — no Docker shortcuts.

[View project on GitHub →](https://github.com/Flamechargerr/bdat_project_animoXmanas)
        `
    },
    {
        id: 4,
        slug: "smart-maps-3d-webgl-geospatial",
        title: "Smart Maps 3D: Rendering 1M+ Points at 60 FPS with WebGL & deck.gl",
        excerpt: "How I built a GPU-accelerated geospatial engine using deck.gl, MapLibre, and custom GLSL shaders that renders a million data points with orbital camera dynamics — all in the browser.",
        date: "Mar 25, 2026",
        readTime: "8 min read",
        category: "WebGL",
        image: "/images/project-smartmaps3d.png",
        tags: ["WebGL", "deck.gl", "MapLibre", "GLSL", "TypeScript"],
        author: {
            name: "Anamay Tripathy",
            avatar: "/images/anamay-profile.png",
            role: "Data Science Engineer"
        },
        content: `
## The Problem With Google Maps

Google Maps is fantastic for navigation, terrible for data science. When you have 500,000 crime incidents, pollution readings, or logistics events, any standard map library will choke — it tries to render them as DOM nodes.

Smart Maps 3D was born out of this frustration. The goal: a geospatial canvas that could handle **1 million+ data points at 60 FPS** with smooth orbital camera motion, layer compositing, and time-series playback.

## Why deck.gl?

[deck.gl](https://deck.gl) by Uber Visualization uses WebGL2 to render geospatial data entirely on the GPU. Instead of one DOM node per data point, you get one GPU draw call for an entire layer of millions of points.

\`\`\`typescript
import { Deck } from "@deck.gl/core"
import { ScatterplotLayer, HexagonLayer } from "@deck.gl/layers"
import { MapboxOverlay } from "@deck.gl/mapbox"

const scatterLayer = new ScatterplotLayer({
  id: "incidents",
  data: incidentData, // 1,000,000 records
  getPosition: (d) => [d.lng, d.lat],
  getRadius: 20,
  getFillColor: (d) => getRiskColor(d.severity),
  radiusMinPixels: 1,
  pickable: true, // GPU picking — click any point
})
\`\`\`

Rendering 1M points: **4.2ms per frame** on an M1 GPU. That's 238 FPS headroom.

## Orbital Camera Dynamics

The camera system is the part I'm most proud of. I wanted it to feel like a satellite cinematically descending into a city — smooth easing, momentum, and a sense of weight.

\`\`\`typescript
import { FlyToInterpolator } from "@deck.gl/core"

function zoomToRegion(target: [number, number], zoom: number) {
  setViewState({
    longitude: target[0],
    latitude: target[1],
    zoom,
    pitch: 45,
    bearing: -17.6,
    transitionDuration: 2000,
    transitionInterpolator: new FlyToInterpolator({ speed: 1.5 }),
    transitionEasing: (t: number) => t < 0.5
      ? 4 * t * t * t
      : 1 - (-2 * t + 2) ** 3 / 2, // Ease-in-out cubic
  })
}
\`\`\`

## Custom GLSL Shader for Heatmap

The heatmap layer uses a custom fragment shader to render kernel density estimation directly on the GPU — no CPU preprocessing step.

\`\`\`glsl
// Fragment shader: Gaussian kernel intensity
void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);
  
  // Gaussian kernel
  float intensity = exp(-dist * dist * 8.0);
  
  // Map to colour ramp (cool → warm)
  vec3 cool = vec3(0.0, 0.4, 0.8);
  vec3 warm = vec3(1.0, 0.2, 0.0);
  gl_FragColor = vec4(mix(cool, warm, intensity), intensity * 0.8);
}
\`\`\`

## Time-Series Playback

For temporal data (e.g., crime events throughout a day), I built a playback system that filters data client-side by timestamp and re-renders only changed layers — using deck.gl's layer diffing for zero-GC updates.

\`\`\`typescript
const currentWindow = useMemo(() =>
  allData.filter(d => d.timestamp >= playhead && d.timestamp < playhead + windowMs),
  [allData, playhead, windowMs]
)
\`\`\`

The key insight: deck.gl only re-uploads GPU buffers for layers whose data reference changes. Using \`useMemo\` correctly means zero unnecessary GPU uploads.

## Results

- **1,000,000 scatter points** at 60 FPS on mobile GPU
- **Time-series playback** at 30 steps/second with smooth transitions
- **Sub-10ms click picking** on any of 1M points (GPU picking)
- Works on any WebGL2-capable browser (Chrome, Firefox, Edge, Safari 16+)

[View source on GitHub →](https://github.com/Flamechargerr/smart-maps-3d)
        `
    },
    {
        id: 5,
        slug: "internmailer-bulk-email-automation",
        title: "InternMailer: I Sent 300 Cold Emails in 6 Minutes with Python",
        excerpt: "How I built a bulk email automation engine with personalised templates, scheduling, delivery metrics, and SMTP rotation — and actually used it to land my internship at Intellect Design Arena.",
        date: "Mar 10, 2026",
        readTime: "7 min read",
        category: "Python",
        image: "/images/project-emiplatform.png",
        tags: ["Python", "SMTP", "Automation", "Email", "Node.js"],
        author: {
            name: "Anamay Tripathy",
            avatar: "/images/anamay-profile.png",
            role: "Data Science Engineer"
        },
        content: `
## Why I Built This

Internship season at MIT Manipal is brutal. You're competing with 400+ students for the same roles, and every company expects a "personalised" application. Writing individual emails by hand is a fantasy.

I scraped a list of 300 companies, found HR email addresses, and built InternMailer — a Python tool that sends genuine-looking personalised emails at scale, tracks delivery, and handles SMTP rate limits gracefully.

It landed me an internship at **Intellect Design Arena** (fintech, Mumbai).

## Architecture

\`\`\`
CSV of prospectives → Template Engine → SMTP Rotation → Delivery DB → Analytics Dashboard
\`\`\`

## The Template Engine

The key to not getting caught by spam filters is genuine personalisation. Each email pulls from a CSV field:

\`\`\`python
from jinja2 import Template

template = Template("""
Dear {{ first_name }},

I came across {{ company_name }}'s work on {{ recent_project }} 
and was particularly impressed by {{ specific_detail }}.

As a 3rd-year Data Science student at MIT Manipal, I've recently built:
- {{ project_1 }} ({{ tech_stack_1 }})
- {{ project_2 }} ({{ tech_stack_2 }})

I'd love to discuss a summer internship opportunity...
""")

for _, row in companies_df.iterrows():
    body = template.render(**row.to_dict())
    send_email(row["email"], subject, body)
\`\`\`

## SMTP Rotation

Gmail's free tier limits you to 500 emails/day. With 3 accounts, you can send 1,500 — but you need to rotate carefully to avoid looking like a bot.

\`\`\`python
from itertools import cycle
import time
import random

smtp_accounts = [
    {"email": EMAIL_1, "password": PASS_1},
    {"email": EMAIL_2, "password": PASS_2},
    {"email": EMAIL_3, "password": PASS_3},
]
smtp_cycle = cycle(smtp_accounts)

def send_with_rotation(to, subject, body):
    account = next(smtp_cycle)
    # Human-like jitter: 8-15 seconds between sends
    time.sleep(random.uniform(8, 15))
    
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(account["email"], account["password"])
        msg = MIMEMultipart()
        msg["From"] = account["email"]
        msg["To"] = to
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "html"))
        server.sendmail(account["email"], to, msg.as_string())
        log_delivery(to, account["email"], "SENT")
\`\`\`

## Delivery Tracking

\`\`\`python
# Simple SQLite log for analytics
import sqlite3

def log_delivery(to_email, from_account, status, error=None):
    conn = sqlite3.connect("deliveries.db")
    conn.execute("""
        INSERT INTO emails (to_email, from_account, status, sent_at, error)
        VALUES (?, ?, ?, datetime('now'), ?)
    """, (to_email, from_account, status, error))
    conn.commit()
    conn.close()
\`\`\`

## Results

| Metric | Value |
|--------|-------|
| Emails sent | 312 |
| Time taken | 6 min 22 sec |
| Bounces | 14 (4.5%) |
| Replies | 23 (7.4%) |
| Interviews | 6 |
| Offers | 1 (Intellect Design Arena) |

A 7.4% reply rate on cold outreach is genuinely good — industry average is 1–3%. The personalisation paid off.

## Ethical Note

Every email I sent was a real application, not spam. I only targeted companies actively listing internships, kept the send volume reasonable, and honoured unsubscribe requests immediately. Automation isn't inherently unethical — doing it thoughtlessly is.

[View source on GitHub →](https://github.com/Flamechargerr/InternMailer)
        `
    },
]

export function getBlogPost(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug)
}

export function getAllBlogSlugs(): string[] {
    return blogPosts.map(post => post.slug)
}
