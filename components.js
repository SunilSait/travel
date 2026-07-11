// ============================================================
//  WanderIndia — Shared Components
//  Domestic Tour Packages | Travel Agency
//  Navbar + Footer injected across all pages
// ============================================================

(function () {
    'use strict';

    // ---------- Configuration ----------
    const BRAND_NAME = 'WanderIndia';
    const BRAND_TAGLINE = 'Explore India. Your Way.';
    const CURRENT_YEAR = new Date().getFullYear();
    const PHONE = '+91 98765 43210';
    const EMAIL = 'hello@wanderindia.in';
    const ADDRESS = '12 Travel House, MG Road, Bangalore - 560001';

    const NAV_LINKS = [
        { label: 'Home',     href: 'index.html' },
        { label: 'Home 2',   href: 'home2.html' },
        { label: 'About',    href: 'about.html' },
        { label: 'Packages', href: 'packages.html' },
        { label: 'Services', href: 'services.html' },
        { label: 'Gallery',  href: 'gallery.html' },
        { label: 'Pricing',  href: 'pricing.html' },
        { label: 'Contact',  href: 'contact.html' },
    ];

    const SOCIAL_LINKS = [
        { icon: 'fab fa-instagram',   href: '#', label: 'Instagram' },
        { icon: 'fab fa-facebook-f',  href: '#', label: 'Facebook' },
        { icon: 'fab fa-youtube',     href: '#', label: 'YouTube' },
        { icon: 'fab fa-twitter',     href: '#', label: 'Twitter' },
    ];

    // ---------- Brand Logo SVG ----------
    const LOGO_SVG = `<svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="wGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--logo-primary)"/>
                <stop offset="100%" stop-color="var(--logo-secondary)"/>
            </linearGradient>
        </defs>
        <!-- Globe circle -->
        <circle cx="50" cy="50" r="44" stroke="url(#wGrad)" stroke-width="3" fill="none"/>
        <!-- Latitude lines -->
        <ellipse cx="50" cy="50" rx="28" ry="44" stroke="url(#wGrad)" stroke-width="1.5" fill="none" stroke-opacity="0.5"/>
        <line x1="6" y1="50" x2="94" y2="50" stroke="url(#wGrad)" stroke-width="1.5" stroke-opacity="0.4"/>
        <line x1="16" y1="30" x2="84" y2="30" stroke="url(#wGrad)" stroke-width="1" stroke-opacity="0.3"/>
        <line x1="16" y1="70" x2="84" y2="70" stroke="url(#wGrad)" stroke-width="1" stroke-opacity="0.3"/>
        <!-- Location pin -->
        <path d="M50 22 C42 22 36 28 36 36 C36 46 50 62 50 62 C50 62 64 46 64 36 C64 28 58 22 50 22Z" fill="url(#wGrad)" fill-opacity="0.85"/>
        <circle cx="50" cy="36" r="6" fill="white" fill-opacity="0.9"/>
    </svg>`;

    // ---------- Current page detection ----------
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // ---------- Render Navbar ----------
    function renderNavbar() {
        const desktopLinks = NAV_LINKS.map(link => {
            const isActive = link.href === currentPage ||
                (currentPage === '' && link.href === 'index.html') ||
                (currentPage === 'travel' && link.href === 'index.html');
            return `<li>
                <a href="${link.href}" class="nav-link${isActive ? ' active' : ''}" aria-current="${isActive ? 'page' : 'false'}">${link.label}</a>
            </li>`;
        }).join('');

        const mobileLinks = NAV_LINKS.map(link => {
            const isActive = link.href === currentPage || (currentPage === '' && link.href === 'index.html');
            return `<a href="${link.href}" class="${isActive ? 'active' : ''}">${link.label}</a>`;
        }).join('');

        const navHTML = `
        <nav id="navbar" role="navigation" aria-label="Main navigation">
            <div class="container">
                <div class="nav-inner">
                    <!-- Logo -->
                    <a href="index.html" class="nav-logo" id="nav-logo" aria-label="${BRAND_NAME} - Home">
                        ${LOGO_SVG}
                        <span class="nav-logo-text">Wander<span>India</span></span>
                    </a>

                    <!-- Desktop Links -->
                    <ul class="nav-links" role="list">
                        ${desktopLinks}
                    </ul>

                    <!-- Nav Actions -->
                    <div class="nav-actions">
                        <button class="icon-btn dark-toggle" id="nav-dark-toggle" title="Toggle Dark Mode" aria-label="Toggle dark mode">
                            <i class="fas fa-moon"></i>
                        </button>
                        <button class="icon-btn rtl-toggle" id="nav-rtl-toggle" title="Toggle RTL" aria-label="Toggle RTL direction">
                            <i class="fas fa-exchange-alt"></i>
                        </button>
                        <a href="login.html" class="btn btn-secondary btn-sm" id="nav-login">Sign In</a>
                        <a href="signup.html" class="btn btn-primary btn-sm btn-shine" id="nav-signup">Sign Up</a>
                        <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle mobile menu" aria-expanded="false">
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Mobile Menu -->
        <div class="nav-mobile" id="nav-mobile" role="navigation" aria-label="Mobile navigation">
            ${mobileLinks}
            <div class="nav-mobile-actions">
                <a href="login.html" class="btn btn-secondary" id="mobile-login">Sign In</a>
                <a href="signup.html" class="btn btn-primary btn-shine" id="mobile-signup">Sign Up</a>
            </div>
        </div>`;

        const placeholder = document.getElementById('navbar-placeholder');
        if (placeholder) {
            placeholder.outerHTML = navHTML;
        } else {
            document.body.insertAdjacentHTML('afterbegin', navHTML);
        }
    }

    // ---------- Render Footer ----------
    function renderFooter() {
        const socialHTML = SOCIAL_LINKS.map(s =>
            `<a href="${s.href}" aria-label="${s.label}"><i class="${s.icon}"></i></a>`
        ).join('');

        const footerHTML = `
        <footer id="footer" role="contentinfo">
            <div class="container">
                <div class="footer-top">
                    <!-- Brand -->
                    <div class="footer-brand">
                        <a href="index.html" class="footer-brand-logo" aria-label="${BRAND_NAME}">
                            ${LOGO_SVG}
                            <span class="footer-brand-name">Wander<span>India</span></span>
                        </a>
                        <p class="footer-desc">${BRAND_TAGLINE} — Custom domestic tour packages for every budget. Elevating every travel experience with local expertise and personalized care.</p>
                        <div class="footer-social">${socialHTML}</div>
                    </div>

                    <!-- Quick Links -->
                    <div class="footer-col">
                        <h4>Quick Links</h4>
                        <nav class="footer-links" aria-label="Quick links">
                            <a href="index.html">Home</a>
                            <a href="home2.html">Home 2 — Premium</a>
                            <a href="services.html">Services</a>
                            <a href="gallery.html">Gallery</a>
                            <a href="pricing.html">Pricing</a>
                            <a href="about.html">About Us</a>
                        </nav>
                    </div>

                    <!-- Resources -->
                    <div class="footer-col">
                        <h4>Resources</h4>
                        <nav class="footer-links" aria-label="Resources">
                            <a href="contact.html">Contact Us</a>
                            <a href="coming-soon.html">Coming Soon</a>
                            <a href="404.html">404 Page</a>
                            <a href="login.html">Sign In</a>
                        </nav>
                    </div>

                    <!-- Newsletter Card -->
                    <div class="footer-newsletter">
                        <h4>Stay Explored</h4>
                        <p>Subscribe for travel updates, exclusive package deals & curated itineraries.</p>
                        <form id="newsletter-form" onsubmit="event.preventDefault(); document.getElementById('newsletter-success').style.display='block'; document.getElementById('newsletter-form').style.display='none';">
                            <input type="email" required placeholder="your@email.com" class="form-input" style="margin-bottom: 10px; padding: 10px 14px;" />
                            <button type="submit" class="btn btn-primary btn-full btn-shine" style="padding: 10px 20px;">
                                Subscribe
                            </button>
                        </form>
                        <p id="newsletter-success" style="display:none; color:var(--success); font-size:0.75rem; margin-top:8px; text-align:center; font-weight:600;">
                            <i class="fas fa-check-circle"></i> Thank you for subscribing!
                        </p>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p style="margin:0;">&copy; ${CURRENT_YEAR} ${BRAND_NAME}. Crafted with ✦ precision.</p>
                    <div style="display:flex; gap:24px; align-items:center; flex-wrap:wrap;">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <span>${PHONE}</span>
                    </div>
                </div>
            </div>
        </footer>`;

        const placeholder = document.getElementById('footer-placeholder');
        if (placeholder) {
            placeholder.outerHTML = footerHTML;
        } else {
            document.body.insertAdjacentHTML('beforeend', footerHTML);
        }
    }

    // ---------- Init ----------
    document.addEventListener('DOMContentLoaded', function () {
        renderNavbar();
        renderFooter();
    });

})();
