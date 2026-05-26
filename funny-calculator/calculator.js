/* =============================================
   FUNNY CALCI — calculator.js
   ============================================= */

(() => {
  "use strict";

  /* ---------- STATE ---------- */
  let expr      = "";
  let justEvaled = false;
  let soundOn    = true;

  /* ---------- DOM ---------- */
  const mainDisplay  = document.getElementById("mainDisplay");
  const exprLine     = document.getElementById("exprLine");
  const reactionBanner = document.getElementById("reactionBanner");
  const soundToggle  = document.getElementById("soundToggle");
  const mouth        = document.getElementById("mouth");
  const eyeL         = document.getElementById("eyeL");
  const eyeR         = document.getElementById("eyeR");
  const confettiCvs  = document.getElementById("confettiCanvas");
  const ctx          = confettiCvs.getContext("2d");

  const sndEqual = document.getElementById("sndEqual");
  const sndNum   = document.getElementById("sndNum");
  const sndBg    = document.getElementById("sndBg");

  /* ---------- RESIZE CANVAS ---------- */
  function resizeCanvas() {
    confettiCvs.width  = window.innerWidth;
    confettiCvs.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  /* ---------- BG PARTICLES ---------- */
  const particleContainer = document.getElementById("bgParticles");
  const COLORS = ["#ff2d78","#00f5ff","#a8ff3e","#ff8c00","#bf5fff","#ffe066"];

  function spawnParticle() {
    const el = document.createElement("div");
    el.className = "particle";
    const size = Math.random() * 6 + 3;
    el.style.cssText = `
      width: ${size}px; height: ${size}px;
      background: ${COLORS[Math.floor(Math.random()*COLORS.length)]};
      left: ${Math.random()*100}%;
      bottom: -10px;
      animation-duration: ${Math.random()*8+5}s;
      animation-delay: ${Math.random()*4}s;
      box-shadow: 0 0 ${size*2}px currentColor;
    `;
    particleContainer.appendChild(el);
    setTimeout(() => el.remove(), 13000);
  }
  setInterval(spawnParticle, 600);
  for (let i = 0; i < 10; i++) spawnParticle();

  /* ---------- SOUND ---------- */
  function playSound(audio) {
    if (!soundOn) return;
    try {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch(e) {}
  }

  // Try autoplay BG music on first interaction
  let bgStarted = false;
  function tryStartBg() {
    if (bgStarted || !soundOn) return;
    bgStarted = true;
    sndBg.volume = 0.25;
    sndBg.play().catch(() => { bgStarted = false; });
  }

  soundToggle.addEventListener("click", () => {
    soundOn = !soundOn;
    soundToggle.textContent = soundOn ? "🔊" : "🔇";
    soundToggle.classList.toggle("muted", !soundOn);
    if (soundOn) {
      tryStartBg();
    } else {
      sndBg.pause();
    }
  });

  document.addEventListener("click", tryStartBg, { once: true });

  /* ---------- DISPLAY UPDATE ---------- */
  function updateDisplay(val, isError = false) {
    mainDisplay.textContent = val;
    mainDisplay.classList.remove("pop", "error");
    void mainDisplay.offsetWidth; // reflow
    mainDisplay.classList.add(isError ? "error" : "pop");
  }

  /* ---------- FACE ---------- */
  const FACES = {
    idle:    "😐",
    num:     "🙂",
    op:      "🤔",
    equal:   "🥳",
    error:   "😵",
    zero:    "😮",
    big:     "🤩",
    neg:     "😬",
  };

  function setMouth(type) {
    mouth.textContent = FACES[type] || FACES.idle;
    mouth.style.animation = "none";
    void mouth.offsetWidth;
    mouth.style.animation = "letterBounce .4s ease";
  }

  function blinkEyes() {
    eyeL.classList.add("blink");
    eyeR.classList.add("blink");
    setTimeout(() => { eyeL.classList.remove("blink"); eyeR.classList.remove("blink"); }, 200);
  }
  setInterval(blinkEyes, 3500 + Math.random()*2000);

  /* ---------- REACTION BANNER ---------- */
  let reactionTimer = null;
  const REACTIONS = {
    big:  ["🎉 HUGE NUMBER!", "🚀 TO THE MOON!", "🤯 BIG BRAIN!", "🌟 AMAZING!"],
    zero: ["🎯 EXACTLY ZERO!", "👻 NOTHING LEFT!", "🕳️ THE VOID..."],
    neg:  ["📉 WENT NEGATIVE!", "🥶 BELOW ZERO!", "💸 IN THE RED!"],
    eq:   ["✨ CALCULATED!", "🎮 BOOM!", "🍭 SWEET!"],
    err:  ["💥 OOPSIE!", "🤖 DOES NOT COMPUTE", "🙈 THAT'S NOT MATH"],
  };

  function showReaction(type) {
    const arr = REACTIONS[type];
    const msg = arr[Math.floor(Math.random()*arr.length)];
    const col = { big:"#a8ff3e", zero:"#00f5ff", neg:"#ff8c00", eq:"#ff2d78", err:"#ff2d78" }[type];
    reactionBanner.textContent = msg;
    reactionBanner.style.color = col;
    reactionBanner.classList.remove("show");
    void reactionBanner.offsetWidth;
    reactionBanner.classList.add("show");
    clearTimeout(reactionTimer);
    reactionTimer = setTimeout(() => reactionBanner.classList.remove("show"), 2500);
  }

  /* ---------- CONFETTI ---------- */
  let confettiPieces = [];
  let confettiRunning = false;

  function launchConfetti() {
    resizeCanvas();
    const count = 90;
    confettiPieces = [];
    for (let i = 0; i < count; i++) {
      confettiPieces.push({
        x: confettiCvs.width / 2,
        y: confettiCvs.height / 2,
        vx: (Math.random() - .5) * 18,
        vy: (Math.random() - 1.5) * 14,
        color: COLORS[Math.floor(Math.random()*COLORS.length)],
        size: Math.random()*7+4,
        angle: Math.random()*360,
        spin: (Math.random()-.5)*8,
        life: 1,
        decay: Math.random()*.015+.008,
        shape: Math.random() > .5 ? "rect" : "circle",
      });
    }
    if (!confettiRunning) { confettiRunning = true; animConfetti(); }
  }

  function animConfetti() {
    ctx.clearRect(0, 0, confettiCvs.width, confettiCvs.height);
    confettiPieces = confettiPieces.filter(p => p.life > 0);
    if (!confettiPieces.length) { confettiRunning = false; return; }
    confettiPieces.forEach(p => {
      p.x  += p.vx; p.y += p.vy; p.vy += .45; p.vx *= .98;
      p.angle += p.spin; p.life -= p.decay;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle * Math.PI/180);
      if (p.shape === "rect") ctx.fillRect(-p.size/2, -p.size/4, p.size, p.size/2);
      else { ctx.beginPath(); ctx.arc(0,0,p.size/2,0,Math.PI*2); ctx.fill(); }
      ctx.restore();
    });
    requestAnimationFrame(animConfetti);
  }

  /* ---------- RIPPLE ---------- */
  function addRipple(btn, e) {
    const rect = btn.getBoundingClientRect();
    const r = document.createElement("span");
    r.className = "ripple";
    const d = Math.max(rect.width, rect.height);
    const x = (e.clientX || rect.left + rect.width/2) - rect.left - d/2;
    const y = (e.clientY || rect.top  + rect.height/2) - rect.top  - d/2;
    r.style.cssText = `width:${d}px;height:${d}px;left:${x}px;top:${y}px;`;
    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
  }

  /* ---------- CORE LOGIC ---------- */
  function safeEval(str) {
    // Only allow safe math characters
    if (!/^[0-9+\-*/.()%\s]+$/.test(str)) throw new Error("Invalid");
    // eslint-disable-next-line no-new-func
    return Function('"use strict"; return (' + str + ')')();
  }

  function handleButton(val, btn, e) {
    tryStartBg();
    addRipple(btn, e);

    if (val === "AC") {
      expr = "";
      justEvaled = false;
      updateDisplay("0");
      exprLine.textContent = "";
      setMouth("idle");
      return;
    }

    if (val === "DEL") {
      if (justEvaled) { expr = ""; justEvaled = false; }
      expr = expr.slice(0, -1);
      updateDisplay(expr || "0");
      exprLine.textContent = "";
      setMouth("num");
      playSound(sndNum);
      return;
    }

    if (val === "=") {
      if (!expr) return;
      const displayExpr = expr.replace(/\*/g, "×").replace(/\//g, "÷");
      exprLine.textContent = displayExpr + " =";
      try {
        let result = safeEval(expr);
        if (!isFinite(result)) throw new Error("Infinity");
        result = parseFloat(result.toFixed(10));
        expr = String(result);
        justEvaled = true;
        updateDisplay(expr);
        playSound(sndEqual);

        // Face & reactions
        if (Math.abs(result) > 999999)      { setMouth("big");  showReaction("big");  launchConfetti(); }
        else if (result === 0)               { setMouth("zero"); showReaction("zero"); }
        else if (result < 0)                 { setMouth("neg");  showReaction("neg");  }
        else                                 { setMouth("equal"); showReaction("eq"); launchConfetti(); }
      } catch {
        updateDisplay("ERROR", true);
        exprLine.textContent = "";
        expr = "";
        justEvaled = false;
        setMouth("error");
        showReaction("err");
      }
      return;
    }

    if (val === "+/-") {
      if (!expr) return;
      try {
        const current = safeEval(expr);
        expr = String(-current);
        justEvaled = false;
        updateDisplay(expr);
        setMouth("neg");
        playSound(sndNum);
      } catch {}
      return;
    }

    if (val === "%") {
      if (!expr) return;
      try {
        const current = safeEval(expr);
        expr = String(current / 100);
        justEvaled = false;
        updateDisplay(expr);
        playSound(sndNum);
      } catch {}
      return;
    }

    // Numbers, operators, dot
    const isOperator = ["+","-","*","/"].includes(val);

    if (justEvaled && !isOperator) {
      // Start fresh after eval if typing a number
      expr = "";
      justEvaled = false;
    } else {
      justEvaled = false;
    }

    // Prevent double operators
    if (isOperator && expr) {
      const last = expr.slice(-1);
      if (["+","-","*","/"].includes(last)) {
        expr = expr.slice(0,-1);
      }
    }

    // Prevent leading dot
    if (val === "." && (!expr || ["+","-","*","/"].includes(expr.slice(-1)))) {
      expr += "0";
    }

    expr += val;
    const prettyExpr = expr.replace(/\*/g, "×").replace(/\//g, "÷");
    updateDisplay(prettyExpr);
    exprLine.textContent = "";

    playSound(sndNum);
    setMouth(isOperator ? "op" : "num");
  }

  /* ---------- BUTTON EVENTS ---------- */
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const val = btn.dataset.val;
      if (val) handleButton(val, btn, e);
    });
  });

  /* ---------- KEYBOARD SUPPORT ---------- */
  document.addEventListener("keydown", (e) => {
    const map = {
      "0":"0","1":"1","2":"2","3":"3","4":"4",
      "5":"5","6":"6","7":"7","8":"8","9":"9",
      "+":"+","-":"-","*":"*","/":"/",".":".",
      "Enter":"=","=":"=","Backspace":"DEL","Escape":"AC","%":"%",
    };
    const val = map[e.key];
    if (val) {
      e.preventDefault();
      // Find matching button for ripple
      const btn = document.querySelector(`.btn[data-val="${val}"]`);
      if (btn) { btn.classList.add("active-key"); setTimeout(() => btn.classList.remove("active-key"), 150); }
      handleButton(val, btn || document.querySelector(".btn"), { clientX: null });
    }
  });

  /* ---------- INITIAL STATE ---------- */
  setMouth("idle");

})();
