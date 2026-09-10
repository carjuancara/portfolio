const DATA_URL = 'data.json';

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function safeHref(href = '#') {
    const value = String(href).trim();
    if (value.startsWith('#') || value.startsWith('mailto:') || value.startsWith('https://') || value.startsWith('http://')) {
        return value;
    }

    return '#';
}

function safeSrc(src = '') {
    return escapeHtml(String(src).trim());
}

function renderNav(navItems = []) {
    const nav = document.querySelector('#nav');
    nav.innerHTML = `
        <div class="container">
            <a href="#hero" class="logo">Portfolio</a>
            <div class="nav-right">
                <ul>
                    ${navItems.map(item => `<li><a href="${safeHref(item.href)}">${escapeHtml(item.label)}</a></li>`).join('')}
                </ul>
                <button class="theme-toggle" type="button" aria-label="Cambiar tema">🌙</button>
            </div>
        </div>
    `;
}

function renderSectionHeader({ label, title, subtitle = '' }) {
    return `
        <div class="container">
            <div class="section-header fade-in">
                <span class="section-label">${escapeHtml(label)}</span>
                <h2 class="section-title">${escapeHtml(title)}</h2>
                ${subtitle ? `<p class="section-subtitle">${escapeHtml(subtitle)}</p>` : ''}
            </div>
        </div>
    `;
}

function renderHero(hero) {
    const el = document.querySelector('#hero');
    el.innerHTML = `
        <div class="container">
            <div class="hero-content fade-in">
                <span class="hero-badge">${escapeHtml(hero.badge)}</span>
                <h1>
                    ${escapeHtml(hero.heading)}
                    <span>${escapeHtml(hero.headingAccent)}</span>
                </h1>
                <p>${escapeHtml(hero.description)}</p>
                <div class="hero-cta">

                </div>
            </div>
            <div class="hero-image fade-in">
                <img class="hero-mockup" src="assets/home.png" alt="Página principal del e-commerce D'Todo" fetchpriority="high">
            </div>
        </div>
    `;
}

function renderProject(project) {
    const el = document.querySelector('#proyecto');
    el.innerHTML = `
        ${renderSectionHeader({
            label: project.label,
            title: project.title,
            subtitle: project.subtitle
        })}
        <div class="container">
            <div class="project-intro fade-in">
                <div class="project-intro-grid">
                    <div>
                        <h3>${escapeHtml(project.challenge.title)}</h3>
                        <p>${escapeHtml(project.challenge.description)}</p>
                        <h3>${escapeHtml(project.solution.title)}</h3>
                        <p>${escapeHtml(project.solution.description)}</p>
                        <h3>${escapeHtml(project.results.title)}</h3>
                        <p>${escapeHtml(project.results.description)}</p>
                    </div>
                    <div class="project-meta">
                        ${project.meta.map(item => {
                            const href = item.href ? safeHref(item.href) : '';
                            const external = /^https?:\/\//.test(String(item.href || ''));
                            return `
                                <div class="project-meta-item">
                                    <div class="project-meta-label">${escapeHtml(item.label)}</div>
                                    <div class="project-meta-value">
                                        ${href ? `<a href="${href}"${external ? ' target="_blank" rel="noreferrer"' : ''}>${escapeHtml(item.value)}</a>` : escapeHtml(item.value)}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderFeatures(features) {
    const el = document.querySelector('#features');
    el.innerHTML = `
        ${renderSectionHeader({
            label: features.label,
            title: features.title
        })}
        <div class="container">
            <div class="features-grid">
                ${features.items.map(item => `
                    <article class="feature-card fade-in">
                        <div class="feature-icon">${escapeHtml(item.icon)}</div>
                        <h3>${escapeHtml(item.title)}</h3>
                        <p>${escapeHtml(item.description)}</p>
                    </article>
                `).join('')}
            </div>
        </div>
    `;
}

function renderTechStack(stack) {
    const el = document.querySelector('#stack');
    el.innerHTML = `
        <div class="container">
            <div class="section-header fade-in">
                <span class="section-label">${escapeHtml(stack.label)}</span>
                <h2 class="section-title">${escapeHtml(stack.title)}</h2>
                <p class="section-subtitle">${escapeHtml(stack.subtitle)}</p>
            </div>
            <div class="tech-categories">
                ${stack.categories.map(category => `
                    <article class="tech-category fade-in">
                        <h3>${escapeHtml(category.title)}</h3>
                        <ul class="tech-list">
                            ${category.items.map(item => `
                                <li>
                                    <span>${escapeHtml(item.name)}</span>
                                    ${item.badge ? `<span class="tech-badge">${escapeHtml(item.badge)}</span>` : ''}
                                </li>
                            `).join('')}
                        </ul>
                    </article>
                `).join('')}
            </div>
        </div>
    `;
}

function renderGallery(gallery) {
    const el = document.querySelector('#gallery');
    el.innerHTML = `
        ${renderSectionHeader({
            label: gallery.label,
            title: gallery.title,
            subtitle: gallery.subtitle
        })}
        <div class="container">
            <div class="gallery-grid">
                ${gallery.items.map(item => `
                    <figure class="gallery-item fade-in">
                        <img src="${safeSrc(item.src)}" alt="${escapeHtml(item.alt)}" loading="lazy">
                        <figcaption class="gallery-label">${escapeHtml(item.label)}</figcaption>
                    </figure>
                `).join('')}
            </div>
        </div>
    `;
}

function renderLearnings(learnings) {
    const el = document.querySelector('#learnings');
    el.innerHTML = `
        ${renderSectionHeader({
            label: learnings.label,
            title: learnings.title,
            subtitle: learnings.subtitle
        })}
        <div class="container">
            <div class="learnings-grid">
                ${learnings.items.map(item => `
                    <article class="learning-card fade-in">
                        <h3>${escapeHtml(item.title)}</h3>
                        <p class="learning-challenge"><strong>Desafío:</strong> ${escapeHtml(item.challenge)}</p>
                        <p class="learning-solution"><strong>Solución:</strong> ${escapeHtml(item.solution)}</p>
                    </article>
                `).join('')}
            </div>
        </div>
    `;
}

function renderAbout(about) {
    const el = document.querySelector('#sobre-mi');
    el.innerHTML = `
        <div class="container">
            <div class="about-content">
                <div class="about-image fade-in">
                    <img class="about-photo" src="${safeSrc(about.image)}" alt="Foto de perfil" loading="lazy">
                </div>
                <div class="about-text fade-in">
                    <h2>${escapeHtml(about.title)}</h2>
                    ${about.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}
                    <div class="skills-tags">
                        ${about.skills.map(skill => `<span class="skill-tag">${escapeHtml(skill)}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderContact(contact) {
    const el = document.querySelector('#contacto');
    el.innerHTML = `
        <div class="container">
            <div class="section-header fade-in">
                <span class="section-label">${escapeHtml(contact.label)}</span>
                <h2 class="section-title">${escapeHtml(contact.title)}</h2>
                <p class="section-subtitle">${escapeHtml(contact.subtitle)}</p>
            </div>
            <div class="contact-info">
                ${contact.items.map(item => {
                    const href = safeHref(item.href);
                    const external = /^https?:\/\//.test(String(item.href || ''));
                    return `
                        <div class="contact-item fade-in">
                            <a class="contact-icon" href="${href}" aria-label="${escapeHtml(item.text)}"${external ? ' target="_blank" rel="noreferrer"' : ''}>${escapeHtml(item.icon)}</a>
                            <a href="${href}" style="color: var(--color-accent-light);"${external ? ' target="_blank" rel="noreferrer"' : ''}>${escapeHtml(item.text)}</a>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="contact-cta fade-in">
                <a href="${safeHref(contact.cta.href)}" class="btn btn-accent">${escapeHtml(contact.cta.label)}</a>
            </div>
        </div>
    `;
}

function renderFooter(footer) {
    const el = document.querySelector('#footer');
    el.innerHTML = `
        <div class="container">
            <p>${escapeHtml(footer.text)}</p>
        </div>
    `;
}

function initThemeToggle() {
    const html = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    html.setAttribute('data-theme', initialTheme);
    themeToggle.textContent = initialTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initFadeInObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function initMobileMenu() {
    const navList = document.querySelector('#nav ul');
    const navRight = document.querySelector('.nav-right');
    const existingToggle = document.querySelector('.mobile-toggle');

    if (window.innerWidth <= 640) {
        if (navList && navRight && !existingToggle) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-toggle';
            toggle.type = 'button';
            toggle.setAttribute('aria-label', 'Abrir menú');
            toggle.textContent = '☰';
            toggle.style.cssText = 'background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--color-primary)';
            navRight.insertBefore(toggle, navList);
            navList.style.display = 'none';

            toggle.addEventListener('click', () => {
                const isVisible = navList.style.display === 'flex';
                navList.style.display = isVisible ? 'none' : 'flex';
                navList.style.position = 'absolute';
                navList.style.top = '100%';
                navList.style.left = '0';
                navList.style.right = '0';
                navList.style.background = 'var(--color-white)';
                navList.style.flexDirection = 'column';
                navList.style.padding = '2rem';
                navList.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            });
        }
    } else if (existingToggle) {
        existingToggle.remove();
        navList.removeAttribute('style');
    }
}

function renderPortfolio(data) {
    document.documentElement.lang = data.meta?.lang || 'es';
    document.title = data.meta?.title || 'Portfolio';

    renderNav(data.nav);
    renderHero(data.hero);
    renderProject(data.project);
    renderFeatures(data.features);
    renderTechStack(data.techStack);
    renderGallery(data.gallery);
    renderLearnings(data.learnings);
    renderAbout(data.about);
    renderContact(data.contact);
    renderFooter(data.footer);

    initThemeToggle();
    initSmoothScroll();
    initFadeInObserver();
    initMobileMenu();
}

async function bootstrap() {
    try {
        const response = await fetch(DATA_URL, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`No se pudo cargar ${DATA_URL} (${response.status})`);
        }

        const data = await response.json();
        renderPortfolio(data);
    } catch (error) {
        console.error(error);
        document.body.innerHTML = `
            <main style="min-height:100vh;display:grid;place-items:center;padding:2rem;font-family:sans-serif;">
                <div style="max-width:640px;">
                    <h1>No se pudo cargar el portfolio</h1>
                    <p>Revisá que <code>data.json</code> exista, sea JSON válido y que estés sirviendo el sitio por HTTP.</p>
                </div>
            </main>
        `;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
} else {
    bootstrap();
}
