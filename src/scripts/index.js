/*THEME SWITCH*/
/*-------------------------------------------------------------------------------------------*/
var w = globalThis;

if (typeof window !== 'undefined') {

  /* 1.  restore user choice */
  const saved = w.localStorage.getItem('theme');
  const pref  = w.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    w.document.documentElement.dataset.theme = 'dark';

    /* 2. swap theme */
    window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    btn?.addEventListener('click', () => {
        const html = w.document.documentElement;
        const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
        html.dataset.theme = next;
        w.localStorage.setItem('theme', next);

    /* 3. swap logo */
    const img = w.document.querySelector('.side-nav .logo img');
    if (img) {
    img.src = next === 'dark' ? '/public/HunterLogoWhite.png'
                                :'/public/HunterLogoBlack.png';
    img.classList.toggle('logo-black', next === 'light'); 
    img.classList.toggle('logo-white', next === 'dark');  
    }
    });
  });
}

/*-------------------------------------------------------------------------------------------*/


/*WERKPROCES SELECTOR*/
/*-------------------------------------------------------------------------------------------*/
if (typeof window !== 'undefined') {
  document.querySelectorAll('.werkproces').forEach(card => {
    card.addEventListener('click', () => {
      // which werkproces? 1-8
      const num = card.className.match(/werkproces\s+(\d)/)?.[1];
      if (!num) return;

      // grab template
      const tpl = document.getElementById(`wp-${num}`);
      if (!tpl) return;

      // build overlay
      const overlay = document.createElement('div');
      overlay.className = 'fullscreen-overlay';
      overlay.innerHTML = `
        <div class="fullscreen-content">
          <button class="close-btn">✕</button>
          ${tpl.innerHTML}
        </div>
      `;
      document.body.appendChild(overlay);

      // close handlers
      overlay.querySelector('.close-btn').onclick = () => overlay.remove();
      const esc = (e) => {
        if (e.key === 'Escape') {
          overlay.remove();
          document.removeEventListener('keydown', esc);
        }
      };
      document.addEventListener('keydown', esc);
    });
  });
}
/*-------------------------------------------------------------------------------------------*/