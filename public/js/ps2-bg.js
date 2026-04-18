(function () {
  const canvas = document.getElementById('ps2-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, t = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // Ribbon bands mimicking PS2 bootup aurora
  const bands = [
    { ry: 0.10, amp: 0.07, freq: 1.8, speed: 0.30, hue: 215, sat: 90, lum: 28, alpha: 0.10, width: 110 },
    { ry: 0.23, amp: 0.05, freq: 2.3, speed: 0.22, hue: 225, sat: 80, lum: 22, alpha: 0.08, width: 80  },
    { ry: 0.38, amp: 0.09, freq: 1.5, speed: 0.40, hue: 200, sat: 95, lum: 32, alpha: 0.12, width: 140 },
    { ry: 0.52, amp: 0.06, freq: 2.6, speed: 0.28, hue: 230, sat: 85, lum: 25, alpha: 0.09, width: 90  },
    { ry: 0.65, amp: 0.08, freq: 2.0, speed: 0.35, hue: 210, sat: 88, lum: 30, alpha: 0.11, width: 120 },
    { ry: 0.78, amp: 0.05, freq: 1.4, speed: 0.20, hue: 220, sat: 75, lum: 20, alpha: 0.07, width: 70  },
    { ry: 0.91, amp: 0.07, freq: 2.1, speed: 0.33, hue: 205, sat: 92, lum: 28, alpha: 0.10, width: 100 },
  ];

  function drawFrame() {
    ctx.fillStyle = 'rgba(4, 6, 20, 0.35)';
    ctx.fillRect(0, 0, W, H);

    for (const b of bands) {
      const baseY = b.ry * H;

      ctx.beginPath();
      for (let x = 0; x <= W + 10; x += 3) {
        const phase = (x / W) * Math.PI * b.freq;
        const y = baseY
          + Math.sin(phase + t * b.speed) * (b.amp * H)
          + Math.sin(phase * 0.47 + t * b.speed * 1.4 + 1.2) * (b.amp * H * 0.35);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      const g = ctx.createLinearGradient(0, 0, W, 0);
      const c = `hsla(${b.hue},${b.sat}%,${b.lum}%,`;
      g.addColorStop(0,   c + '0)');
      g.addColorStop(0.15, c + b.alpha + ')');
      g.addColorStop(0.85, c + b.alpha + ')');
      g.addColorStop(1,   c + '0)');

      ctx.strokeStyle = g;
      ctx.lineWidth   = b.width;
      ctx.stroke();
    }

    t += 0.012;
    requestAnimationFrame(drawFrame);
  }

  drawFrame();
})();
