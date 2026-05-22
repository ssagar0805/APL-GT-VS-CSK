# CricAI Vision
**Real-Time Tactical Cricket Intelligence Platform**

## Live Demo
**👉 [View Live Application](https://apl-gt-vs-csk.vercel.app)**

## Problem Statement: Data & Insights
> "Design a solution that translates complex match and player data into intuitive and actionable insights for fans. The system should simplify advanced statistics and present them in a way that enhances understanding, decision-making, and overall engagement with the sport."

## What We Built
CricAI Vision is a real-time cricket tactical intelligence platform that transforms raw match telemetry, player statistics, and live match data into actionable operational insights. Designed for modern coaches, commentators, and engaged fans, it operates as a live command center rather than a traditional static dashboard.

## Key Innovation
Traditional dashboards report *what* happened. CricAI Vision reports *why* it happened and *what might happen next*. By integrating live data streams with the Gemini API, we shift the paradigm from reactive data presentation to proactive tactical intelligence. 

## Core Features
*   **Live Tactical Command Center:** A dense, operationally focused primary interface designed for rapid situational awareness and tactical shifts.
*   **Batter vs Bowler Tactical Duel:** A continuous real-time analysis of the active matchup, detailing player vulnerabilities, scoring zones, and immediate threats.
*   **AI Tactical Feed:** A stream of contextual insights—from field placement traps to bowler variations—synthesized by AI based on live match conditions.
*   **Momentum Intelligence:** A live structural momentum engine that tracks pressure shifts and game-state dominance beyond conventional Run Rate tracking.
*   **Timeline Event Engine:** A chronological flow of match-defining events, highlighting key swinging points and momentum structural breaks.
*   **Win Probability Engine:** A dynamic win prediction model factoring in historical context, current pressure, and remaining resources.
*   **Field Configuration Intelligence:** AI-driven interpretation of field placements, translating coordinate setups into contextual tactical meaning (e.g., "Leg-side trap for Dube").

## AI & Data Architecture
*   **Generative AI Hub (Gemini API):** Acts as the tactical engine, ingesting numerical data and producing contextual intelligence, matchup risks, and strategic formulations.
*   **Live Data Ingestion (Cricbuzz / RapidAPI):** Pipeline configured for real-time match state aggregation.
*   **Tactical Synthesis Pipeline:** A highly optimized data layer that normalizes raw structural inputs into a unified match-state object for rapid client-side rendering.

## Engineering Highlights
*   **Stateless Resilience:** Built with robust hydration protocols and graceful degradation to maintain performance under active data loads.
*   **Component-Driven Intelligence:** The UI architecture isolates complex visual modules (e.g., the tactical duel view and momentum strip) for seamless rendering.
*   **Next.js Server Components & Edge Execution:** Leveraging modern React paradigms for minimal client-side payload and rapid time-to-interactive metrics.

## GT vs CSK: Historical Match Intelligence
To demonstrate the platform's full capability, we integrated a bespoke, normalized dataset based on a highly tactical IPL 2026 clash between Gujarat Titans and Chennai Super Kings. This dataset serves as a rigorous testing ground for our AI models to analyze extreme pressure environments and rapid momentum swings.

## Why This Matters
Information overload is a critical issue in modern sports analytics. Teams and broadcasters possess terabytes of data but struggle to extract immediate tactical value during a live match. CricAI Vision solves this by distilling data into distinct, operational intelligence paradigms that inform split-second decisions.

## Future Scope
*   **Predictive Delivery Simulation:** Forecasting the next delivery type based on historical patterns and current match pressure.
*   **Computer Vision Integration:** Real-time broadcast overlay parsing for immediate spatial tracking.
*   **Personalised Fan Experiences:** Modulating the depth of technical jargon based on user profiles (from casual fan to certified analyst).

## Tech Stack
*   **Framework:** Next.js 15+ (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (Server-Side configured)
*   **Data Visualization:** D3.js, Recharts
*   **Icons & Layout:** Lucide React, Radix UI primitives
*   **Intelligence:** Google Gemini API

## How to Run Locally

Follow these steps to get the project up and running on your local machine:

### 1. Prerequisites
*   Make sure you have **Node.js** (v18 or higher) installed.
*   Make sure you have **npm** (or yarn/pnpm) installed.

### 2. Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root of the project. If there is a `.env.example` file, use that as a reference. At a minimum, you will need your Gemini API key if you plan to use AI features.
```bash
# Create a new `.env` file
touch .env

# Add your Gemini API key inside the .env file:
GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Start the Development Server
```bash
npm run dev
```

### 6. View the Application
Open your browser and navigate to:
```text
http://localhost:3000
```

## The Final Vision
A unified intelligence platform that redefines how cricket is analyzed, understood, and strategized—bringing the analytical power of professional backrooms directly to the surface in real-time.
