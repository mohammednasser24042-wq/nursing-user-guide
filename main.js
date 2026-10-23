/* ==========================================================================
   Apexora Nursing Guide - Main JavaScript (Interactive & Live Features)
   Designed & Developed by: Mohamed Abdel Nasser Abdel Moneim
   ========================================================================== */

// 1. Force Page to Open at Top & Clean Hash URL immediately
if (window.location.hash) {
    history.replaceState("", document.title, window.location.pathname + window.location.search);
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {

    // Extra Guarantee Scroll to Top on Load
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);

    // 2. Scroll Progress Bar Update
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }
    });

    // 3. Back to Top Button Control
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Lightbox Modal Functions
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.lightbox-close');

    window.openLightbox = function(src) {
        if (modal && modalImg) {
            modal.style.display = 'flex';
            modalImg.src = src;
        }
    };

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Close Modal on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });

    // 5. Dynamic Scroll Reveal Animations (جعل عناصر الصفحة تحيى وتتحرك مع التصفح)
    const observerOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // تشغيل حركة الظهور مرة واحدة بسلاسة
            }
        });
    }, observerOptions);

    // تطبيق الأنيميشن على كروت الخطوات وكارت فلسفة النظام
    const targetCards = document.querySelectorAll('.step-card, .system-philosophy-card');
    targetCards.forEach(card => {
        card.classList.add('reveal-init');
        revealObserver.observe(card);
    });
});
