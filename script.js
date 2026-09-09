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