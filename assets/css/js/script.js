/**
 * Portfolio Interactive Scripts - Ahmad Paridi
 * Modern, Smooth Motion, EmailJS Integration & Micro-interactions
 */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // =========================================================================
    // 1. TYPED.JS INITIALIZATION
    // =========================================================================
    const typingElement = document.querySelector("#typing");

    if (typingElement && typeof Typed !== "undefined") {
        new Typed("#typing", {
            strings: [
                "Frontend Developer",
                "UI/UX Designer",
                "Web Developer"
            ],
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 1800,
            startDelay: 300,
            loop: true,
            smartBackspace: true
        });
    }

    // =========================================================================
    // 2. HEADER SCROLL & BACK TO TOP BUTTON
    // =========================================================================
    const header = document.querySelector("header");
    const floatingBackToTop = document.getElementById("floating-back-to-top");
    const footerBackToTop = document.getElementById("footer-back-to-top");

    function handleScrollState() {
        const scrollY = window.scrollY;

        // Sticky Header styling on scroll
        if (header) {
            if (scrollY > 40) {
                header.classList.add("header-scrolled");
            } else {
                header.classList.remove("header-scrolled");
            }
        }

        // Floating Back to Top Button visibility
        if (floatingBackToTop) {
            if (scrollY > 450) {
                floatingBackToTop.classList.add("show");
            } else {
                floatingBackToTop.classList.remove("show");
            }
        }
    }

    window.addEventListener("scroll", handleScrollState, { passive: true });
    handleScrollState(); // Initial check

    // Smooth scroll to top triggers
    function scrollToTop(e) {
        if (e) e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    if (floatingBackToTop) {
        floatingBackToTop.addEventListener("click", scrollToTop);
    }
    if (footerBackToTop) {
        footerBackToTop.addEventListener("click", scrollToTop);
    }

    // =========================================================================
    // 3. RESPONSIVE MOBILE NAVIGATION DRAWER
    // =========================================================================
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    function toggleMenu() {
        if (!hamburgerBtn || !navMenu) return;
        const isOpen = navMenu.classList.toggle("is-open");
        hamburgerBtn.classList.toggle("is-active", isOpen);
        hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");

        // Prevent body scroll when mobile menu is open
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }

    function closeMenu() {
        if (!hamburgerBtn || !navMenu) return;
        navMenu.classList.remove("is-open");
        hamburgerBtn.classList.remove("is-active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", toggleMenu);

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // Close menu on click outside
        document.addEventListener("click", function (event) {
            if (
                navMenu.classList.contains("is-open") &&
                !navMenu.contains(event.target) &&
                !hamburgerBtn.contains(event.target)
            ) {
                closeMenu();
            }
        });

        // Close on Escape key
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
                closeMenu();
            }
        });
    }

    // =========================================================================
    // 4. ACTIVE NAVIGATION LINK ON SCROLL (IntersectionObserver)
    // =========================================================================
    const trackedSections = document.querySelectorAll("section[id]");

    if ("IntersectionObserver" in window && trackedSections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -65% 0px",
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute("id");
                    navLinks.forEach(link => {
                        const href = link.getAttribute("href");
                        if (href === `#${currentId}` || href === `index.html#${currentId}`) {
                            link.classList.add("active");
                        } else if (href.startsWith("#") || href.includes("index.html#")) {
                            link.classList.remove("active");
                        }
                    });
                }
            });
        }, observerOptions);

        trackedSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // =========================================================================
    // 5. SMOOTH SCROLLING FOR ANCHORS
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();
                const headerOffset = 75;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // =========================================================================
    // 6. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
    // =========================================================================
    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    if ("IntersectionObserver" in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-revealed");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for browsers without IntersectionObserver
        revealElements.forEach(el => el.classList.add("is-revealed"));
    }

    // =========================================================================
    // 7. PROJECT DETAILS MODAL INTERACTION
    // =========================================================================
    const projectModal = document.getElementById("project-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalImage = document.getElementById("modal-image");
    const modalCategory = document.getElementById("modal-category");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalTech = document.getElementById("modal-tech");
    const modalGithub = document.getElementById("modal-github");

    // Project data dictionary for instant details popup
    const projectDetailsData = {
        moneytrack: {
            title: "💰 MoneyTrack",
            category: "Web Application",
            image: "assets/css/images/moneytrack_project.png",
            desc: "Aplikasi manajemen keuangan berbasis web komprehensif yang dirancang untuk membantu pencatatan pemasukan, pengeluaran, pemantauan saldo harian/bulanan, visualisasi grafik analitik Chart.js, serta pembuatan laporan keuangan yang terstruktur.",
            tech: ["PHP", "MySQL", "JavaScript", "Chart.js", "Bootstrap", "CSS3"],
            github: "https://github.com/faridiajadeh-dotcom"
        },
        autocare: {
            title: "🚗 AutoCare",
            category: "Mobile Application",
            image: "assets/css/images/autocare_project.png",
            desc: "Aplikasi mobile modern untuk pemesanan servis kendaraan bermotor. Memungkinkan pengguna mengelola riwayat servis, jadwal booking bengkel, pemantauan status perbaikan secara berkala, dan integrasi database terpusat.",
            tech: ["React Native", "Expo", "Node.js", "Express.js", "MySQL"],
            github: "https://github.com/faridiajadeh-dotcom"
        },
        bacaruang: {
            title: "📚 BacaRuang",
            category: "Mobile Application",
            image: "assets/css/images/bacaruang_project.jpeg",
            desc: "Aplikasi perpustakaan digital interaktif yang menyajikan kemudahan eksplorasi buku, katalog digital, ringkasan dan detail buku, rak bacaan pengguna, serta pengalaman membaca yang nyaman langsung dari smartphone.",
            tech: ["React Native", "Expo Router", "Node.js", "MySQL", "REST API"],
            github: "https://github.com/faridiajadeh-dotcom"
        },
        attendance: {
            title: "📋 Employee Attendance",
            category: "Web Application",
            image: "assets/css/images/project2.png",
            desc: "Sistem absensi karyawan digital berbasis web dengan dashboard interaktif, pengelolaan master data pegawai, tracking kehadiran, serta pembuatan rekapitulasi presensi otomatis untuk efisiensi operasional manajemen.",
            tech: ["HTML5", "CSS3", "PHP", "MySQL", "JavaScript"],
            github: "https://github.com/faridiajadeh-dotcom"
        },
        gesture: {
            title: "🤖 Hand Gesture Recognition",
            category: "Computer Vision & AI",
            image: "assets/css/images/project3.png",
            desc: "Aplikasi Computer Vision cerdas berbasis Python yang mampu mendeteksi dan mengidentifikasi gesture gerakan tangan secara real-time melalui kamera webcam menggunakan OpenCV dan MediaPipe, dilengkapi modul Text-to-Speech (TTS) untuk sintesis suara otomatis.",
            tech: ["Python", "OpenCV", "MediaPipe", "NumPy", "pyttsx3"],
            github: "https://github.com/faridiajadeh-dotcom"
        }
    };

    function openProjectModal(projectId) {
        const data = projectDetailsData[projectId];
        if (!data || !projectModal) return;

        if (modalImage) modalImage.src = data.image;
        if (modalCategory) modalCategory.textContent = data.category;
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalDesc) modalDesc.textContent = data.desc;
        if (modalGithub) modalGithub.href = data.github;

        if (modalTech) {
            modalTech.innerHTML = "";
            data.tech.forEach(t => {
                const badge = document.createElement("span");
                badge.className = "tech-badge";
                badge.textContent = t;
                modalTech.appendChild(badge);
            });
        }

        projectModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-project-trigger]").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const projectId = this.getAttribute("data-project-trigger");
            openProjectModal(projectId);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeProjectModal);
    }

    if (projectModal) {
        projectModal.addEventListener("click", function (e) {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && projectModal.classList.contains("active")) {
                closeProjectModal();
            }
        });
    }

    // =========================================================================
    // 8. CONTACT FORM - EMAILJS INTEGRATION
    // =========================================================================
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const sendButton = document.getElementById("send-btn");

    // EXACT EMAILJS CONFIGURATION (PRESERVED)
    const EMAILJS_SERVICE_ID = "service_djr0giq";
    const EMAILJS_TEMPLATE_ID = "template_yfdoe85";
    const EMAILJS_PUBLIC_KEY = "VPQtqaPTVqgPnhz63";

    if (typeof emailjs !== "undefined") {
        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });
    }

    function updateFormStatus(type, message, iconClass) {
        if (!formStatus) return;

        formStatus.className = `form-status status-${type}`;
        formStatus.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;
        formStatus.style.display = "flex";
    }

    if (contactForm && sendButton && formStatus) {
        contactForm.addEventListener("submit", async function (event) {
            // Prevent page reload / navigation
            event.preventDefault();
            event.stopPropagation();

            const nama = contactForm.elements["name"] ? contactForm.elements["name"].value.trim() : "";
            const email = contactForm.elements["email"] ? contactForm.elements["email"].value.trim() : "";
            const subject = contactForm.elements["subject"] ? contactForm.elements["subject"].value.trim() : "";
            const pesan = contactForm.elements["message"] ? contactForm.elements["message"].value.trim() : "";

            // Validation
            if (!nama || !email || !subject || !pesan) {
                updateFormStatus("error", "Mohon lengkapi seluruh kolom formulir.", "fas fa-circle-exclamation");
                return;
            }

            // Anti-spam Honeypot check
            const honeypot = contactForm.querySelector('[name="_honey"]');
            if (honeypot && honeypot.value.trim() !== "") {
                return;
            }

            // Check EmailJS availability
            if (typeof emailjs === "undefined") {
                updateFormStatus(
                    "error",
                    "Layanan EmailJS belum termuat. Silakan periksa koneksi internet Anda.",
                    "fas fa-triangle-exclamation"
                );
                return;
            }

            // UI Loading state
            sendButton.disabled = true;
            const originalButtonHtml = sendButton.innerHTML;
            sendButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>Mengirim...</span>`;
            updateFormStatus("loading", "Sedang mengirim pesan Anda...", "fas fa-spinner fa-spin");

            try {
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        from_name: nama,
                        from_email: email,
                        subject: subject,
                        message: pesan
                    }
                );

                updateFormStatus(
                    "success",
                    "Pesan berhasil dikirim! Terima kasih sudah menghubungi saya, saya akan segera merespons.",
                    "fas fa-circle-check"
                );

                contactForm.reset();

            } catch (error) {
                console.error("EmailJS Error:", error);
                updateFormStatus(
                    "error",
                    "Pesan gagal dikirim. Silakan hubungi langsung melalui email faridiajadeh@gmail.com.",
                    "fas fa-circle-xmark"
                );
            } finally {
                sendButton.disabled = false;
                sendButton.innerHTML = originalButtonHtml;
            }
        });
    }

});
