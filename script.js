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
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

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