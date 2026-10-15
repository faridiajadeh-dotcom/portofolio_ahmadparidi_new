
document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // 1. ANIMASI TEKS TYPED.JS
    // ========================================
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
            backDelay: 1500,
            loop: true
        });
    }

    // ========================================
    // 2. SMOOTH SCROLL NAVIGASI
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // ========================================
    // 3. CONTACT FORM - EMAILJS
    // ========================================
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const sendButton = document.getElementById("send-btn");

    // Ganti dengan ID EmailJS milikmu
    const EMAILJS_SERVICE_ID = "service_djr0giq";
    const EMAILJS_TEMPLATE_ID = "template_yfdoe85";
    const EMAILJS_PUBLIC_KEY = "VPQtqaPTVqgPnhz63";
    
emailjs.init({
    publicKey: "VPQtqaPTVqgPnhz63"
});


    function tampilkanStatus(teks, warna) {
        if (!formStatus) return;

        formStatus.textContent = teks;
        formStatus.style.color = warna;
        formStatus.style.display = "block";
    }

    if (contactForm && sendButton && formStatus) {

        contactForm.addEventListener("submit", async function (event) {
            // Mencegah form berpindah halaman atau reload
            event.preventDefault();
            event.stopPropagation();

            console.log("FORM CONTACT BERHASIL DIKLIK");

            console.log("EmailJS tersedia:", typeof emailjs !== "undefined");

            const formStatus = document.getElementById("form-status");
            formStatus.textContent = "Tombol diklik, sedang memeriksa pengiriman...";
            formStatus.style.display = "block";
            formStatus.style.color = "#dc2626";

            const nama = contactForm.elements["name"].value.trim();
            const email = contactForm.elements["email"].value.trim();
            const subject = contactForm.elements["subject"].value.trim();
            const pesan = contactForm.elements["message"].value.trim();

            if (!nama || !email || !subject || !pesan) {
                tampilkanStatus(
                    "Mohon lengkapi semua kolom.",
                    "#dc2626"
                );
                return;
            }

            // Pastikan library EmailJS tersedia
            if (typeof emailjs === "undefined") {
                tampilkanStatus(
                    "EmailJS belum termuat. Periksa script pada index.html.",
                    "#dc2626"
                );
                console.error("Library EmailJS tidak ditemukan.");
                return;
            }

            const honeypot = contactForm.querySelector('[name="_honey"]');

            if (honeypot && honeypot.value.trim() !== "") {
                return;
            }

            sendButton.disabled = true;
            sendButton.textContent = "Mengirim...";
            tampilkanStatus(
                "Sedang mengirim pesan...",
                "#64748b"
            );

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

                tampilkanStatus(
                    "✓ Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.",
                    "#16a34a"
                );

                contactForm.reset();

            } catch (error) {
                console.error("EmailJS error:", error);

                tampilkanStatus(
                    "✕ Pesan gagal dikirim. Periksa konfigurasi EmailJS dan Console browser.",
                    "#dc2626"
                );

            } finally {
                sendButton.disabled = false;
                sendButton.textContent = "Send Message";
            }
        });
    }

});
