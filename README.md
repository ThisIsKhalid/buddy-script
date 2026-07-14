# 📱 BuddyScript Client

BuddyScript is a premium, feature-rich social media feed application built with a modern frontend stack: **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**. It features an elegant UI with full responsiveness, interactive micro-animations, and complete light/dark theme support.

---

## ✨ Features

- ⚡ **Dynamic Social Feed** - Infinite scroll pagination using TanStack React Query for a fluid browsing experience.
- 📝 **Rich Post Composer** - Share thoughts and upload media/images with immediate UI updates.
- 💬 **Multi-Level Comments & Replies** - Deep nested comment threads allowing contextual and structured conversations.
- 🎭 **Custom Post Reactions** - Immersive micro-interactive reaction bar (likes/emojis) with an overlays modal listing reactor profiles.
- 🌓 **Premium Theme Engine** - Clean theme transition system (Light / Dark mode) powered by `next-themes`.
- 🔐 **Robust Authentication** - Form validation schemas via `react-hook-form` + `zod` for registration, login, and protected routing.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19 & Tailwind CSS v4
- **State Management:** Zustand
- **Data Fetching:** TanStack React Query v5
- **Form Handling:** React Hook Form & Zod Validation
- **Authentication:** JWT & Cookie Session Management

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have **Node.js 20+** installed.

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
BACKEND_API_URL=http://localhost:8000/api/v1
```

### 4. Running Locally
Launch the development server:
```bash
npm run dev
```
Open [http://localhost:8001](http://localhost:8001) in your browser to experience **BuddyScript**.

---

## 📁 Project Structure

```text
src/
├── app/                  # Next.js App Router (Auth, Feed, API Proxy)
├── components/           # Reusable UI & Feature-specific Components (Feed, Auth, Layout)
├── hooks/                # Custom React hooks (Auth, UI events, query helpers)
├── lib/                  # Configurations, client instantiations, and validators
├── providers/            # React context providers (QueryClient, ThemeProvider)
└── store/                # Zustand global state stores (User session, Feed status)
```
