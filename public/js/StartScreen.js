document.addEventListener('DOMContentLoaded', () => {
  const startScreen   = document.getElementById('startScreen');
  const introScreen   = document.getElementById('introScreen');
  const mainContent   = document.getElementById('mainContent');

  // Header date
  const dateEl = document.getElementById('headerDate');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('pt-BR', {
      weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit'
    }).toUpperCase();
  }

  // Guard — only run on index page
  if (!startScreen || !introScreen || !mainContent) return;

  // Initial state
  introScreen.style.opacity = '0';
  introScreen.style.display = 'flex';
  mainContent.style.opacity = '0';
  mainContent.style.display = 'none';

  function fadeOut(el, duration = 500) {
    return new Promise(resolve => {
      el.style.transition = `opacity ${duration}ms ease`;
      el.style.opacity = '0';
      setTimeout(() => { el.style.display = 'none'; resolve(); }, duration);
    });
  }

  function fadeIn(el, duration = 800) {
    return new Promise(resolve => {
      el.style.display = el.dataset.display || 'block';
      requestAnimationFrame(() => {
        el.style.transition = `opacity ${duration}ms ease`;
        el.style.opacity = '1';
        setTimeout(resolve, duration);
      });
    });
  }

  async function runIntroSequence() {
    // 1. Fade out start screen
    await fadeOut(startScreen, 600);

    // 2. Show intro title
    introScreen.dataset.display = 'flex';
    await fadeIn(introScreen, 800);

    // 3. Hold for 2.5s
    await new Promise(r => setTimeout(r, 2500));

    // 4. Fade out intro
    await fadeOut(introScreen, 700);

    // 5. Show main
    mainContent.dataset.display = 'flex';
    mainContent.style.display = 'flex';
    document.body.style.overflow = 'auto';

    // Stagger card reveal
    const cards = mainContent.querySelectorAll('.cards');
    cards.forEach((c, i) => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(30px)';
      c.style.transition = `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`;
    });

    requestAnimationFrame(() => {
      mainContent.style.transition = 'opacity 0.6s ease';
      mainContent.style.opacity = '1';
      setTimeout(() => {
        cards.forEach(c => {
          c.style.opacity = '1';
          c.style.transform = 'translateY(0)';
        });
      }, 300);
    });
  }

  startScreen.addEventListener('click', runIntroSequence);

  // Also allow keyboard (Space / Enter)
  document.addEventListener('keydown', e => {
    if ((e.key === ' ' || e.key === 'Enter') && startScreen.style.display !== 'none') {
      runIntroSequence();
    }
  });
});
