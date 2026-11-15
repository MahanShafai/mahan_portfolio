
document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // 1. Loading Screen
    // =========================

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 400);
    });

    // جلوگیری از گیر کردن صفحه Loading
    setTimeout(() => {
        loader.classList.add("hide");
    }, 3500);


    // =========================
    // 2. Typing Animation
    // =========================

    const typingElement = document.getElementById("typingText");

    const words = [
        "برنامه‌نویس وب",
        "طراح وب",
        "علاقه‌مند به فناوری",
        "توسعه‌دهنده خلاق"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typingElement) return;

        const currentWord = words[wordIndex];

        if (!deleting) {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }

        } else {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 45 : 100);
    }

    typeEffect();


    // =========================
    // 3. Dark / Light Theme
    // =========================

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle.querySelector("i");

    const savedTheme = localStorage.getItem("mahan-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeIcon.className = "fas fa-moon";
    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight = document.body.classList.contains("light-theme");

        themeIcon.className = isLight
            ? "fas fa-moon"
            : "fas fa-sun";

        localStorage.setItem(
            "mahan-theme",
            isLight ? "light" : "dark"
        );
    });


    // =========================
    // 4. Mobile Navigation
    // =========================

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    const menuIcon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("open");

        menuIcon.className = navbar.classList.contains("open")
            ? "fas fa-times"
            : "fas fa-bars";
    });

    document.querySelectorAll(".navbar a").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("open");
            menuIcon.className = "fas fa-bars";

        });

    });

    document.addEventListener("click", (event) => {

        if (
            !navbar.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            navbar.classList.remove("open");
            menuIcon.className = "fas fa-bars";
        }

    });


    // =========================
    // 5. 3D Project Cards
    // =========================

    const tiltCards = document.querySelectorAll(".tilt-card");

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (canHover) {

        tiltCards.forEach(card => {

            card.addEventListener("mousemove", (event) => {

                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -7;
                const rotateY = ((x - centerX) / centerX) * 7;

                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                `;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform = `
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                `;

            });

        });

    }


    // =========================
    // 6. Animated Skills
    // =========================

    const skillFills = document.querySelectorAll(".skill-fill");

    const skillObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const fill = entry.target;
                const width = fill.dataset.width;

                fill.style.width = width;

                observer.unobserve(fill);
            }

        });

    }, {
        threshold: 0.4
    });

    skillFills.forEach(fill => {
        skillObserver.observe(fill);
    });


    // =========================
    // 7. Scroll Reveal
    // =========================

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // =========================
    // 8. Particle Background
    // =========================

    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");

    let particles = [];
    let width = 0;
    let height = 0;

    const mouse = {
        x: null,
        y: null,
        radius: 120
    };

    function resizeCanvas() {

        const ratio = Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * ratio;
        canvas.height = height * ratio;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        createParticles();
    }

    class Particle {

        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;

            this.size = Math.random() * 2 + 0.5;

            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = (Math.random() - 0.5) * 0.6;

            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > width) {
                this.speedX *= -1;
            }

            if (this.y < 0 || this.y > height) {
                this.speedY *= -1;
            }

            if (mouse.x !== null && mouse.y !== null) {

                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius && distance > 0) {

                    const force = (mouse.radius - distance) / mouse.radius;

                    this.x += (dx / distance) * force * 2;
                    this.y += (dy / distance) * force * 2;
                }
            }

        }

        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = `rgba(0, 190, 255, ${this.opacity})`;

            ctx.shadowBlur = 8;
            ctx.shadowColor = "#168cff";

            ctx.fill();

            ctx.shadowBlur = 0;
        }

    }

    function createParticles() {

        particles = [];

        const count = Math.min(
            90,
            Math.max(25, Math.floor(width * height / 14000))
        );

        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }

    }

    function connectParticles() {

        for (let i = 0; i < particles.length; i++) {

            for (let j = i + 1; j < particles.length; j++) {

                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 115) {

                    const opacity = 1 - distance / 115;

                    ctx.beginPath();

                    ctx.strokeStyle = `rgba(0, 160, 255, ${opacity * 0.13})`;

                    ctx.lineWidth = 0.7;

                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);

                    ctx.stroke();
                }

            }

        }

    }

    function animateParticles() {

        ctx.clearRect(0, 0, width, height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();

        requestAnimationFrame(animateParticles);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        canvas.style.display = "none";
    } else {
        resizeCanvas();
        animateParticles();

        window.addEventListener("resize", resizeCanvas);
    }

    window.addEventListener("mousemove", event => {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

    });

    window.addEventListener("mouseout", event => {

        if (!event.relatedTarget) {
            mouse.x = null;
            mouse.y = null;
        }

    });

    window.addEventListener("touchstart", () => {
        mouse.x = null;
        mouse.y = null;
    }, { passive: true });


    // =========================
    // 9. Scroll Progress
    // =========================

    const scrollProgress = document.getElementById("scrollProgress");
    const backToTop = document.getElementById("backToTop");

    function handleScroll() {

        const scrollTop = window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

        scrollProgress.style.width = progress + "%";

        if (scrollTop > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // =========================
    // 10. Automatic Footer Year
    // =========================

    document.getElementById("year").textContent =
        new Date().getFullYear();


    // =========================
    // 11. Active Navigation
    // =========================

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".navbar a");

    const activeObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );

                });

            }

        });

    }, {
        rootMargin: "-30% 0px -60% 0px"
    });

    sections.forEach(section => {
        activeObserver.observe(section);
    });

});

emailjs.init({
    publicKey: "Rp3Y6mZumc_4g63PI"
});

const emailForm = document.getElementById("emailForm");
const emailStatus = document.getElementById("emailStatus");
const emailSubmitBtn = document.getElementById("emailSubmitBtn");

if (emailForm && emailSubmitBtn && emailStatus) {
    emailForm.addEventListener("submit", function(event) {
        event.preventDefault();

        emailSubmitBtn.disabled = true;
        emailSubmitBtn.innerHTML = "در حال ارسال...";

        emailjs.sendForm(
            "service_dfqtdnd",
            "template_avpqky9",
            emailForm
        )
        .then(function() {
            emailStatus.textContent = "پیام با موفقیت ارسال شد!";
            emailStatus.className = "email-status success";
            emailForm.reset();
        })
        .catch(function(error) {
            console.error(error);
            emailStatus.textContent = "ارسال پیام ناموفق بود!";
            emailStatus.className = "email-status error";
        })
        .finally(function() {
            emailSubmitBtn.disabled = false;
            emailSubmitBtn.innerHTML = `
                <span>ارسال پیام</span>
                <i class="fas fa-paper-plane"></i>
            `;
        });
    });
}