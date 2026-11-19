/* =====================================================================
   TRISHA DI ROYAL BIRTHDAY - JAVASCRIPT ENGINE
   Featuring:
   - Web Audio Birthday Synthesizer & Sound FX (Crackers, Pop, Chimes)
   - Real-time Fireworks & Crackers Engine
   - Metallic Confetti Cannon Engine
   - 3D Floating Black & Golden Balloons
   - 3D Card Unfolding & Celebration Triggers
   - Interactive Red Velvet Cake Slicing
   - Interactive Gift Box Reveals (Cutest Dark Truth & Loveliest)
   - Memory Gallery Lightbox & Sibling Photo Frame Switcher
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. WEB AUDIO SYNTHESIZER & SOUND FX ENGINE
  // -------------------------------------------------------------
  let audioCtx = null;
  let isPlayingSong = false;
  let currentMelodyTimer = null;
  let isMuted = false;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Sound: Sparkle / Chime (For gift opening)
  function playChimeSound() {
    initAudioContext();
    if (!audioCtx || isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0, audioCtx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + idx * 0.08);
      osc.stop(audioCtx.currentTime + idx * 0.08 + 0.65);
    });
  }

  // Sound: Firecracker Crackle & Boom (For Birthday crackers)
  function playCrackerSound() {
    initAudioContext();
    if (!audioCtx || isMuted) return;

    // 1. Deep Boom
    const boomOsc = audioCtx.createOscillator();
    const boomGain = audioCtx.createGain();
    boomOsc.type = 'sine';
    boomOsc.frequency.setValueAtTime(140, audioCtx.currentTime);
    boomOsc.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 0.45);

    boomGain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    boomGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);

    boomOsc.connect(boomGain);
    boomGain.connect(audioCtx.destination);
    boomOsc.start();
    boomOsc.stop(audioCtx.currentTime + 0.5);

    // 2. Crackling noise
    const bufferSize = audioCtx.sampleRate * 0.6;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Crackle pops
      data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.85 ? 0.9 : 0.08);
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1800;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.55);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);

    noise.start(audioCtx.currentTime);
    noise.stop(audioCtx.currentTime + 0.6);
  }

  // Sound: Knife Swoosh / Slice
  function playKnifeSwoosh() {
    initAudioContext();
    if (!audioCtx || isMuted) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.26);
  }

  // Sound: Cake Confetti Pop & Fanfare
  function playConfettiPopSound() {
    initAudioContext();
    if (!audioCtx || isMuted) return;

    // Pop sound
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(380, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, audioCtx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.16);

    // Mini celebratory brass chord
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const chordOsc = audioCtx.createOscillator();
      const chordGain = audioCtx.createGain();
      chordOsc.type = 'sawtooth';
      chordOsc.frequency.setValueAtTime(freq, audioCtx.currentTime + 0.05);

      chordGain.gain.setValueAtTime(0.12, audioCtx.currentTime + 0.05);
      chordGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8 + i * 0.05);

      chordOsc.connect(chordGain);
      chordGain.connect(audioCtx.destination);
      chordOsc.start(audioCtx.currentTime + 0.05);
      chordOsc.stop(audioCtx.currentTime + 0.9);
    });
  }

  // Sound: Balloon Pop
  function playBalloonPopSound() {
    initAudioContext();
    if (!audioCtx || isMuted) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.09);
  }

  // =============================================================
  // COMPLETE "HAPPY BIRTHDAY TO YOU" SYNTHESIS MELODY
  // (In Key of F Major, warm vibraphone / music box tone)
  // =============================================================
  const birthdayNotes = [
    // Phrase 1: Hap-py Birth-day to you
    { note: 349.23, dur: 0.35, pause: 0.05 }, // F4
    { note: 349.23, dur: 0.25, pause: 0.05 }, // F4
    { note: 392.00, dur: 0.65, pause: 0.08 }, // G4
    { note: 349.23, dur: 0.65, pause: 0.08 }, // F4
    { note: 466.16, dur: 0.65, pause: 0.08 }, // Bb4
    { note: 440.00, dur: 1.15, pause: 0.25 }, // A4

    // Phrase 2: Hap-py Birth-day to you
    { note: 349.23, dur: 0.35, pause: 0.05 }, // F4
    { note: 349.23, dur: 0.25, pause: 0.05 }, // F4
    { note: 392.00, dur: 0.65, pause: 0.08 }, // G4
    { note: 349.23, dur: 0.65, pause: 0.08 }, // F4
    { note: 523.25, dur: 0.65, pause: 0.08 }, // C5
    { note: 466.16, dur: 1.15, pause: 0.25 }, // Bb4

    // Phrase 3: Hap-py Birth-day dear Tri-sha Di!
    { note: 349.23, dur: 0.35, pause: 0.05 }, // F4
    { note: 349.23, dur: 0.25, pause: 0.05 }, // F4
    { note: 698.46, dur: 0.65, pause: 0.08 }, // F5
    { note: 587.33, dur: 0.65, pause: 0.08 }, // D5
    { note: 466.16, dur: 0.65, pause: 0.08 }, // Bb4
    { note: 440.00, dur: 0.65, pause: 0.08 }, // A4
    { note: 392.00, dur: 1.25, pause: 0.25 }, // G4

    // Phrase 4: Hap-py Birth-day to you!
    { note: 622.25, dur: 0.35, pause: 0.05 }, // Eb5
    { note: 622.25, dur: 0.25, pause: 0.05 }, // Eb5
    { note: 587.33, dur: 0.65, pause: 0.08 }, // D5
    { note: 466.16, dur: 0.65, pause: 0.08 }, // Bb4
    { note: 523.25, dur: 0.65, pause: 0.08 }, // C5
    { note: 466.16, dur: 1.5,  pause: 0.50 }  // Bb4
  ];

  function playNote(freq, dur) {
    if (!audioCtx || isMuted) return;

    // Harmonic bell / music box synthesis
    const now = audioCtx.currentTime;
    
    // Fundamental
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.28, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + dur + 0.05);

    // Warm Second Harmonic (Octave)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.12, now + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + dur * 0.7);

    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now);
    osc2.stop(now + dur + 0.05);

    // Sub Bass accompaniment
    if (freq > 400) {
      const bassOsc = audioCtx.createOscillator();
      const bassGain = audioCtx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(freq / 2, now);

      bassGain.gain.setValueAtTime(0, now);
      bassGain.gain.linearRampToValueAtTime(0.14, now + 0.03);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + dur * 0.85);

      bassOsc.connect(bassGain);
      bassGain.connect(audioCtx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + dur + 0.05);
    }
  }

  function startBirthdaySong(loop = true) {
    initAudioContext();
    stopBirthdaySong();
    isPlayingSong = true;
    updateMusicPillUI(true);

    let noteIdx = 0;

    function nextStep() {
      if (!isPlayingSong) return;

      if (noteIdx >= birthdayNotes.length) {
        if (loop) {
          noteIdx = 0;
          currentMelodyTimer = setTimeout(nextStep, 1000);
        } else {
          stopBirthdaySong();
        }
        return;
      }

      const item = birthdayNotes[noteIdx];
      playNote(item.note, item.dur);
      noteIdx++;

      currentMelodyTimer = setTimeout(nextStep, (item.dur + item.pause) * 1000);
    }

    nextStep();
  }

  function stopBirthdaySong() {
    isPlayingSong = false;
    if (currentMelodyTimer) {
      clearTimeout(currentMelodyTimer);
      currentMelodyTimer = null;
    }
    updateMusicPillUI(false);
  }

  // Music Pill Controller
  const musicPill = document.getElementById('musicPill');
  const musicLabel = document.getElementById('musicLabel');

  function updateMusicPillUI(active) {
    if (active) {
      musicPill.classList.add('playing');
      musicLabel.textContent = "Music Playing 🎶";
    } else {
      musicPill.classList.remove('playing');
      musicLabel.textContent = "Play Birthday Melody 🎶";
    }
  }

  musicPill.addEventListener('click', () => {
    initAudioContext();
    if (isPlayingSong) {
      stopBirthdaySong();
    } else {
      startBirthdaySong(true);
    }
  });

  // -------------------------------------------------------------
  // 2. FLOATING BALLOONS GENERATOR (BLACK & GOLDEN & VELVET)
  // -------------------------------------------------------------
  const balloonSky = document.getElementById('balloonSky');
  const balloonTypes = ['gold-balloon', 'black-balloon', 'velvet-balloon'];

  function createFloatingBalloon() {
    if (!balloonSky) return;
    
    // Cap balloon count on screen
    if (balloonSky.children.length > 20) return;

    const b = document.createElement('div');
    const type = balloonTypes[Math.floor(Math.random() * balloonTypes.length)];
    b.className = `balloon ${type}`;

    // Randomize initial position and scale
    const startX = Math.random() * 95; // 0 - 95 vw
    const scale = 0.65 + Math.random() * 0.6;
    const duration = 12 + Math.random() * 12; // 12s - 24s

    b.style.left = `${startX}vw`;
    b.style.transform = `scale(${scale})`;
    b.style.animationDuration = `${duration}s`;

    // String
    const str = document.createElement('div');
    str.className = 'balloon-string';
    b.appendChild(str);

    // Interactive Pop on Click
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      playBalloonPopSound();
      launchGlitterBurst(e.clientX, e.clientY);
      b.remove();
    });

    balloonSky.appendChild(b);

    // Auto cleanup after float completes
    setTimeout(() => {
      if (b.parentNode) b.remove();
    }, duration * 1000);
  }

  // Pre-seed some balloons and schedule interval
  for (let i = 0; i < 9; i++) {
    setTimeout(createFloatingBalloon, i * 800);
  }
  setInterval(createFloatingBalloon, 2200);

  // -------------------------------------------------------------
  // 3. AMBIENT GOLD DUST CANVAS
  // -------------------------------------------------------------
  const ambientCanvas = document.getElementById('ambientCanvas');
  const ambientCtx = ambientCanvas.getContext('2d');
  let ambientParticles = [];

  function resizeAmbientCanvas() {
    ambientCanvas.width = window.innerWidth;
    ambientCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeAmbientCanvas);
  resizeAmbientCanvas();

  for (let i = 0; i < 45; i++) {
    ambientParticles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.03
    });
  }

  function renderAmbientDust() {
    ambientCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
    ambientParticles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.alpha += Math.sin(Date.now() * 0.002 + p.x) * 0.01;
      if (p.alpha < 0.1) p.alpha = 0.1;
      if (p.alpha > 0.85) p.alpha = 0.85;

      if (p.y < -10) {
        p.y = ambientCanvas.height + 10;
        p.x = Math.random() * ambientCanvas.width;
      }

      ambientCtx.beginPath();
      ambientCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ambientCtx.fillStyle = `rgba(223, 177, 91, ${p.alpha})`;
      ambientCtx.shadowBlur = 8;
      ambientCtx.shadowColor = 'rgba(255, 235, 150, 0.6)';
      ambientCtx.fill();
    });
    requestAnimationFrame(renderAmbientDust);
  }
  renderAmbientDust();

  // -------------------------------------------------------------
  // 4. BIRTHDAY CRACKERS & FIREWORKS ENGINE
  // -------------------------------------------------------------
  const crackerCanvas = document.getElementById('crackerCanvas');
  const crackerCtx = crackerCanvas.getContext('2d');
  let fireworks = [];
  let sparks = [];

  function resizeCrackerCanvas() {
    crackerCanvas.width = window.innerWidth;
    crackerCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCrackerCanvas);
  resizeCrackerCanvas();

  const crackerColors = [
    '#ffd700', '#fff2a8', '#ff3366', '#ff0033', 
    '#00ffcc', '#ff9900', '#dfb15b', '#ffffff'
  ];

  class FireworkRocket {
    constructor(startX, startY, targetX, targetY) {
      this.x = startX;
      this.y = startY;
      this.targetX = targetX;
      this.targetY = targetY;
      const angle = Math.atan2(targetY - startY, targetX - startX);
      const speed = 12 + Math.random() * 4;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.color = crackerColors[Math.floor(Math.random() * crackerColors.length)];
      this.distanceToTarget = Math.hypot(targetX - startX, targetY - startY);
      this.distanceTraveled = 0;
      this.dead = false;
      this.trail = [];
    }

    update() {
      this.trail.push({ x: this.x, y: this.y, alpha: 0.8 });
      if (this.trail.length > 7) this.trail.shift();

      this.x += this.vx;
      this.y += this.vy;
      this.distanceTraveled += Math.hypot(this.vx, this.vy);

      if (this.distanceTraveled >= this.distanceToTarget || this.y <= this.targetY) {
        this.dead = true;
        explodeCracker(this.x, this.y, this.color);
        playCrackerSound();
      }
    }

    draw() {
      crackerCtx.save();
      // Draw trailing sparks
      this.trail.forEach(t => {
        crackerCtx.beginPath();
        crackerCtx.arc(t.x, t.y, 2, 0, Math.PI * 2);
        crackerCtx.fillStyle = `rgba(255, 230, 150, ${t.alpha})`;
        crackerCtx.fill();
        t.alpha -= 0.1;
      });

      crackerCtx.beginPath();
      crackerCtx.arc(this.x, this.y, 3.5, 0, Math.PI * 2);
      crackerCtx.fillStyle = this.color;
      crackerCtx.shadowBlur = 12;
      crackerCtx.shadowColor = this.color;
      crackerCtx.fill();
      crackerCtx.restore();
    }
  }

  class CrackerSpark {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.gravity = 0.09;
      this.friction = 0.96;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.size = Math.random() * 3 + 1.5;
    }

    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      crackerCtx.save();
      crackerCtx.globalAlpha = Math.max(0, this.alpha);
      crackerCtx.beginPath();
      crackerCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      crackerCtx.fillStyle = this.color;
      crackerCtx.shadowBlur = 10;
      crackerCtx.shadowColor = this.color;
      crackerCtx.fill();
      crackerCtx.restore();
    }
  }

  function explodeCracker(x, y, color) {
    const count = 65 + Math.floor(Math.random() * 35);
    for (let i = 0; i < count; i++) {
      const sparkColor = Math.random() > 0.4 ? color : crackerColors[Math.floor(Math.random() * crackerColors.length)];
      sparks.push(new CrackerSpark(x, y, sparkColor));
    }
  }

  function launchCrackerSalvo(salvoCount = 6) {
    for (let i = 0; i < salvoCount; i++) {
      setTimeout(() => {
        const startX = window.innerWidth * (0.2 + Math.random() * 0.6);
        const startY = window.innerHeight + 10;
        const targetX = window.innerWidth * (0.15 + Math.random() * 0.7);
        const targetY = window.innerHeight * (0.15 + Math.random() * 0.4);
        fireworks.push(new FireworkRocket(startX, startY, targetX, targetY));
      }, i * 350);
    }
  }

  function launchGlitterBurst(x, y) {
    for (let i = 0; i < 35; i++) {
      sparks.push(new CrackerSpark(x, y, crackerColors[Math.floor(Math.random() * crackerColors.length)]));
    }
  }

  function loopCrackers() {
    crackerCtx.clearRect(0, 0, crackerCanvas.width, crackerCanvas.height);

    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].draw();
      if (fireworks[i].dead) fireworks.splice(i, 1);
    }

    for (let j = sparks.length - 1; j >= 0; j--) {
      sparks[j].update();
      sparks[j].draw();
      if (sparks[j].alpha <= 0) sparks.splice(j, 1);
    }

    requestAnimationFrame(loopCrackers);
  }
  loopCrackers();

  // -------------------------------------------------------------
  // 5. CONFETTI CANNON ENGINE (METALLIC GOLD & RED VELVET)
  // -------------------------------------------------------------
  const confettiCanvas = document.getElementById('confettiCanvas');
  const confettiCtx = confettiCanvas.getContext('2d');
  let confettiPieces = [];

  function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeConfettiCanvas);
  resizeConfettiCanvas();

  const confettiColors = ['#ffd700', '#dfb15b', '#fff2a8', '#b31835', '#740f22', '#ffffff', '#222228'];

  class ConfettiPiece {
    constructor(x, y) {
      this.x = x || Math.random() * confettiCanvas.width;
      this.y = y || -20;
      this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      this.w = Math.random() * 12 + 6;
      this.h = Math.random() * 7 + 4;
      this.vx = (Math.random() - 0.5) * 14;
      this.vy = -(Math.random() * 12 + 8);
      this.gravity = 0.35;
      this.drag = 0.97;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 12;
      this.flip = Math.random() * Math.PI;
      this.flipSpeed = Math.random() * 0.15 + 0.05;
      this.alpha = 1;
      this.decay = Math.random() * 0.005 + 0.003;
    }

    update() {
      this.vx *= this.drag;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.flip += this.flipSpeed;
      this.alpha -= this.decay;
    }

    draw() {
      confettiCtx.save();
      confettiCtx.globalAlpha = Math.max(0, this.alpha);
      confettiCtx.translate(this.x, this.y);
      confettiCtx.rotate((this.rotation * Math.PI) / 180);
      confettiCtx.scale(1, Math.cos(this.flip));

      confettiCtx.fillStyle = this.color;
      confettiCtx.shadowBlur = 6;
      confettiCtx.shadowColor = this.color;
      confettiCtx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
      confettiCtx.restore();
    }
  }

  function burstConfetti(sourceX, sourceY, amount = 140) {
    const x = sourceX || confettiCanvas.width / 2;
    const y = sourceY || confettiCanvas.height / 2;
    for (let i = 0; i < amount; i++) {
      confettiPieces.push(new ConfettiPiece(x, y));
    }
  }

  function loopConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      confettiPieces[i].update();
      confettiPieces[i].draw();
      if (confettiPieces[i].y > confettiCanvas.height + 30 || confettiPieces[i].alpha <= 0) {
        confettiPieces.splice(i, 1);
      }
    }
    requestAnimationFrame(loopConfetti);
  }
  loopConfetti();

  // -------------------------------------------------------------
  // 6. PHOTO FRAME SWITCHER & TILT EFFECT (RIGHT SIDE)
  // -------------------------------------------------------------
  const primaryPhoto = document.getElementById('primaryPhoto');
  const reflectionImg = document.getElementById('reflectionImg');
  const switchDots = document.querySelectorAll('.switch-dot');
  const mainPhotoFrame = document.getElementById('mainPhotoFrame');

  switchDots.forEach(dot => {
    dot.addEventListener('click', () => {
      switchDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      const newSrc = dot.getAttribute('data-src');
      if (primaryPhoto && newSrc) {
        primaryPhoto.style.opacity = '0';
        setTimeout(() => {
          primaryPhoto.src = newSrc;
          if (reflectionImg) reflectionImg.src = newSrc;
          primaryPhoto.style.opacity = '1';
        }, 200);
      }
    });
  });

  // 3D Tilt Effect on Frame Hover
  if (mainPhotoFrame) {
    mainPhotoFrame.addEventListener('mousemove', (e) => {
      const rect = mainPhotoFrame.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = -(y / rect.height) * 16;
      const rotY = (x / rect.width) * 16;
      mainPhotoFrame.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    mainPhotoFrame.addEventListener('mouseleave', () => {
      mainPhotoFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // -------------------------------------------------------------
  // 7. CUTE BIRTHDAY WISH CARD
  // (Plays Birthday Song + Crackers on Open)
  // -------------------------------------------------------------
  const cardSealBtn = document.getElementById('cardSealBtn');
  const birthdayCard = document.getElementById('birthdayCard');
  const closeCardBtn = document.getElementById('closeCardBtn');
  const retriggerCrackersBtn = document.getElementById('retriggerCrackersBtn');
  const openCardQuickBtn = document.getElementById('openCardQuickBtn');

  function openBirthdayCard() {
    initAudioContext();
    if (!birthdayCard.classList.contains('opened')) {
      birthdayCard.classList.add('opened');
      
      // 1. Play Crackers Show!
      launchCrackerSalvo(8);

      // 2. Play Birthday Song!
      startBirthdaySong(true);
    }
  }

  if (cardSealBtn) {
    cardSealBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openBirthdayCard();
    });
  }

  if (openCardQuickBtn) {
    openCardQuickBtn.addEventListener('click', () => {
      const cardSec = document.getElementById('wishCardSection');
      if (cardSec) {
        cardSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(openBirthdayCard, 700);
      }
    });
  }

  if (closeCardBtn) {
    closeCardBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      birthdayCard.classList.remove('opened');
    });
  }

  if (retriggerCrackersBtn) {
    retriggerCrackersBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      launchCrackerSalvo(6);
    });
  }

  // -------------------------------------------------------------
  // 8. INTERACTIVE BIRTHDAY CAKE
  // (Knife cut + Confetti Burst + Song)
  // -------------------------------------------------------------
  const cutCakeBtn = document.getElementById('cutCakeBtn');
  const blowCandlesBtn = document.getElementById('blowCandlesBtn');
  const resetCakeBtn = document.getElementById('resetCakeBtn');
  const cutCakeQuickBtn = document.getElementById('cutCakeQuickBtn');
  const cakeBox = document.getElementById('cakeBox');
  const goldenKnife = document.getElementById('goldenKnife');
  const cakeToast = document.getElementById('cakeToast');
  const flames = [
    document.getElementById('flame1'),
    document.getElementById('flame2'),
    document.getElementById('flame3')
  ];

  let isCakeCut = false;

  function blowOutCandles() {
    flames.forEach(f => {
      if (f) f.classList.add('extinguished');
    });
  }

  function igniteCandles() {
    flames.forEach(f => {
      if (f) f.classList.remove('extinguished');
    });
  }

  function executeCakeCutting() {
    initAudioContext();
    if (isCakeCut) return;
    isCakeCut = true;

    // 1. Knife slicing animation & sound
    goldenKnife.classList.add('slicing');
    playKnifeSwoosh();

    setTimeout(() => {
      // 2. Slices separate
      cakeBox.classList.add('cut');

      // 3. Blow out candles
      blowOutCandles();

      // 4. Confetti Burst!
      const cakeRect = cakeBox.getBoundingClientRect();
      const centerX = cakeRect.left + cakeRect.width / 2;
      const centerY = cakeRect.top + cakeRect.height / 2;
      burstConfetti(centerX, centerY, 220);
      playConfettiPopSound();

      // 5. Play / Restart Happy Birthday Song
      startBirthdaySong(true);

      // 6. Show Toast
      if (cakeToast) cakeToast.classList.add('show');

      // 7. Retreat Knife
      setTimeout(() => {
        goldenKnife.classList.remove('slicing');
      }, 900);
    }, 450);
  }

  if (cutCakeBtn) cutCakeBtn.addEventListener('click', executeCakeCutting);
  if (blowCandlesBtn) blowCandlesBtn.addEventListener('click', blowOutCandles);

  if (resetCakeBtn) {
    resetCakeBtn.addEventListener('click', () => {
      isCakeCut = false;
      cakeBox.classList.remove('cut');
      goldenKnife.classList.remove('slicing');
      igniteCandles();
      if (cakeToast) cakeToast.classList.remove('show');
    });
  }

  if (cutCakeQuickBtn) {
    cutCakeQuickBtn.addEventListener('click', () => {
      const cakeSec = document.getElementById('cakeSection');
      if (cakeSec) {
        cakeSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(executeCakeCutting, 800);
      }
    });
  }

  // -------------------------------------------------------------
  // 9. GIFTS UNBOXING FLOW
  // ("you are cutest in the world dark truth", "you are loveliest")
  // -------------------------------------------------------------
  const giftBoxes = [
    document.getElementById('giftBox1'),
    document.getElementById('giftBox2'),
    document.getElementById('giftBox3')
  ];

  giftBoxes.forEach((box, index) => {
    if (!box) return;
    box.addEventListener('click', () => {
      initAudioContext();
      const isAlreadyOpened = box.classList.contains('opened');
      if (!isAlreadyOpened) {
        box.classList.add('opened');
        playChimeSound();
        const rect = box.getBoundingClientRect();
        burstConfetti(rect.left + rect.width / 2, rect.top + 50, 45);
      } else {
        box.classList.remove('opened');
      }
    });
  });

  const openGiftsQuickBtn = document.getElementById('openGiftsQuickBtn');
  if (openGiftsQuickBtn) {
    openGiftsQuickBtn.addEventListener('click', () => {
      const giftSec = document.getElementById('giftsSection');
      if (giftSec) {
        giftSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          giftBoxes.forEach(box => {
            if (box && !box.classList.contains('opened')) box.click();
          });
        }, 800);
      }
    });
  }

  // -------------------------------------------------------------
  // 10. GALLERY LIGHTBOX MODAL
  // -------------------------------------------------------------
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const fullSrc = item.getAttribute('data-full');
      const titleElem = item.querySelector('.photo-title');
      const descElem = item.querySelector('.photo-desc');

      if (fullSrc && lightboxImg) {
        lightboxImg.src = fullSrc;
        lightboxCaption.innerHTML = `<strong>${titleElem ? titleElem.textContent : ''}</strong><br><span style="font-size:0.9rem; color:#ccc;">${descElem ? descElem.textContent : ''}</span>`;
        lightboxModal.classList.add('active');
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) lightboxModal.classList.remove('active');
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});
