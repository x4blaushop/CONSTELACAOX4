const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
const audio = document.getElementById("blackHoleSound");
let w, h, particles = [];
const dnaChars = "GOLD-X4-SOVEREIGN-777".split("");

document.addEventListener('click', () => {
    audio.play();
    audio.volume = 0.6; 
}, { once: true });

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    
    // DENSIDADE INTELIGENTE: 1300 no PC, 500 no Celular (Fluidez Total)
    const isMobile = w < 768;
    const count = isMobile ? 500 : 1300;

    for(let i = 0; i < count; i++) { 
        particles.push({
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            speed: 0.00575, 
            size: Math.random() * (isMobile ? 8 : 14) + 8,
            c: dnaChars[Math.floor(Math.random() * dnaChars.length)]
        });
    }
}

function draw() {
    // Reduzi levemente o rastro para evitar "ghosting" pesado no mobile
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, w, h);

    const isMobile = w < 768;

    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 3.22; 

        if(p.r < 40) p.r = Math.max(w, h) * 0.8;

        const x = w/2 + Math.cos(p.angle) * p.r;
        const y = h/2 + Math.sin(p.angle) * p.r;

        ctx.fillStyle = "#FFD700";
        ctx.font = "bold " + p.size + "px monospace";
        
        // OTIMIZAÇÃO: ShadowBlur reduzido no Mobile para manter 60 FPS
        ctx.shadowBlur = isMobile ? 8 : 20;
        ctx.shadowColor = "#FFD700";
        
        ctx.fillText(p.c, x, y);

        if(Math.random() > 0.98) {
            ctx.fillStyle = "#fff";
            ctx.fillText(p.c, x, y);
        }
    });

    ctx.beginPath();
    ctx.arc(w/2, h/2, 60, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.shadowBlur = isMobile ? 40 : 100;
    ctx.shadowColor = "#FFD700";
    ctx.strokeStyle = "#FFD700";
    ctx.stroke();

    requestAnimationFrame(draw);
}

window.addEventListener("resize", init);
init(); draw();
