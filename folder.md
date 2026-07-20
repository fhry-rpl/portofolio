# Portoprojek

Portofolio web pribadi Ferry, siswa SMA. Landing page statis dengan HTML, CSS, dan JavaScript vanilla.

## Struktur Folder

```
Portoprojek/
├── index.html              ← Halaman utama
├── folder.md               ← Dokumentasi ini
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   │   └── avatar.jpg       ← Foto profil
│   │   ├── about/
│   │   │   └── about.jpg        ← Tentang aku
│   │   ├── hobbies/
│   │   │   ├── gaming.jpg       ← Hobi gaming
│   │   │   ├── lari.jpg         ← Hobi lari
│   │   │   └── jalan.jpg        ← Hobi jalan-jalan
│   │   ├── films/
│   │   │   ├── getout.jpg       ← Get Out
│   │   │   ├── truman.jpg       ← The Truman Show
│   │   │   ├── billionaire.jpg  ← Billionaire
│   │   │   ├── interstellar.jpg ← Interstellar
│   │   │   └── toystory.jpg     ← Toy Story
│   │   ├── anime/
│   │   │   ├── naruto.jpg       ← Naruto
│   │   │   ├── aot.jpg          ← Attack on Titan
│   │   │   ├── fma.jpg          ← Fullmetal Alchemist
│   │   │   ├── silentvoice.jpg  ← A Silent Voice
│   │   │   └── oddtaxi.jpg      ← Odd Taxi
│   │   └── gallery/
│   │       ├── sekolah.jpg      ← Galeri sekolah
│   │       ├── bali.jpg         ← Galeri Bali
│   │       ├── gaming.jpg       ← Galeri gaming
│   │       └── lari.jpg         ← Galeri lari
│   ├── audio/
│   │   └── bg-music.mp3         ← Musik background
│   └── favicon/                 ← Favicon custom
├── css/
│   └── style.css
└── js/
    └── main.js
```

## Cara Ganti Foto

Tinggal ganti file di folder masing-masing section:

| Folder | File | Untuk Bagian |
|--------|------|-------------|
| `hero/` | `avatar.jpg` | Foto profil |
| `about/` | `handsome.jpg` | Tentang aku |
| `hobbies/` | `gaming.jpg` | Hobi gaming |
| `hobbies/` | `lari.jpg` | Hobi lari |
| `hobbies/` | `jalan.jpg` | Hobi jalan-jalan |
| `films/` | `getout.jpg` | Get Out |
| `films/` | `truman.jpg` | The Truman Show |
| `films/` | `billionaire.jpg` | Billionaire |
| `films/` | `interstellar.jpg` | Interstellar |
| `films/` | `toystory.jpg` | Toy Story |
| `anime/` | `naruto.jpg` | Naruto |
| `anime/` | `aot.jpg` | Attack on Titan |
| `anime/` | `fma.jpg` | Fullmetal Alchemist |
| `anime/` | `silentvoice.jpg` | A Silent Voice |
| `anime/` | `oddtaxi.jpg` | Odd Taxi |
| `gallery/` | `sekolah.jpg` | Galeri sekolah |
| `gallery/` | `bali.jpg` | Galeri Bali |
| `gallery/` | `gaming.jpg` | Galeri gaming |
| `gallery/` | `lari.jpg` | Galeri lari |
| — | `og-image.jpg` | Preview sosial media |

## Cara Ganti Musik

1. Siapkan file MP3
2. Letakkan di `assets/audio/bg-music.mp3`
3. Atau ganti path di `index.html` baris `<source src="assets/audio/bg-music.mp3">`

## Cara Ganti Favicon

1. Siapkan file SVG atau ICO
2. Letakkan di `assets/favicon/`
3. Di `index.html` tambahkan:
   ```html
   <link rel="icon" href="assets/favicon/favicon.svg">
   ```

## Fitur

- Dark/light mode (persist ke localStorage)
- Mobile responsive dengan hamburger menu
- Scroll reveal animation
- Music player widget
- Gallery gaya polaroid
- Touch feedback untuk mobile
- Aksesibilitas (focus states, reduced motion)

## Teknologi

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid, Animations)
- JavaScript (Vanilla)
- Google Fonts (Poppins, Patrick Hand)
- Phosphor Icons

## Cara Deploy ke Vercel

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/username/porto-web.git
git push -u origin main
```

### 2. Deploy via Vercel
1. Buka https://vercel.com/new
2. Import repo `username/porto-web`
3. **Framework Preset:** `Other`
4. **Root Directory:** `/` (default)
5. **Build & Output Directory:** kosongkan
6. Klik **Deploy**

> Vercel otomatis deteksi static site — tidak perlu build command.

### 3. Selesai
- URL: `https://porto-web.vercel.app`
- Custom domain: Settings → Domains
- Setiap push ke `main` auto redeploy

### File Penting untuk Deploy
| File | Fungsi |
|------|--------|
| `vercel.json` | Cache headers & security headers |
| `.vercelignore` | Exclude file sampah (.opencode/, galeri/) |
| `css/style.min.css` | CSS production (minified) |
| `js/main.min.js` | JS production (minified) |
