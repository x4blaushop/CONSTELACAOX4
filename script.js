const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
let w, h, particles = [];
const dnaChars = "GOLD-X4-SOVEREIGN-777".split("");

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    for(let i = 0; i < 1300; i++) { 
        particles.push({
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            speed: 0.005, 
            size: Math.random() * 14 + 10,
            c: dnaChars[Math.floor(Math.random() * dnaChars.length)]
        });
    }
}

function draw() {
    // Acúmulo de rastro cria a "névoa de ouro"
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, w, h);

    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 2.8; 

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

    // O Vácuo Central (Buraco Negro Soberano)
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
