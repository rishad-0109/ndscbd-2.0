    /* ── Year ── */
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    /* ── Particles ──────────────────────────────────────────── */
    (function() {
      const container = document.getElementById('particles');
      const colors = ['#00d4ff', '#a78bfa', '#34d399'];
      for (let i = 0; i < 40; i++) {
        const el = document.createElement('div');
        el.className = 'particle';
        const size = 1.5 + Math.random() * 2.5;
        const color = colors[i % 3];
        el.style.cssText = `
          width:${size}px; height:${size}px;
          left:${Math.random()*100}%;
          top:${Math.random()*100}%;
          background:${color};
          box-shadow:0 0 ${size*3}px ${color};
          animation-duration:${8+Math.random()*14}s;
          animation-delay:${Math.random()*6}s;
        `;
        container.appendChild(el);
      }
    })();
 /* --- Hero Cover Scroll animation ------------------- */
 const hero = document.getElementById('heroSection');

 window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY >100){
    hero.classList.add('scrolled')
  }else{
    hero.classList.remove('scrolled');
  }
 });
    /* ── Scroll reveal ──────────────────────────────────────── */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '-60px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* ── Flipbook ───────────────────────────────────────────── */
    const TOTAL_PAGES = 97;
    const MAX_SPREAD = Math.floor(TOTAL_PAGES / 2);
    let spread = 0;
    let flipping = false;

    function getPages(s) {
      if (s === 0) return { left: null, right: 1 };
      const l = s * 2, r = l + 1;
      return { left: l <= TOTAL_PAGES ? l : null, right: r <= TOTAL_PAGES ? r : null };
    }

    function renderBook() {
      const p = getPages(spread);
      const leftPage = document.getElementById('leftPage');
      const rightPage = document.getElementById('rightPage');

      if (p.left) {
        leftPage.innerHTML = `<img src="pages/${p.left}.png" loading="lazy"><div class="page-shadow-left"></div>`;
      } else {
        leftPage.innerHTML = `<div class="page-empty"><svg viewBox="0 0 24 24" style="width:40px;height:40px;stroke:var(--accent);fill:none;stroke-width:1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div><div class="page-shadow-left"></div>`;
      }
      if (p.right) {
        rightPage.innerHTML = `<img src="pages/${p.right}.png" loading="lazy"><div class="page-shadow-right"></div>`;
      } else {
        rightPage.innerHTML = `<div class="page-empty"><svg viewBox="0 0 24 24" style="width:40px;height:40px;stroke:var(--accent);fill:none;stroke-width:1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div><div class="page-shadow-right"></div>`;
      }

      document.getElementById('prevBtn').disabled = spread <= 0;
      document.getElementById('nextBtn').disabled = spread >= MAX_SPREAD;
      document.getElementById('spreadCounter').textContent = `${spread} / ${MAX_SPREAD}`;
      document.getElementById('flipbookPageNum').textContent = `${getPages(spread).left ?? 1} — ${TOTAL_PAGES}`;

      // Preload next spread images
      const np = getPages(spread + 1);
      if (np.left) { const i = new Image(); i.src = `pages/${np.left}.png`; }
      if (np.right) { const i = new Image(); i.src = `pages/${np.right}.png`; }
    }

    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

    async function doFlip(dir) {
      if (flipping) return;
      if (dir === 'next' && spread >= MAX_SPREAD) return;
      if (dir === 'prev' && spread <= 0) return;
      flipping = true;

      const cur = getPages(spread);
      const nxt = getPages(spread + (dir === 'next' ? 1 : -1));
      const book = document.getElementById('book');

      const overlay = document.createElement('div');
      overlay.className = `flip-overlay flip-${dir}`;
      const frontPage = dir === 'next' ? cur.right : cur.left;
      const backPage  = dir === 'next' ? nxt.left  : nxt.right;

      if (frontPage) {
        const img = document.createElement('img');
        img.src = `pages/${frontPage}.png`;
        overlay.appendChild(img);
      }
      book.appendChild(overlay);

      // Phase 1: fold toward spine (ease-in)
      await sleep(20);
      overlay.style.transition = 'transform 0.33s ease-in';
      overlay.style.transform = dir === 'next'
        ? 'perspective(2500px) rotateY(-90deg)'
        : 'perspective(2500px) rotateY(90deg)';

      await sleep(340);

      // Swap content for back face
      overlay.innerHTML = '';
      if (backPage) {
        const img = document.createElement('img');
        img.src = `pages/${backPage}.png`;
        img.style.transform = 'scaleX(-1)';
        overlay.appendChild(img);
      }

      // Phase 2: unfold to other side (ease-out)
      overlay.style.transition = 'transform 0.33s ease-out';
      overlay.style.transform = dir === 'next'
        ? 'perspective(2500px) rotateY(-180deg)'
        : 'perspective(2500px) rotateY(180deg)';

      await sleep(340);
      overlay.remove();
      spread += dir === 'next' ? 1 : -1;
      renderBook();
      flipping = false;
    }

    document.getElementById('prevBtn').addEventListener('click', () => doFlip('prev'));
    document.getElementById('nextBtn').addEventListener('click', () => doFlip('next'));
    document.getElementById('tapLeft').addEventListener('click', () => doFlip('prev'));
    document.getElementById('tapRight').addEventListener('click', () => doFlip('next'));

    /* Keyboard navigation */
    document.addEventListener('keydown', e => {
      if (!document.getElementById('flipbookModal').classList.contains('open')) return;
      if (e.key === 'ArrowRight') doFlip('next');
      else if (e.key === 'ArrowLeft') doFlip('prev');
      else if (e.key === 'Escape') closeFlipbook();
    });

    /* ── Open / close flipbook ──────────────────────────────── */
    function openFlipbook() {
      spread = 0;
      renderBook();
      document.getElementById('flipbookModal').classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeFlipbook() {
      document.getElementById('flipbookModal').classList.remove('open');
      document.body.style.overflow = '';
    }

    document.getElementById('heroCoverBtn').addEventListener('click', openFlipbook);
    document.getElementById('openFlipbookBtn').addEventListener('click', openFlipbook);
    document.getElementById('descCoverBtn').addEventListener('click', openFlipbook);
    document.getElementById('closeFlipbook').addEventListener('click', closeFlipbook);

    /* ── Image lightbox ─────────────────────────────────────── */
    function openLightbox(src) {
      document.getElementById('lightboxImg').src = src;
      document.getElementById('lightboxModal').classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      document.getElementById('lightboxModal').classList.remove('open');
      document.body.style.overflow = '';
    }
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });

    /* Wall magazine card → lightbox */
    document.getElementById('wallMagCard').addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img) openLightbox(img.src);
    });
