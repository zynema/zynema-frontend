# Zynema: Film Recommendation Feature

Zynema is a **Next.js** web application that provides interactive movie recommendations based on users' preferred genres and categories, complete with a dedicated movie detail page.

---

## Key Features

- **Onboarding Modal**: Allows users to select their favorite genres, directors, and release years when visiting the website for the first time.
- **Movie Recommendations**: Displays personalized movie recommendations based on the selected categories.
- **Movie Details**: Dedicated detail page (`/films/[id]`) that presents the movie plot, poster, production information, and ratings.
- **Modern UI/UX**: Premium interface with dark mode enabled by default, smooth transitions, powered by Tailwind CSS v4 and Shadcn UI components.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19, Lucide React (Iconography)
- **Styling**: Tailwind CSS v4 & tw-animate-css
- **UI Components**: Shadcn UI (built on Radix Primitives)

---

## API Integration

The application integrates with an external API hosted at:

`https://zynema-ai.vercel.app`

### Available API Endpoints

1. **Get Movie Categories**
   - **Endpoint**: `https://zynema-ai.vercel.app/categories`
   - **Method**: `GET`

2. **Get Movie Recommendations by Category**
   - **Endpoint**: `https://zynema-ai.vercel.app/recommendations?category=Action&category=Drama`
   - **Method**: `GET`

3. **Get Movie Details**
   - **Endpoint**: `https://zynema-ai.vercel.app/films/:id`
   - **Method**: `GET`

---

## Installation & Getting Started

Follow the steps below to run the project locally.

### 1. Prerequisites

Make sure you have **Node.js** installed (version 18.x or 20.x or later is recommended).

### 2. Navigate to the Project Directory

```bash
cd zynema-frontend
```

### 3. Install Dependencies

Use your preferred package manager to install all required dependencies:

```bash
npm install

# or using Yarn / pnpm / Bun
# yarn install
# pnpm install
# bun install
```

### 4. Run in Development Mode

Start the local development server:

```bash
npm run dev

# or
# yarn dev
# pnpm dev
# bun dev
```

Once the server is running, open `http://localhost:3000` in your browser.

### 5. Build for Production

To create an optimized production build:

```bash
npm run build
```

To serve the production build locally:

```bash
npm run start
```

---

## Project Structure

```text
zynema-frontend/
├── app/                  # Next.js App Router pages and layouts
│   ├── films/[id]/       # Movie detail page (server-side fetching)
│   ├── page.tsx          # Home page (hero section & recommendations)
│   └── globals.css       # Tailwind CSS v4 and custom variables
├── components/           # Reusable UI components (Navbar, Hero, FilmDetail, etc.)
├── services/             # API integration (Films & Categories)
├── next.config.ts        # Next.js configuration (including proxy rewrites)
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```