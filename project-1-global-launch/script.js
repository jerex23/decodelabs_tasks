/**
 * JEREMIAH AJALA PORTFOLIO - INTERACTIVE CONTROLLER
 * Features: Cyber particle canvas background, hero terminal typing,
 * scroll animations, active nav highlighting, modal project viewer,
 * contact form handling & clipboard utility.
 */

document.addEventListener('DOMContentLoaded', () => {
    initCyberCanvas();
    initTerminalTyping();
    initNavigation();
    initScrollReveal();
    initProjectFilters();
    initProjectModals();
    initContactForm();
    initCopyButtons();
});

/* ==========================================================================
   1. CYBER CANVAS NETWORK ANIMATION
   ========================================================================== */
function initCyberCanvas() {
    const canvas = document.getElementById('cyber-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 65);

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 1.8 + 1;
            this.color = Math.random() > 0.4 ? 'rgba(6, 182, 212, ' : 'rgba(16, 185, 129, ';
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.alpha + ')';
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(6, 182, 212, 0.5)';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const opacity = (1 - dist / 130) * 0.18;
                    ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   2. HERO TERMINAL TYPING EFFECT
   ========================================================================== */
function initTerminalTyping() {
    const cmdElement = document.getElementById('typing-cmd');
    if (!cmdElement) return;

    const commands = [
        "nmap -sV -T4 192.168.1.0/24",
        "python threatvision_sniffer.py --interface eth0",
        "burpsuite --project-file audit_web.pbr",
        "pytest test_malware_classifier.py --verbose",
        "metasploit -q -x 'use exploit/multi/handler'"
    ];

    let cmdIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function type() {
        const currentCmd = commands[cmdIdx];

        if (isDeleting) {
            cmdElement.textContent = currentCmd.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 35;
        } else {
            cmdElement.textContent = currentCmd.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIdx === currentCmd.length) {
            typingSpeed = 2500; // Pause at full line
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            cmdIdx = (cmdIdx + 1) % commands.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   3. NAVIGATION CONTROLLER
   ========================================================================== */
function initNavigation() {
    const header = document.getElementById('main-header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileClose = document.getElementById('mobile-close');
    const mobileDrawer = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky header shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile drawer toggle
    function openMenu() {
        mobileDrawer.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileDrawer.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Highlight active link based on scroll position
    const sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
}

/* ==========================================================================
   4. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. PROJECT CATEGORY FILTERS
   ========================================================================== */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = '';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   6. PROJECT MODAL POPUPS
   ========================================================================== */
const projectData = {
    threatvision: {
        title: "ThreatVision",
        tagline: "AI-Powered Network Intrusion & Malware Detection System",
        category: "Flagship AI & Cybersecurity Project",
        tech: ["Python", "FastAPI", "Scapy", "Hugging Face", "Supabase", "React", "TypeScript", "Tailwind CSS", "Docker"],
        description: `
            <p><strong>ThreatVision</strong> is an advanced, intelligent network monitoring and threat classification platform designed to protect organizational infrastructure against covert malware, port scans, DDoS floods, and unauthorized data exfiltration.</p>
            <h4 style="margin: 1rem 0 0.5rem 0; color: var(--cyan-light);">Key Technical Architecture & Capabilities:</h4>
            <ul style="padding-left: 1.2rem; margin-bottom: 1rem; color: #D1D5DB;">
                <li><strong>Live Packet Inspection Engine:</strong> Utilizes Python's <code>Scapy</code> library to capture raw network frames, parse TCP/UDP headers, and extract flow characteristics in real time.</li>
                <li><strong>AI / ML Threat Classifier:</strong> Integrates Hugging Face transformer models & custom neural networks to analyze packet payload entropy and identify zero-day intrusion patterns.</li>
                <li><strong>Async REST API:</strong> Powered by <code>FastAPI</code> with asynchronous endpoint processing for high-throughput sniffer ingestion without dropping packets.</li>
                <li><strong>Cloud Data Persistence:</strong> <code>Supabase</code> PostgreSQL backend for real-time security incident alerts, threat severity logging, and user access control.</li>
                <li><strong>Interactive Dashboard:</strong> React & TypeScript frontend providing SOC analysts with live telemetry charts, threat maps, and instant alert notifications.</li>
            </ul>
        `
    },
    portscanner: {
        title: "Port Scanner Web Application",
        tagline: "Network Security and Port Scanning Tool",
        category: "Network Security Tooling",
        tech: ["Python", "Flask", "Scapy", "HTML", "CSS", "JavaScript"],
        description: `
            <p>A web-based cybersecurity audit utility engineered for ethical hackers and network administrators to identify open ports, active services, and protocol vulnerabilities on target domain names or IP ranges.</p>
            <h4 style="margin: 1rem 0 0.5rem 0; color: var(--cyan-light);">Key Features:</h4>
            <ul style="padding-left: 1.2rem; margin-bottom: 1rem; color: #D1D5DB;">
                <li>Multi-threaded port scanning algorithms for rapid target evaluation.</li>
                <li>Banner grabbing capability to detect service versions (HTTP, SSH, FTP, SMTP, MySQL).</li>
                <li>Customizable scan ranges (Top 100 common ports vs full 65535 range).</li>
                <li>Clean web dashboard reporting security exposure levels and remediation tips.</li>
            </ul>
        `
    },
    sjhaven: {
        title: "SJHaven",
        tagline: "Modern E-Commerce Platform",
        category: "Full-Stack Web Development",
        tech: ["React", "Supabase", "JavaScript", "HTML5", "CSS3"],
        description: `
            <p><strong>SJHaven</strong> is a feature-rich e-commerce web application engineered for frictionless digital shopping, featuring real-time product catalogs, user authentication, and shopping cart persistence.</p>
            <h4 style="margin: 1rem 0 0.5rem 0; color: var(--cyan-light);">Key Highlights:</h4>
            <ul style="padding-left: 1.2rem; margin-bottom: 1rem; color: #D1D5DB;">
                <li>Responsive React UI with smooth product search, dynamic filtering, and category navigation.</li>
                <li>Supabase integration for secure user signup/login, session management, and database relations.</li>
                <li>Stateful shopping cart management with instant price calculation and order breakdown.</li>
            </ul>
        `
    },
    webcrawler: {
        title: "Web Crawler",
        tagline: "Automated Web Data Collection Tool",
        category: "Automation & Data Mining",
        tech: ["Python", "Scrapy"],
        description: `
            <p>An automated, multi-threaded web scraper built with Python and <strong>Scrapy</strong> to systematically crawl complex website architectures and extract structured datasets for threat intelligence and security research.</p>
            <h4 style="margin: 1rem 0 0.5rem 0; color: var(--cyan-light);">Features & Capabilities:</h4>
            <ul style="padding-left: 1.2rem; margin-bottom: 1rem; color: #D1D5DB;">
                <li>Automated link discovery and DOM parsing with customizable crawl depth controls.</li>
                <li>Handles rate limiting, user-agent rotation, and robot.txt compliance.</li>
                <li>Exports parsed datasets into JSON, CSV, or direct database feeds.</li>
            </ul>
        `
    }
};

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const openBtns = document.querySelectorAll('.open-modal-btn');

    if (!modal || !modalBody) return;

    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        const techBadgesHtml = data.tech.map(t => `<span class="tech-badge">${t}</span>`).join(' ');

        modalBody.innerHTML = `
            <span class="project-category" style="color: var(--cyan-light); font-weight:700;">${data.category}</span>
            <h2 style="font-size: 1.8rem; margin: 0.2rem 0 0.5rem 0;">${data.title}</h2>
            <h3 style="font-size: 1rem; color: var(--text-muted); margin-bottom: 1.2rem;">${data.tagline}</h3>
            
            <div style="margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${techBadgesHtml}
            </div>

            <div style="line-height: 1.6; font-size: 0.95rem;">
                ${data.description}
            </div>

            <div style="margin-top: 2rem; display: flex; gap: 1rem;">
                <a href="https://github.com/jerex23" target="_blank" class="btn btn-primary btn-sm">
                    <i class="fa-brands fa-github"></i> Visit GitHub Repo
                </a>
                <button class="btn btn-secondary btn-sm" onclick="closeProjectModal()">
                    Close Window
                </button>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.closeProjectModal = function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pid = btn.getAttribute('data-project');
            openModal(pid);
        });
    });

    if (modalClose) modalClose.addEventListener('click', window.closeProjectModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) window.closeProjectModal();
    });
}

/* ==========================================================================
   7. CONTACT FORM HANDLING
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const messageInput = document.getElementById('form-message');

        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            showToast("Please fill out all required fields.", "error");
            return;
        }

        if (!validateEmail(emailInput.value.trim())) {
            showToast("Please enter a valid email address.", "error");
            return;
        }

        // Simulate form submission success
        showToast("Thank you, " + nameInput.value.trim() + "! Your message has been received.", "success");
        form.reset();
    });
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ==========================================================================
   8. COPY TO CLIPBOARD UTILITY & TOAST NOTIFICATION
   ========================================================================== */
function initCopyButtons() {
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (navigator.clipboard && textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied "${textToCopy}" to clipboard!`, "success");
                }).catch(() => {
                    fallbackCopyTextToClipboard(textToCopy);
                });
            } else if (textToCopy) {
                fallbackCopyTextToClipboard(textToCopy);
            }
        });
    });
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showToast(`Copied "${text}" to clipboard!`, "success");
    } catch (err) {
        showToast("Failed to copy text.", "error");
    }
    document.body.removeChild(textArea);
}

function showToast(msg, type = "success") {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;

    if (type === "error") {
        toastIcon.className = "fa-solid fa-triangle-exclamation";
        toastIcon.style.color = "#EF4444";
        toast.style.borderColor = "#EF4444";
    } else {
        toastIcon.className = "fa-solid fa-circle-check";
        toastIcon.style.color = "var(--emerald-primary)";
        toast.style.borderColor = "var(--emerald-primary)";
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}
