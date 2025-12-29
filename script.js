/**
 * MOTOR DE MASSA GRAVITACIONAL X4
 * Transcrevendo o efeito de névoa e sucção neon.
 */
const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
let w, h, particles = [];
const dnaChars = "X4DNA77701PATRICK".split("");

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    // Milhares de partículas para criar a "névoa" da imagem
    for(let i = 0; i < 1000; i++) { 
        particles.push({
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            speed: 0.004, // Velocidade 20% controlada
            size: Math.random() * 12 + 8,
            c: dnaChars[Math.floor(Math.random() * dnaChars.length)]
        });
    }
}

function draw() {
    // Rastro persistente cria a densidade de massa vermelha
    ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
    ctx.fillRect(0, 0, w, h);

    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 2.2; // Velocidade de sucção para o buraco negro

        // Reset da partícula ao chegar no centro
        if(p.r < 40) p.r = Math.max(w, h) * 0.8;

        const x = w/2 + Math.cos(p.angle) * p.r;
        const y = h/2 + Math.sin(p.angle) * p.r;

        // Renderização Glow Neon
        ctx.fillStyle = "#ff0000";
        ctx.font = p.size + "px monospace";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#ff0000";
        ctx.fillText(p.c, x, y);

        // Cintilação de dados
        if(Math.random() > 0.99) {
            ctx.fillStyle = "#fff";
            ctx.fillText(p.c, x, y);
        }
    });

    // Horizonte de Eventos (O Buraco Negro)
    ctx.beginPath();
    ctx.arc(w/2, h/2, 60, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.shadowBlur = 60;
    ctx.shadowColor = "#ff0000";
    ctx.stroke();

    requestAnimationFrame(draw);
}

window.addEventListener("resize", init);
init();
draw();
