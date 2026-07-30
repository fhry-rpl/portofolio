# Interactive Upgrades — Fitur Interaktif Vanilla

Katalog upgrade fitur interaktif yang cocok untuk website vanilla HTML/CSS/JS dengan design style playful/polaroid/handwritten.

Setiap upgrade dilengkapi level kesulitan, dampak, dan implementasi vanilla.

---

## Level Mudah

### 1. Typewriter Effect pada Hero Text
| Item | Detail |
|------|--------|
| **File** | `index.html` (hero title) + `js/main.js` |
| **Dampak** | Hero section lebih engaging |
| **Implementasi** | Ambil teks "Halo, aku Ferry!", tampilkan karakter per karakter via `setInterval` + `textContent` |
| **Code** | `function typeWriter(el, text, speed = 80) { ... }` dengan `requestAnimationFrame` fallback |
| **Catatan** | Jangan ganggu `<span>Ferry!</span>` — apply typewriter ke parent node |

### 2. Smooth Scroll Progress Bar
| Item | Detail |
|------|--------|
| **File** | `css/style.css` + `js/main.js` |
| **Dampak** | User tahu posisi scroll |
| **Implementasi** | Fixed bar di top, width di-set via `(scrollTop / (scrollHeight - clientHeight)) * 100` |
| **Style** | Gradient tipis `var(--primary)` → `var(--accent)`, height 3px, z-index di atas header |
| **Performa** | Update via `requestAnimationFrame`, bukan raw scroll listener |

### 3. Back-to-Top Button
| Item | Detail |
|------|--------|
| **File** | `index.html` + `css/style.css` + `js/main.js` |
| **Dampak** | Navigasi cepat ke atas |
| **Implementasi** | Floating button muncul setelah scroll > 400px, smooth scroll ke `#hero` |
| **Style** | Cocok dengan music player widget (fixed bottom-right, rounded, shadow) |
| **Ikon** | `ph-arrow-up` dari Phosphor |

### 4. Stagger Animation on Scroll
| Item | Detail |
|------|--------|
| **File** | `css/style.css` + `js/main.js` |
| **Dampak** | Elemen muncul lebih smooth bertahap |
| **Implementasi** | Pakai `IntersectionObserver` + `transition-delay` incremental per child |
| **Style** | Applied ke `hobby-card`, `film-polaroid`, `achievement-item` |
| **Performa** | Zero layout thrashing — better dari `getBoundingClientRect()` saat ini |

---

## Level Sedang

### 5. 3D Tilt Effect pada Polaroid
| Item | Detail |
|------|--------|
| **File** | `css/style.css` + `js/main.js` |
| **Dampak** | Gallery & film section jadi interaktif, immersive |
| **Implementasi** | `mousemove` pada `.polaroid`/`.film-polaroid` → hitung rotateX/Y berdasarkan mouse position relatif ke card |
| **CSS** | `transform: perspective(800px) rotateY(var(--rotateY)) rotateX(var(--rotateX))` |
| **Fallback** | Nonaktif di touch device (`pointer: coarse`) |
| **Performa** | Gunakan `transform` + `will-change: transform`, debounce via `requestAnimationFrame` |

### 6. Filterable Gallery
| Item | Detail |
|------|--------|
| **File** | `index.html` + `css/style.css` + `js/main.js` |
| **Dampak** | Gallery polaroid jadi interaktif — bisa filter berdasarkan kategori |
| **Implementasi** | Tambah `data-category` di HTML, buat filter button di atas gallery, toggle `display: none` via class |
| **HTML** | Tambah `<div class="gallery-filters">` dengan button "Semua", "Alam", "Kota", dll |
| **Animasi** | CSS `transition` saat muncul/hilang, pakai `opacity` + `transform: scale` |
| **Performa** | DOM manipulation minimal — cukup toggle class, bukan create/remove |

### 7. Image Lightbox
| Item | Detail |
|------|--------|
| **File** | `css/style.css` + `js/main.js` |
| **Dampak** | Klik polaroid → lihat gambar fullscreen |
| **Implementasi** | Gunakan `<dialog>` element native (Chrome 37+, Firefox 98+) + fallback modal |
| **Style** | Overlay gelap, gambar center with `object-fit: contain`, close button, keyboard Escape |
| **Aksesibilitas** | `aria-modal="true"`, focus trap di dalam dialog, `aria-label` untuk close button |

### 8. Scroll-Activated Counter
| Item | Detail |
|------|--------|
| **File** | `index.html` + `css/style.css` + `js/main.js` |
| **Dampak** | Achievement/statistic section lebih hidup |
| **Implementasi** | `IntersectionObserver` trigger → `requestAnimationFrame` counter dari 0 → target |
| **Data** | Tambah `data-count="XXX"` attribute di element |
| **Performa** | Zero cost saat tidak terlihat, hanya jalan sekali saat intersect |

### 9. Active Nav Highlight on Scroll
| Item | Detail |
|------|--------|
| **File** | `js/main.js` |
| **Dampak** | Nav memberi feedback posisi section aktif |
| **Implementasi** | `IntersectionObserver` untuk tiap section → toggle class `active` di nav link sesuai |
| **Performa** | Ganti dari approach manual scroll → `IntersectionObserver`, lebih efisien |

---

## Level Sulit

### 10. Dynamic Theme Customizer
| Item | Detail |
|------|--------|
| **File** | `index.html` + `css/style.css` + `js/main.js` |
| **Dampak** | User bisa custom warna accent/primary |
| **Implementasi** | Color picker → set CSS custom property `--primary` dan `--accent` → simpan ke localStorage |
| **HTML** | Tambah floating theme panel (gear icon → expand panel) |
| **Performa** | Hanya update CSS variable, zero repaint cost |
| **Integrasi** | Cocok untuk dark mode system yang sudah ada |

### 11. Infinite Scroll / Load More Gallery
| Item | Detail |
|------|--------|
| **File** | `index.html` + `js/main.js` |
| **Dampak** | Gallery bisa muat banyak foto tanpa nge-bloat halaman |
| **Implementasi** | `IntersectionObserver` sentinel element → load batch berikutnya dari JS array |
| **Performa** | Virtual DOM-like — hanya render visible + next batch |
| **Animasi** | Stagger entrance animation tiap batch baru |

### 12. Custom Cursor
| Item | Detail |
|------|--------|
| **File** | `css/style.css` + `js/main.js` |
| **Dampak** | Personal touch, playful aesthetic |
| **Implementasi** | `mousemove` → update `translate()` cursor div, dengan trailing dot |
| **Style** | Dot kecil `var(--primary)` dengan blur circle di belakang |
| **Performa** | WAJIB pakai `transform` + `will-change`, nonaktif di touch device |
| **Fallback** | `@media (pointer: fine)` only |

---

## Prioritas Implementasi

Untuk proyek portfolio ini, rekomendasi urutan implementasi:

1. **IntersectionObserver → ganti scroll reveal** (fix layout thrash + upgrade)
2. **Active nav highlight** (low effort, high impact UX)
3. **Typewriter effect di hero** (visual impact, mudah)
4. **Back-to-top button** (mudah, UX improvement)
5. **Filterable gallery** (sedang, gallery jadi interaktif)
6. **3D tilt polaroid** (sedang, amplify existing design)
7. **Scroll progress bar** (mudah, tambahan informatif)
8. **Image lightbox** (sedang, gallery functionality)
9. **Stagger animation on scroll** (sedang, smooth reveal)
10. **Scroll-activated counter** (sedang, achievement section)
11. **Dynamic theme customizer** (sulit, kompleksitas tinggi)
12. **Custom cursor** (opsional, touch device fallback)
