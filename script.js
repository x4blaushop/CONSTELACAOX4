const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
let w, h, particles = [];
const chars = "010101X4DNA777".split("");

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    for(let i = 0; i < 800; i++) { // Densidade extrema para efeito névoa
        particles.push({
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            speed: 0.003 + Math.random() * 0.003, // Velocidade 20%
            size: Math.random() * 14 + 10,
            c: chars[Math.floor(Math.random() * chars.length)]
        });
    }
}

function draw() {
    // Fundo com baixa opacidade acumula o rastro (Cria a "Massa" da imagem)
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, w, h);

    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 2; // Sucção para o vácuo

        if(p.r < 40) p.r = Math.max(w, h) * 0.8;

        const x = w/2 + Math.cos(p.angle) * p.r;
        const y = h/2 + Math.sin(p.angle) * p.r;

        // Efeito Glow Neon em cada letra
        ctx.fillStyle = "#ff0000";
        ctx.font = p.size + "px monospace";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff0000";
        ctx.fillText(p.c, x, y);

        // Cintilação aleatória
        if(Math.random() > 0.98) {
            ctx.fillStyle = "#fff";
            ctx.fillText(p.c, x, y);
        }
    });

    // O Centro do Buraco Negro (O Vácuo)
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
