# Audio Effects

A web-based guitar effects simulator built with the Web Audio API. This interactive application allows you to apply and chain various audio effects (pedals, amps, mixing effects) to audio samples in real-time using a drag-and-drop interface.

**Live Demo**: <https://audio-effects.torretaylor.workers.dev/>

---

## 🚀 Quick Start

**Want to run it locally right now?** Jump to the [complete local development guide](#-development).

**TL;DR:**
```bash
npm install
npm run prepare
# Terminal 1:
npm run start
# Terminal 2:
npm run build:dev
# Open http://localhost:8787
```

---

## 🎯 Project Goals

- Create a flexible guitar effects simulator with multiple effect types
- Build a decoupled architecture that can be easily ported to other audio contexts
- Provide an intuitive drag-and-drop interface for building signal chains
- Demonstrate advanced Web Audio API usage with Preact/React

## ✨ Features

- **Visual Audio Waveform** - Real-time audio visualization using canvas
- **Drag & Drop Interface** - Intuitive effect chain building with visual feedback
- **7 Audio Effects** - Fuzz, Gain, Reverb, Compressor, Delay, Distortion, Impulse Response
- **Real-time Parameter Control** - Adjust effect parameters with immediate audio feedback
- **Signal Chain Management** - Add, remove, and reorder effects in the signal chain
- **Multiple Audio Samples** - Test effects with different audio files
- **Live Guitar Input** - Connect your guitar or microphone for real-time effects processing

## 🛠️ Tech Stack

- **Frontend Framework**: Preact 10 (React-compatible, lightweight alternative)
- **Language**: TypeScript + JSX
- **Styling**: Tailwind CSS
- **State Management**: Redux
- **Drag & Drop**: react-dnd with HTML5 backend
- **Audio**: Web Audio API
- **Build Tool**: esbuild (fast bundling)
- **Deployment**: Cloudflare Workers (serverless edge hosting)
- **Testing**: Jest (unit tests) + Playwright (E2E tests)
- **Code Quality**: ESLint, Prettier, Husky (git hooks), lint-staged

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher recommended)
- **npm** (comes with Node.js)
- **Modern web browser** with Web Audio API support (Chrome, Firefox, Safari, Edge)

## 🚀 Installation

1. **Clone the repository** (or navigate to your project directory)
   ```bash
   cd /path/to/audio-effects
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up git hooks**
   ```bash
   npm run prepare
   ```
   This installs Husky git hooks for code quality checks.

## 💻 Development

### Running Locally - Complete Guide

This project requires **two terminal windows** running simultaneously: one for the web server and one for the build process. Here's everything you need to know:

#### Step-by-Step Setup

**Step 1: Choose Your Server Option**

You have two server options. Both serve on `http://localhost:8787`.

##### Option 1: Cloudflare Wrangler (Recommended for Production-like Testing)

**Advantages:**
- Simulates the Cloudflare Workers environment
- Better for testing deployment behavior
- Handles routing and static assets like production

**How to run:**
```bash
npm run start
```

**What happens:**
- Wrangler starts a local development server
- Serves static files from the `public/` directory (configured in `wrangler.toml`)
- Hot-reloads when files change
- Console output shows: `⬣ Listening on http://localhost:8787`

**When to use:** 
- Testing before deployment
- Debugging Workers-specific behavior
- Default development workflow

##### Option 2: Simple HTTP Server (Lightweight Alternative)

**Advantages:**
- Faster startup
- Simpler, fewer dependencies
- No Cloudflare-specific features needed

**How to run:**
```bash
npm run serve
```

**What happens:**
- Starts `http-server` package on port 8787
- Serves everything from the `public/` directory
- Basic static file server, no special routing
- Console output shows: `Available on: http://127.0.0.1:8787`

**When to use:**
- Quick testing during rapid development
- Troubleshooting Wrangler issues
- Simpler debugging environment

---

**Step 2: Start the Build Watcher (Required for Both Options)**

In a **second terminal window**, run:

```bash
npm run build:dev
```

**What this does:**
This command runs **three watchers in parallel** using `npm-run-all`:

1. **esbuild watcher** (`npm run esbuild:dev`)
   - Watches: All files imported from `src/index.jsx`
   - Bundles: JavaScript/JSX/TypeScript → `public/js/output.js`
   - Features: Preact JSX transformation (`h` function), module bundling
   - Output: `[watch] build finished, watching for changes...`

2. **Tailwind CSS watcher** (`npm run tailwind:dev`)
   - Watches: `src/input.css` and all JSX files in `src/components/`
   - Compiles: Tailwind directives → `public/styles/output.css`
   - Output: `Rebuilding...` on changes, `Done in XXms`

3. **TypeScript compiler** (`npm run tsx:dev`)
   - Watches: All TypeScript files in `src/`
   - Does NOT output any files (configured with `"noEmit": true`)
   - Only performs type checking and shows errors
   - Output: Shows type errors or `Found 0 errors. Watching for file changes.`

**Expected console output:**
```
[esbuild:dev] [watch] build finished, watching for changes...
[tailwind:dev] Done in 245ms.
[tsx:dev] Found 0 errors. Watching for file changes.
```

---

#### Complete Local Development Flow

**Terminal 1:**
```bash

npm run start
# Wait for: "⬣ Listening on http://localhost:8787"
```

**Terminal 2:**
```bash

npm run build:dev
# Wait for all three watchers to show "ready" messages
```

**Browser:**
1. Open `http://localhost:8787`
2. You should see the Audio Effects interface
3. Click **"Start Audio"** to enable audio (required by browser security)
4. Drag effects into the signal chain
5. Audio sample should play through the effect chain

---

### What Happens When You Edit Files

**JavaScript/JSX/TypeScript files (`src/**/*.{js,jsx,ts,tsx}`):**
1. esbuild detects change → rebundles → updates `public/js/output.js`
2. TypeScript compiler checks types → shows any errors
3. **Refresh browser** to see changes

**Component styles (embedded in JSX with Tailwind classes):**
1. Tailwind watcher sees JSX change → regenerates CSS → updates `public/styles/output.css`
2. esbuild also rebundles the JSX
3. **Refresh browser** to see changes

**CSS files (`src/input.css`):**
1. Tailwind compiles → updates `public/styles/output.css`
2. **Refresh browser** (or use live reload extension)

**First Time Setup - Expected Build Time:**
- esbuild: ~100-300ms
- Tailwind: ~200-500ms
- TypeScript: ~1-3 seconds (initial scan)

**Incremental Rebuilds:**
- esbuild: ~10-50ms ⚡️
- Tailwind: ~50-200ms
- TypeScript: ~100-500ms

---

### Verifying Everything Works

**✅ Checklist:**

1. **Both terminals running without errors**
   - Server terminal shows "Listening on..."
   - Build terminal shows all three watchers ready

2. **Page loads at http://localhost:8787**
   - No 404 errors
   - CSS is styled (not plain HTML)
   - JavaScript loads (check DevTools Console for errors)

3. **Files exist:**
   - `public/js/output.js` (should be ~500KB+)
   - `public/styles/output.css` (should have CSS content)

4. **Audio works:**
   - Click "Start Audio" button
   - Audio waveform visualizer animates
   - Can hear audio sample playing

5. **Drag and drop works:**
   - Can drag effects from top section
   - Can drop into signal chain
   - Effects show up with parameter sliders

---

## 🚀 Deployment (Cloudflare Workers)

### Prerequisites

- A Cloudflare account
- Wrangler authenticated (`wrangler login`)

### Build for Production
After building

### Publish

```bash
npx wrangler@latest deploy
```

### Deployment URL

The default Workers URL is:

$$
	ext{https://<worker-name>.<account-subdomain>.workers.dev}
$$

- Worker name comes from [wrangler.toml](wrangler.toml#L1): `audio-effects`
- For this account, the live URL is: https://audio-effects.torretaylor.workers.dev
- You can also attach a custom domain in the Cloudflare dashboard
