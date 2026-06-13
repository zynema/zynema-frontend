# Zynema: Film Recommendation Feature

Zynema adalah aplikasi web berbasis **Next.js** untuk memberikan rekomendasi film berdasarkan pilihan kategori/genre yang interaktif, dilengkapi dengan detail halaman film.

---

## 🚀 Fitur Utama

- **Onboarding Modal**: Memilih genre, director, dan tahun rilis film favorit saat pertama kali mengunjungi situs.
- **Rekomendasi Film**: Rekomendasi film yang disesuaikan berdasarkan kategori pilihan pengguna.
- **Detail Film**: Halaman detail film (`/films/[id]`) untuk menampilkan plot, poster, detail produksi, dan rating.
- **Modern UI/UX**: Tampilan premium dengan dark mode default, transisi halus, didukung oleh Tailwind CSS v4 dan komponen Shadcn.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library UI**: [React 19](https://react.dev/), [Lucide React](https://lucide.dev/) (Iconography)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [tw-animate-css](https://github.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)

---

## 🔗 Informasi API & Integrasi

Aplikasi ini berintegrasi dengan API eksternal yang dihosting di:
`https://zynema-ai.vercel.app`


### 📂 Daftar API Endpoint

1. **Mengambil Daftar Kategori Film**
   - **Endpoint**: `https://zynema-ai.vercel.app/categories`
   - **Method**: `GET`

2. **Mengambil Rekomendasi Film Berdasarkan Kategori**
   - **Endpoint**: `https://zynema-ai.vercel.app/recommendations?category=Action&category=Drama`
   - **Method**: `GET`

3. **Mengambil Detail Film**
   - **Endpoint**: `https://zynema-ai.vercel.app/films/:id`
   - **Method**: `GET`

---

## ⚙️ Langkah Instalasi & Cara Menjalankan

Ikuti langkah-langkah di bawah ini untuk menjalankan project di lingkungan lokal:

### 1. Prasyarat
Pastikan Anda sudah menginstal **Node.js** (versi 18.x / 20.x ke atas direkomendasikan).

### 2. Cloning Repository
```bash
cd zynema-frontend
```

### 3. Install Dependensi
Gunakan Package Manager pilihan Anda untuk menginstal semua library pendukung:
```bash
npm install
# atau menggunakan yarn / pnpm / bun
# yarn install
# pnpm install
# bun install
```

### 4. Menjalankan Development Mode
Jalankan perintah berikut untuk memulai server lokal:
```bash
npm run dev
# atau
# yarn dev
# pnpm dev
# bun dev
```
Setelah berjalan, buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### 5. Membuat Production Build
Untuk melakukan kompilasi aplikasi ke production-ready state:
```bash
npm run build
```
Untuk menjalankan hasil build tersebut secara lokal:
```bash
npm run start
```

---

## 📁 Struktur Direktori

```text
zynema-frontend/
├── app/                  # Next.js App Router Pages & Layouts
│   ├── films/[id]/       # Halaman Detail Film (Server-Side Fetch)
│   ├── page.tsx          # Halaman Utama (Rekomendasi Film & Hero)
│   └── globals.css       # Tailwind CSS v4 & custom variables
├── components/           # Komponen UI Reusable (Navbar, Hero, FilmDetail, dll.)
├── services/             # Integrasi API (Films & Categories)
├── next.config.ts        # Konfigurasi Next.js (termasuk Proxy Rewrites)
├── package.json          # Dependensi dan script project
└── tsconfig.json         # Konfigurasi TypeScript
```
