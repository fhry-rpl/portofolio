# Analyze Checklist — Audit Vanilla HTML/CSS/JS

Gunakan checklist ini untuk menganalisis website. Centang setiap item setelah diperiksa.

---

## HTML Structure

- [ ] **Semantic elements**: Apakah menggunakan `<header>`, `<section>`, `<nav>`, `<main>`, `<footer>` dengan benar?
- [ ] **Heading hierarchy**: Apakah `<h1>`—`<h6>` urut dan tidak ada yang loncat?
- [ ] **Missing alt text**: Semua `<img>` punya `alt` attribute?
- [ ] **Meta tags completeness**: `description`, `keywords`, `author`, `robots`, `theme-color`, `og:title`, `og:description`, `og:image`?
- [ ] **Favicon**: Ada `<link rel="icon">`?
- [ ] **Inline styles**: Ada inline styles yang seharusnya di CSS?
- [ ] **Unused HTML elements**: Ada elemen kosong atau tidak terpakai?
- [ ] **Form accessibility**: `<input>` punya `<label>`?
- [ ] **Language attribute**: `<html lang="id">` sudah sesuai?

## CSS Custom Properties & Variables

- [ ] **Unused custom properties**: Ada `--var` yang didefinisikan tapi tidak dipakai?
- [ ] **Missing fallbacks**: Properti CSS baru (`backdrop-filter`, `env(safe-area-inset-top)`) tanpa fallback?
- [ ] **Unused keyframes**: Ada `@keyframes` yang tidak direferensikan?
- [ ] **Repaint-heavy properties**: Masih pakai `top/left/width/height` untuk animasi? (harusnya `transform` + `opacity`)
- [ ] **`!important` usage**: Berapa banyak `!important`? Bisa di-refactor?
- [ ] **Selector specificity**: Ada selector yang terlalu spesifik atau bermasalah?
- [ ] **Missing transitions**: Theme toggle antara light/dark — ada CSS `transition` untuk properti yang berubah?
- [ ] **Print styles**: Ada `@media print`?
- [ ] **Unused CSS classes**: Class yang didefinisikan tapi tidak dipakai di HTML?

## JavaScript

- [ ] **Console errors**: Buka DevTools → Console — ada error/warning?
- [ ] **Layout thrashing**: Panggilan `getBoundingClientRect()` / `offsetTop` di dalam scroll listener?
- [ ] **Missing `passive: true`**: Semua scroll/touch listener pakai `{ passive: true }`?
- [ ] **Memory leaks**: Event listener ditambahkan tapi tidak pernah di-remove?
- [ ] **Audio autoplay blocked**: Browser block autoplay — ada handling `audio.play().catch()`?
- [ ] **Unused event listeners**: Ada event listener yang tidak diperlukan?
- [ ] **DOM queries on every frame**: Query selector di dalam fungsi yang dipanggil tiap frame/scroll?
- [ ] **`innerHTML` injection**: Ada penggunaan `innerHTML` yang berpotensi XSS?
- [ ] **Global scope pollution**: Fungsi/variable global yang seharusnya di module scope?
- [ ] **Feature detection**: Kode menggunakan `IntersectionObserver` tanpa fallback untuk browser lama?

## Performance

- [ ] **Image sizes**: Ukuran gambar vs rendered size — terlalu besar?
- [ ] **Render-blocking resources**: CSS/JS/fonts yang block first paint?
- [ ] **CDN dependencies**: Google Fonts + icon library via CDN — ada timeout/delay?
- [ ] **CSS animation vs JS animation**: Animasi pakai CSS (lebih baik) atau JS (lebih berat)?
- [ ] **Unused CSS/JS**: Ada file/styles yang tidak terpakai?
- [ ] **Preload critical assets**: Font utama di-preload?
- [ ] **Lazy loading**: Semua gambar di bawah fold pakai `loading="lazy"`?
- [ ] **Layout shifts (CLS)**: Image dimensions explicit atau pakai aspect ratio?
- [ ] **Network requests**: Jumlah request — bisa dikurangi dengan inline SVG/ CSS?

## Accessibility

- [ ] **Contrast ratio**: Cek contrast text vs background (min 4.5:1 untuk normal text)
- [ ] **ARIA attributes**: Missing `aria-label`, `aria-expanded`, `aria-controls` untuk interactive elements?
- [ ] **Keyboard navigation**: Semua interactive elements bisa diakses via keyboard (Tab, Enter, Escape)?
- [ ] **Focus trap**: Mobile menu — focus trap aktif saat menu terbuka?
- [ ] **Focus styles**: `:focus-visible` outline untuk keyboard users?
- [ ] **`prefers-reduced-motion`**: Semua animasi di-respect untuk user yang set reduce motion?
- [ ] **Touch target size**: Semua tombol/link minimal 44x44px?
- [ ] **Screen reader**: `role` attributes, `aria-hidden` untuk icon-only elements?

## Mobile & Responsive

- [ ] **Safe areas (iPhone X+)**: Ada `env(safe-area-inset-*)`?
- [ ] **Double-tap zoom**: Ada pencegahan double-tap zoom? (cek `touchend` handler)
- [ ] **Touch feedback**: Interactive elements punya `:active` state untuk touch?
- [ ] **Viewport**: `<meta name="viewport">` sudah optimal?
- [ ] **Landscape mode**: Layout tetap berfungsi di landscape?
- [ ] **Breakpoints**: Cek di 320px, 480px, 768px, 1024px, 1440px

## SEO

- [ ] **Title tag**: Unik per halaman, < 60 karakter
- [ ] **Meta description**: 150-160 karakter
- [ ] **Open Graph**: `og:title`, `og:description`, `og:image`, `og:type`
- [ ] **Structured data**: JSON-LD untuk personal portfolio (Person, WebSite)?
- [ ] **Heading structure**: Satu `<h1>` per halaman
- [ ] **Image alt text**: Descriptive alt untuk SEO
- [ ] **Canonical URL**: Ada `<link rel="canonical">`?

---

## Catatan Khusus untuk Proyek Ini (Portfolio Vanilla)

Website ini adalah portfolio pribadi dengan HTML, CSS, dan JS vanilla. Berikut temuan spesifik yang perlu dicek saat analisis:

### HTML (`index.html`)
- [ ] Baris 6: Meta description — pastikan tidak duplicate
- [ ] Baris 23: `og:image` — pastikan path gambar benar
- [ ] Baris 363: `audio#bg-music` — `preload="none"` bisa menyebabkan delay saat play
- [ ] Baris 69: `avatar.jpg` loading="lazy" — sebaiknya eager karena above-the-fold
- [ ] Tidak ada `<link rel="icon">` untuk favicon

### CSS (`style.css`)
- [ ] Baris 60-63: `.handwritten` — `transform: rotate(-2deg)` inline-block bisa menyebabkan overflow issue
- [ ] Baris 244: `.avatar` — `border: 4px solid white` di dark mode tetap putih (kontras)
- [ ] Baris 304: `.about-card` — `background: rgba(255,255,255,0.7)` di dark mode di-override
- [ ] Baris 462-504: `.polaroid` — Multiple `transform` rules untuk nth-child, hover override mungkin bentrok
- [ ] Baris 1132-1163: Landscape media queries — cek apakah section padding sudah pas
- [ ] Baris 1231-1282: `@media (pointer: coarse)` — redundant dengan touch feedback di CSS lain
- [ ] Baris 1337-1377: `prefers-reduced-motion` — sudah baik, tapi `.film-polaroid` di-set `opacity:1` (kehilangan entrance animasi)

### JS (`main.js`)
- [ ] Baris 60-70: `revealOnScroll()` — `getBoundingClientRect()` dipanggil tiap scroll event → **layout thrashing**. Solusi: pakai `IntersectionObserver`
- [ ] Baris 103-112: Close menu on outside click — sudah baik
- [ ] Baris 117-124: Prevent double-tap zoom — `event.preventDefault()` di `touchend` bisa interfere dengan klik biasa
- [ ] Baris 129-135: Touch feedback — handler kosong, hanya set transition (ineffective)
- [ ] Baris 140-161: Header scroll effect — `updateHeader` dipanggil tiap scroll + MutationObserver. Bisa di-debounce
- [ ] Baris 46-53: `toggleMusic()` — `audio.play().catch(() => {})` sudah baik handle autoplay block
- [ ] Baris 183-184: Scroll & resize empty listeners — mubazir, bisa dihapus
