(() => {
  const PLAYER_URL = 'https://player.mediadelivery.net/embed/738046/387f220a-bd4f-4bca-8b1c-567cec132771?autoplay=false&loop=false&muted=false&preload=true&responsive=true';

  const style = document.createElement('style');
  style.textContent = `
    #view-lesson .video-stage{
      height:auto !important;
      min-height:0 !important;
      aspect-ratio:16/9;
      display:block !important;
      background:#000 !important;
    }
    #view-lesson .video-stage iframe{
      display:block;
      width:100%;
      height:100%;
      border:0;
      background:#000;
    }
    #view-lesson .player-shell > .controls{
      display:none !important;
    }
    #view-lesson .vector-demo-watermark{
      position:absolute;
      z-index:3;
      inset-inline-end:18px;
      top:16px;
      padding:7px 10px;
      border-radius:9px;
      background:rgba(5,7,11,.38);
      border:1px solid rgba(255,255,255,.12);
      color:rgba(255,255,255,.72);
      font:700 10px/1.2 "Segoe UI",Tahoma,Arial,sans-serif;
      letter-spacing:.05em;
      pointer-events:none;
      backdrop-filter:blur(7px);
    }
    @media(max-width:700px){
      #view-lesson .vector-demo-watermark{top:10px;inset-inline-end:10px;font-size:8px;padding:5px 7px}
    }
  `;
  document.head.appendChild(style);

  const stage = document.getElementById('videoStage');
  if (!stage) return;

  stage.innerHTML = `
    <iframe
      src="${PLAYER_URL}"
      title="Vector Learning video preview"
      loading="lazy"
      allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen"
      allowfullscreen="true"
      referrerpolicy="strict-origin-when-cross-origin"></iframe>
    <div class="vector-demo-watermark">VECTOR LEARNING · DEMO</div>`;
})();
