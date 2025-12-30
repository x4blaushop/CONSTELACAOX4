const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
const audio = document.getElementById("blackHoleSound");
let w, h, particles = [];
const dnaChars = "GOLD-X4-SOVEREIGN-777".split("");

// Ativação do Som Soberano no primeiro contato
document.addEventListener('click', () => {
    audio.play();
    audio.volume = 0.6; 
}, { once: true });

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    for(let i = 0; i < 1300; i++) { 
        particles.push({
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            speed: 0.00575, // Acelerado +15% (0.005 * 1.15)
            size: Math.random() * 14 + 10,
            c: dnaChars[Math.floor(Math.random() * dnaChars.length)]
        });
    }
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, w, h);

    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 3.22; // Sucção acelerada +15% (2.8 * 1.15)

        if(p.r < 40) p.r = Math.max(w, h) * 0.8;

        const x = w/2 + Math.cos(p.angle) * p.r;
        const y = h/2 + Math.sin(p.angle) * p.r;

        ctx.fillStyle = "#FFD700";
        ctx.font = "bold " + p.size + "px monospace";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#FFD700";
        ctx.fillText(p.c, x, y);

        if(Math.random() > 0.98) {
            ctx.fillStyle = "#fff";
            ctx.fillText(p.c, x, y);
        }
    });

    // O Vácuo Central Soberano
    ctx.beginPath();
    ctx.arc(w/2, h/2, 60, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.shadowBlur = 100;
    ctx.shadowColor = "#FFD700";
    ctx.stroke();

    requestAnimationFrame(draw);
}

window.addEventListener("resize", init);
init(); draw();
