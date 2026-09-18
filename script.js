/* ================= GLOBAL SCROLL ANIMATION ================= */

const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});

/* ================= INTERACTIVE MAGNETIC GRID ================= */

const canvas = document.getElementById("cursorGrid");
const ctx = canvas.getContext("2d");

let mouseX = -1000;
let mouseY = -1000;

const gridSize = 45;
const effectRadius = 180;
const maxScale = 1.8;

function resizeCanvas() {
    const width = document.documentElement.clientWidth;
    const height = window.innerHeight;

    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
    );
}
//Adding Cursor effect In grid//
resizeCanvas();

window.addEventListener("resize", resizeCanvas);

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

//Cursor Axis Settings//
function drawGrid() {

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const cols = Math.ceil(window.innerWidth / gridSize) + 1;
    const rows = Math.ceil(window.innerHeight / gridSize) + 1;

    for (let row = 0; row <= rows; row++) {

        for (let col = 0; col <= cols; col++) {

            const baseX = col * gridSize;
            const baseY = row * gridSize;

            const dx = mouseX - baseX;
            const dy = mouseY - baseY;

            const distance = Math.sqrt(dx * dx + dy * dy);

            let scale = 1;

            if (distance < effectRadius) {

                const strength = 1 - distance / effectRadius;

                scale = 1 + strength * (maxScale - 1);
            }

            const x = baseX;
            const y = baseY;

            const cellSize = gridSize * scale;

            ctx.beginPath();

            ctx.strokeStyle = `rgba(80, 160, 255, ${
                0.04 + (scale - 1) * 0.12
            })`;

            ctx.lineWidth = 1;

            ctx.rect(
                x - (cellSize - gridSize) / 2,
                y - (cellSize - gridSize) / 2,
                cellSize,
                cellSize
            );

            ctx.stroke();
        }
    }

    requestAnimationFrame(drawGrid);
}
drawGrid();