// ============================================================
//  WanderIndia — Global Script
//  Dark Mode | RTL | Scroll Animations | Navbar Scroll
//  Counter Animation | Mobile Menu | Misc Interactions
// ============================================================

(function () {
    'use strict';

    // ---- Dark Mode ----
    function initDarkMode() {
        const saved = localStorage.getItem('wi-dark');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (saved === 'true' || (saved === null && prefersDark)) {
            document.documentElement.classList.add('dark');
        }

        document.addEventListener('click', function (e) {
            if (e.target.closest('.dark-toggle')) {
                document.documentElement.classList.toggle('dark');
                localStorage.setItem('wi-dark', document.documentElement.classList.contains('dark'));
                updateDarkIcons();
            }
        });
        updateDarkIcons();
    }

    function updateDarkIcons() {
        const isDark = document.documentElement.classList.contains('dark');
        document.querySelectorAll('.dark-toggle i').forEach(icon => {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // ---- RTL ----
    function initRTL() {
        const saved = localStorage.getItem('wi-rtl');
        if (saved === 'true') {
            document.documentElement.setAttribute('dir', 'rtl');
        }

        document.addEventListener('click', function (e) {
            if (e.target.closest('.rtl-toggle')) {
                const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
                document.documentElement.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
                localStorage.setItem('wi-rtl', !isRTL);
            }
        });
    }

    // ---- Navbar scroll effect ----
    function initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        const handler = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 30);
        };
        window.addEventListener('scroll', handler, { passive: true });
        handler();
    }

    // ---- Mobile Menu ----
    function initMobileMenu() {
        document.addEventListener('click', function (e) {
            const hamburger = e.target.closest('#nav-hamburger');
            const mobileNav = document.getElementById('nav-mobile');
            if (!hamburger || !mobileNav) return;
            const isOpen = mobileNav.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            const mobileNav = document.getElementById('nav-mobile');
            const hamburger = document.getElementById('nav-hamburger');
            if (!mobileNav || !mobileNav.classList.contains('open')) return;
            if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
                mobileNav.classList.remove('open');
                if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
                document.body.style.overflow = '';
            }
        });

        // Close on nav link click
        document.addEventListener('click', function (e) {
            const mobileNav = document.getElementById('nav-mobile');
            const hamburger = document.getElementById('nav-hamburger');
            if (mobileNav && mobileNav.classList.contains('open') && e.target.closest('#nav-mobile a')) {
                mobileNav.classList.remove('open');
                if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
                document.body.style.overflow = '';
            }
        });
    }

    // ---- Scroll Animations ----
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }

    // ---- Counter Animation ----
    function initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = '1';
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(c => observer.observe(c));
    }

    function animateCounter(el) {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current).toLocaleString() + suffix;
            if (current >= target) clearInterval(timer);
        }, 16);
    }

    // ---- Password toggle ----
    function initPasswordToggle() {
        document.addEventListener('click', function (e) {
            const btn = e.target.closest('.toggle-password');
            if (!btn) return;
            const wrapper = btn.closest('.input-wrapper');
            const input = wrapper && wrapper.querySelector('input');
            if (!input) return;
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            const icon = btn.querySelector('i');
            if (icon) icon.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
        });
    }

    // ---- Filter Tabs ----
    function initFilterTabs() {
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', function () {
                const group = this.closest('.filter-tabs') || this.parentElement;
                group.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                const filter = this.dataset.filter;
                const targetGrid = document.querySelector(this.dataset.target || '.filterable-grid');
                if (!targetGrid) return;

                targetGrid.querySelectorAll('[data-category]').forEach(item => {
                    const match = filter === 'all' || item.dataset.category === filter;
                    item.style.display = match ? '' : 'none';
                });
            });
        });
    }

    // ---- Countdown Timer (for coming soon) ----
    function initCountdown() {
        const container = document.getElementById('countdown-container');
        if (!container) return;

        const daysEl  = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minsEl  = document.getElementById('cd-mins');
        const secsEl  = document.getElementById('cd-secs');
        if (!daysEl) return;

        const target = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000);

        function update() {
            const diff = target - new Date();
            if (diff <= 0) {
                container.innerHTML = '<p style="color:var(--secondary);font-size:1.2rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">We\'re Live! 🎉</p>';
                return;
            }
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            daysEl.textContent  = String(d).padStart(2,'0');
            hoursEl.textContent = String(h).padStart(2,'0');
            minsEl.textContent  = String(m).padStart(2,'0');
            secsEl.textContent  = String(s).padStart(2,'0');
        }
        update();
        setInterval(update, 1000);
    }

    // ---- Coming Soon form submit ----
    function initCSForm() {
        const form = document.getElementById('cs-form');
        const success = document.getElementById('cs-success');
        if (!form || !success) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            form.style.display = 'none';
            success.style.display = 'block';
        });
    }

    // ---- Smooth scroll for anchor links ----
    function initSmoothScroll() {
        document.addEventListener('click', function (e) {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // ---- Scroll to Top Button ----
    function initScrollTop() {
        const btn = document.createElement('button');
        btn.className = 'scroll-top-btn';
        btn.id = 'scroll-to-top';
        btn.setAttribute('aria-label', 'Scroll to top');
        btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(btn);

        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        toggleVisibility();

        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ---- Testimonial Carousel ----
    function initTestimonialCarousel() {
        const track = document.querySelector('.testimonial-track');
        const prevBtn = document.getElementById('testi-prev');
        const nextBtn = document.getElementById('testi-next');
        if (!track || !prevBtn || !nextBtn) return;

        let current = 0;
        const items = track.querySelectorAll('.testimonial-slide');
        const total = items.length;

        function goTo(n) {
            current = ((n % total) + total) % total;
            track.style.transform = `translateX(-${current * 100}%)`;
        }

        prevBtn.addEventListener('click', () => goTo(current - 1));
        nextBtn.addEventListener('click', () => goTo(current + 1));

        // Auto-advance
        setInterval(() => goTo(current + 1), 5000);
    }

    // ---- Package filter tabs ----
    function initPackageFilter() {
        const tabs = document.querySelectorAll('.pkg-filter-tab');
        if (!tabs.length) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                const filter = this.dataset.filter;
                document.querySelectorAll('.pkg-card-wrapper').forEach(card => {
                    const match = filter === 'all' || 
                                  card.dataset.duration === filter || 
                                  card.dataset.budget === filter;
                    card.style.display = match ? '' : 'none';
                });
            });
        });
    }

    // ---- Init all ----
    document.addEventListener('DOMContentLoaded', function () {
        initDarkMode();
        initRTL();
        // Slight delay so components.js has time to render navbar/footer
        setTimeout(() => {
            initNavbarScroll();
            initMobileMenu();
            initScrollAnimations();
            initCounters();
            initPasswordToggle();
            initFilterTabs();
            initCountdown();
            initCSForm();
            initSmoothScroll();
            initScrollTop();
            initTestimonialCarousel();
            initPackageFilter();
        }, 50);
    });

})();
