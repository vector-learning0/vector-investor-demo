(() => {
  const PLAYER_URL = 'https://player.mediadelivery.net/embed/738046/387f220a-bd4f-4bca-8b1c-567cec132771?autoplay=true&loop=false&muted=true&preload=true&responsive=true';
  let previousOverflow = '';

  const style = document.createElement('style');
  style.textContent = `
    .vector-video-overlay{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:24px;background:rgba(5,7,11,.78);backdrop-filter:blur(10px)}
    .vector-video-dialog{width:min(1080px,96vw);background:#0b0e13;border:1px solid rgba(255,255,255,.14);border-radius:22px;box-shadow:0 30px 100px rgba(0,0,0,.55);overflow:hidden}
    .vector-video-head{height:54px;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:0 16px 0 20px;color:#fff;border-bottom:1px solid rgba(255,255,255,.09);background:#10141b}
    .vector-video-head b{font-size:14px;letter-spacing:.01em}
    .vector-video-close{width:36px;height:36px;border-radius:11px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);color:#fff;font-size:20px;line-height:1;cursor:pointer}
    .vector-video-close:hover{background:rgba(255,255,255,.12)}
    .vector-video-frame{position:relative;padding-top:56.25%;background:#000}
    .vector-video-frame iframe{border:0;position:absolute;inset:0;width:100%;height:100%}
    @media(max-width:600px){.vector-video-overlay{padding:10px}.vector-video-dialog{width:100%;border-radius:16px}.vector-video-head{height:48px}}
  `;
  document.head.appendChild(style);

  function closeVideo() {
    const overlay = document.querySelector('.vector-video-overlay');
    if (!overlay) return;
    overlay.remove();
    document.body.style.overflow = previousOverflow;
  }

  function openVideo() {
    if (document.querySelector('.vector-video-overlay')) return;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const overlay = document.createElement('div');
    overlay.className = 'vector-video-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Vector Learning video preview');
    overlay.innerHTML = `
      <div class="vector-video-dialog">
        <div class="vector-video-head">
          <b>Vector Learning · Video Preview</b>
          <button class="vector-video-close" type="button" aria-label="Close video">×</button>
        </div>
        <div class="vector-video-frame">
          <iframe src="${PLAYER_URL}" loading="eager" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen" allowfullscreen="true" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
      </div>`;

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay || event.target.closest('.vector-video-close')) closeVideo();
    });
    document.body.appendChild(overlay);
    overlay.querySelector('.vector-video-close')?.focus();
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeVideo();
  });

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-route="lesson"], [data-video-preview]');
    if (!trigger) return;

    const label = `${trigger.dataset.en || ''} ${trigger.dataset.ar || ''} ${trigger.textContent || ''}`.toLowerCase();
    const previewLike = trigger.hasAttribute('data-video-preview') ||
      trigger.closest('.course-card,.featured-card') ||
      /preview|free lesson|start now|watch|معاينة|درس مجاني|ابدأ|شاهد/.test(label);

    if (!previewLike) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openVideo();
  }, true);
})();
