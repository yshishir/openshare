<p align="center">
  <img src="./public/O.svg" alt="OpenShare" width="80" />
</p>

<h1 align="center">OpenShare</h1>

<p align="center">
  Share your photos, videos & files securely with one simple link.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=flat-square&logo=tailwindcss" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql" />
  <img alt="Cloudinary" src="https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
</p>

---

## ✨ Features

- **Any file, any size** — Upload photos, videos, PDFs and more. No accounts required for the people you share with.
- **One link** — Upload once, get a single shareable link instantly.
- **Password protection** — Gate your link behind a password so only the people you choose can open it.
- **Links that expire** — Every share link self-destructs after 24 hours. No cleanup, no clutter.
- **Auth built in** — Email/password and Google OAuth via [Better Auth](https://better-auth.com).
- **Direct-to-cloud uploads** — Files stream straight to Cloudinary with signed uploads; they never touch our server.
- **Open source** — Free to use, free to self-host. Your files, your server, your rules.

## 📸 Screenshots

> Drop screenshots of the landing page and dashboard here, e.g.
>
> ```
> | Landing page | Dashboard |
> |:---:|:---:|
> | ![Landing](./screenshots/landing.png) | ![Dashboard](./screenshots/dashboard.png) |
> ```

## 🏗️ Architecture

High-level flow of the app — auth, uploads and storage:

```mermaid
flowchart TB
    subgraph Client["Browser (Client)"]
        UI["Next.js UI<br/>/  /login  /dashboard"]
    end

    subgraph Server["OpenShare Server (Next.js)"]
        NEXT["Next.js App Router"]
        API["POST /api/upload<br/>(auth-gated)"]
        AUTH["Better Auth<br/>email/password + Google OAuth"]
    end

    subgraph Data["Data Layer"]
        PRISMA["Prisma ORM"]
        PG[("PostgreSQL (Neon)<br/>users · sessions · files")]
    end

    CLOUD[("Cloudinary<br/>file storage")]

    UI --> NEXT
    NEXT --> AUTH
    AUTH --> PRISMA --> PG
    UI --> API
    API --> CLOUD
    UI -- "signed upload (direct)" --> CLOUD
    CLOUD -- "secure_url" --> UI
```

An editable Excalidraw version of this diagram is available at
[`docs/architecture.excalidraw`](./docs/architecture.excalidraw) — open it at
[excalidraw.com](https://excalidraw.com) (drag & drop the file) to tweak it or export a PNG.

### How sharing works

1. The user uploads files in the dashboard.
2. The client calls `POST /api/upload` which checks the session and returns a
   **Cloudinary upload signature** (never exposes the API secret to the browser).
3. The client uploads the files **directly to Cloudinary** with that signature.
4. Cloudinary returns a `secure_url` for each file.
5. File metadata — `shareToken`, optional `passwordHash` and `expiresAt` — is
   stored in PostgreSQL via Prisma.

## 🧰 Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Auth | [Better Auth](https://better-auth.com) (email/password + Google OAuth) |
| Database | PostgreSQL via [Neon](https://neon.tech) |
| ORM | [Prisma](https://prisma.io) with driver adapter |
| File storage | [Cloudinary](https://cloudinary.com) signed uploads |
| Package manager | [Bun](https://bun.sh) |

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (or Node.js 20+)
- A PostgreSQL database (e.g. free tier on [Neon](https://neon.tech))
- A [Cloudinary](https://cloudinary.com) account
- (Optional) a [Google OAuth](https://console.cloud.google.com/apis/credentials) app

### 1. Clone & install

```bash
git clone https://github.com/your-username/openshare.git
cd openshare
bun install
```

### 2. Set up environment variables

Copy the following into a `.env` file at the project root:

```bash
# Auth (generate a strong secret with: openssl rand -base64 32)
BETTER_AUTH_SECRET=your-secret-here
BETTER_AUTH_URL=http://localhost:3000

# PostgreSQL
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"

# Google OAuth (optional — remove socialProviders if unused)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3. Set up the database

```bash
bunx prisma generate
bunx prisma db push
```

### 4. Run it

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 📦 Scripts

| Command | Description |
| :--- | :--- |
| `bun run dev` | Start the dev server |
| `bun run build` | Generate Prisma client + production build |
| `bun run start` | Start the production server |
| `bun run lint` | Run ESLint |
| `bunx prisma studio` | Browse the database |

## 📁 Project Structure

```
openshare/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/route.ts   # Better Auth handler
│   │   └── upload/route.ts          # Signed upload signature endpoint
│   ├── dashboard/page.tsx           # Dashboard (client shell)
│   ├── login/page.tsx               # Login / register
│   ├── page.tsx                     # Landing page
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                          # shadcn/ui primitives
│   ├── hero.tsx                     # Landing hero
│   ├── features.tsx                 # Landing feature section
│   ├── footer.tsx                   # Landing footer
│   ├── navbar.tsx
│   ├── DashboardShell.tsx           # Upload + share link UI
│   └── LoginPage.tsx
├── lib/
│   ├── auth.ts                      # Better Auth server config
│   ├── auth-client.ts               # Better Auth client
│   ├── cloudinary.ts                # Cloudinary config
│   └── upload.ts                    # Signed upload helper
├── prisma/
│   ├── schema.prisma                # User, Session, File models
│   └── migrations/
├── docs/
│   └── architecture.excalidraw      # Editable architecture diagram
└── public/
```

## 🗺️ Roadmap

- [ ] Public share page to view/download shared files
- [ ] Upload history + revoke links
- [ ] Custom link expiry duration
- [ ] Email notifications
- [ ] Rate limiting & abuse protection

## 🤝 Contributing

Pull requests are welcome! Open an [issue](https://github.com/your-username/openshare/issues)
or submit a PR. For major changes, please open an issue first to discuss what you'd like to change.

## 📄 License

[MIT](./LICENSE)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/your-username">OpenShare contributors</a>
</p>
