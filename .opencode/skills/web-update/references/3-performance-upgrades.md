# Performance Upgrades — Upgrade Performa Vanilla

Katalog upgrade performa spesifik untuk website vanilla HTML/CSS/JS. Fokus pada loading, rendering, caching, dan repaint optimization.

---

## Loading Performance

### 1. Replace `getBoundingClientRect()` dengan `IntersectionObserver`
| Item | Detail |
|------|--------|
| **Lokasi** | `js/main.js:60-70` — `revealOnScroll()` |
| **Masalah** | `getBoundingClientRect()` dipanggil tiap scroll event → **layout thrashing** (browser dipaksa kalkulasi ulang layout) |
| **Solusi** | Ganti dengan `IntersectionObserver` |
| **Code** | `const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active') }) })` |
| **Dampak** | Zero layout thrashing, observer jalan di browser process terpisah |

### 2. Optimasi Google Fonts Loading
| Item | Detail |
|------|--------|
| **Lokasi** | `index.html:28-30` |
| **Masalah** | Google Fonts render-blocking — browser menunggu font download sebelum render text |
| **Solusi** | Tambah `?display=swap` di URL Google Fonts + `font-display: swap` di CSS |
| **Code CSS** | Tambah di `style.css`: `body { font-display: swap; }` |
| **Dampak** | Text langsung muncul pakai system font, swap ke Google Font setelah download |

### 3. Preload Critical Assets
| Item | Detail |
|------|--------|
| **Lokasi** | `index.html` di `<head>` |
| **Masalah** | Font utama dan hero image ditemukan belakangan |
| **Solusi** | Tambah `<link rel="preload">` untuk file font WOFF2 dan hero image |
| **Code** | `<link rel="preload" href="https://fonts.gstatic.com/...woff2" as="font" type="font/woff2" crossorigin>` |
| **Dampak** | Font & hero image mulai download lebih awal |

### 4. Defer Non-Critical JS
| Item | Detail |
|------|--------|
| **Lokasi** | `index.html:369` |
| **Masalah** | `<script src="js/main.js">` di footer — tidak blocking, tapi belum optimal |
| **Solusi** | Tambah `defer` agar download paralel dengan HTML parsing |
| **Code** | `<script defer src="js/main.js"></script>` |
| **Dampak** | Download JS paralel, eksekusi setelah HTML parsed |

### 5. Lazy Loading Optimization
| Item | Detail |
|------|--------|
| **Lokasi** | `index.html` — semua gambar |
| **Masalah** | Hero avatar above-the-fold juga pakai `loading="lazy"` (delay render) |
| **Solusi** | Avatar hero: `loading="eager"` (atau hapus attribute). Gambar lain: tetap `loading="lazy"` |
| **Performa** | Hero image langsung load tanpa delay |

---

## Rendering Performance

### 6. Eliminate Layout Thrashing (Scroll & Resize)
| Item | Detail |
|------|--------|
| **Lokasi** | `js/main.js:155-161` — `window.addEventListener('scroll', updateHeader)` |
| **Masalah** | `updateHeader` membaca `window.scrollY` dan mengubah `header.style.background` tiap frame |
| **Solusi** | Throttle dengan `requestAnimationFrame` + guard condition |
| **Code** | ```let ticking = false; window.addEventListener('scroll', () => { if(!ticking) { requestAnimationFrame(() => { updateHeader(); ticking = false; }); ticking = true; } })``` |
| **Dampak** | Update header hanya sekali per frame, bukan tiap pixel scroll |

### 7. CSS `will-change` untuk Animated Elements
| Item | Detail |
|------|--------|
| **Lokasi** | `css/style.css` |
| **Masalah** | Browser tidak tahu element mana yang akan dianimasi → alokasi layer tidak optimal |
| **Solusi** | Tambah `will-change: transform` ke `.music-player`, `.hobby-card:hover`, `.polaroid` |
| **Dampak** | Browser buat layer terpisah untuk element tersebut → repaint lebih murah |
| **Catatan** | Jangan tambah ke semua element — hanya ke element yang dianimasi via transform |

### 8. Gunakan `transform` + `opacity` Saja untuk Animasi
| Item | Detail |
|------|--------|
| **Lokasi** | `css/style.css` semua animasi |
| **Masalah** | Animasi `top`, `left`, `width`, `height` trigger layout → repaint mahal |
| **Solusi** | Audit animasi — ganti ke `transform: translate()` / `scale()` / `opacity` |
| **Cek** | `.polaroid:hover` scale ok, `.hobby-card:hover` translateY ok, `.cta-btn:hover` translateY ok — sudah baik |
| **Dampak** | Animasi di GPU, bukan CPU |

### 9. Optimasi Scroll Reveal (CSS vs JS)
| Item | Detail |
|------|--------|
| **Lokasi** | `js/main.js:58-73` + `css/style.css:908-917` |
| **Masalah** | Approach saat ini: scroll via IntersectionObserver (sudah cukup baik), `.reveal` transition via CSS |
| **Solusi** | Upgrade ke IntersectionObserver + `threshold: 0.1` + `rootMargin: '0px 0px -50px 0px'` untuk trigger lebih awal |
| **Dampak** | Element muncul sebelum mencapai viewport → smoother experience |

---

## Caching & Network

### 10. Service Worker Dasar (Cache-First)
| Item | Detail |
|------|--------|
| **File baru** | `sw.js` di root |
| **Masalah** | Tidak ada offline fallback, request selalu ke network |
| **Solusi** | Service worker dengan cache-first untuk static assets (CSS, JS, images, fonts) |
| **Code** | Cache `style.css`, `main.js`, favicon, fonts saat install. Serve dari cache, fallback ke network |
| **Dampak** | Load instan untuk returning visitor, offline support |
| **Catatan** | Tambah `<script>` di HTML untuk register SW. Hanya untuk HTTPS (Vercel sudah support) |

### 11. Optimasi Image dengan WebP
| Item | Detail |
|------|--------|
| **Lokasi** | `index.html` — semua gambar |
| **Masalah** | JPG/JPEG masih besar ukurannya |
| **Solusi** | Konversi ke WebP + `<picture>` fallback ke JPEG |
| **Code** | `<picture><source srcset="image.webp" type="image/webp"><img src="image.jpg" alt="..."></picture>` |
| **Dampak** | 25-35% ukuran lebih kecil tanpa quality loss |

### 12. Cache Header via Vercel
| Item | Detail |
|------|--------|
| **Lokasi** | `vercel.json` |
| **Masalah** | Static assets tidak di-cache maksimal |
| **Solusi** | Tambah `Cache-Control` header untuk font, images, CSS, JS |
| **Code** | ```{ "headers": [{ "source": "/(.*)\\.(woff2?|eot|ttf)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }] }``` |
| **Dampak** | Browser cache lebih agresif, load lebih cepat |

### 13. Inline Critical CSS
| Item | Detail |
|------|--------|
| **Lokasi** | `index.html` di `<head>` |
| **Masalah** | `style.css` render-blocking — browser harus download semua CSS sebelum render |
| **Solusi** | Extract above-fold CSS (hero, header, variables) → inline di `<style>` di `<head>`. Load `style.css` dengan `media="print" onload="this.media='all'"` |
| **Dampak** | First paint lebih cepat (critical CSS langsung, non-critical load async) |

---

## JavaScript Optimization

### 14. Remove Unused Event Listeners
| Item | Detail |
|------|--------|
| **Lokasi** | `js/main.js:183-184` |
| **Masalah** | Dua event listener kosong: `window.addEventListener('scroll', () => {})` dan `resize` |
| **Solusi** | Hapus — tidak melakukan apa-apa |
| **Dampak** | Kurangi overhead, cleanup |

### 15. Optimasi Touch Feedback
| Item | Detail |
|------|--------|
| **Lokasi** | `js/main.js:129-135` |
| **Masalah** | Touch feedback handler hanya set `transition` properti, tanpa perubahan aktual — tidak efektif |
| **Solusi** | Ganti dengan CSS `:active` pseudo-class yang sudah ada di `style.css:1287-1309` |
| **Dampak** | Hapus JS yang tidak berguna, CSS handle touch feedback lebih efisien |

### 16. Debounce MutationObserver
| Item | Detail |
|------|--------|
| **Lokasi** | `js/main.js:157-161` |
| **Masalah** | `MutationObserver` trigger `updateHeader()` langsung, yang juga dipanggil via scroll |
| **Solusi** | Tambah guard — hanya panggil `updateHeader()` jika theme benar-benar berubah (sudah di-filter via `attributeFilter`) |
| **Dampak** | Tidak ada perubahan signifikan (sudah optimal), hanya minor cleanup |

---

## Prioritas Implementasi

Urutan implementasi berdasarkan impact-to-effort ratio:

| # | Upgrade | Effort | Impact | Quick Win |
|---|---------|--------|--------|-----------|
| 1 | IntersectionObserver ganti scroll reveal | Sedang | Tinggi | ✅ Fix layout thrash |
| 2 | Defer + font-display swap | Rendah | Tinggi | ✅ |
| 3 | Throttle scroll listener | Rendah | Sedang | ✅ |
| 4 | Hapus empty listeners + touch feedback | Rendah | Rendah | ✅ |
| 5 | Hero image eager load | Rendah | Rendah | ✅ |
| 6 | Cache headers via Vercel | Rendah | Sedang | ✅ |
| 7 | Preload font | Rendah | Sedang | ✅ |
| 8 | Service worker dasar | Sedang | Tinggi | |
| 9 | WebP images | Sedang | Sedang | |
| 10 | Inline critical CSS | Sedang | Tinggi | |
| 11 | will-change hint | Rendah | Rendah | |
