// ============ SMOOTH SCROLLING ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============ NAVBAR ACTIVE STATE ============
const updateActiveLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveLink);

// ============ DOWNLOAD RESUME AS PDF ============
function downloadResume() {
    const element = document.documentElement;
    const opt = {
        margin: 10,
        filename: 'Patnala_Madhu_Shalini_Resume_DMS.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    // Check if html2pdf library is available
    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(element).save();
    } else {
        // Fallback: Use window.print() if html2pdf is not available
        window.print();
    }
}

// ============ SKILL TAGS ANIMATION ============
const skillTags = document.querySelectorAll('.tag');

skillTags.forEach((tag, index) => {
    tag.addEventListener('mouseenter', () => {
        tag.style.animation = 'bounce 0.5s';
    });

    tag.addEventListener('animationend', () => {
        tag.style.animation = '';
    });
});

// ============ PROJECT CARD ANIMATION ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .cert-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(card);
});

// ============ ADD SCROLL ANIMATION ============
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }

    .nav-link.active {
        color: #ffd700;
        text-decoration: underline;
        font-weight: bold;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .section {
        animation: fadeInUp 0.6s ease-out;
    }
`;
document.head.appendChild(style);

// ============ COPY EMAIL FUNCTIONALITY ============
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        const email = emailLink.href.replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            const originalText = emailLink.textContent;
            emailLink.textContent = '✓ Copied!';
            setTimeout(() => {
                emailLink.textContent = originalText;
            }, 2000);
        });
    });
}

// ============ MOBILE MENU (Optional) ============
const toggleMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('mobile-active');
    }
};

// ============ LOAD TIME ANIMATION ============
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in';
});

// ============ DYNAMIC SKILL SEARCH (Optional Enhancement) ============
const createSkillSearch = () => {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;

    const searchContainer = document.createElement('div');
    searchContainer.style.marginBottom = '1.5rem';
    searchContainer.innerHTML = `
        <input 
            type="text" 
            id="skillSearch" 
            placeholder="🔍 Search skills..."
            style="
                width: 100%;
                padding: 0.8rem;
                border: 2px solid #667eea;
                border-radius: 5px;
                font-size: 1rem;
                transition: all 0.3s;
            "
        />
    `;

    const skillsContent = skillsSection.querySelector('.section-content');
    if (skillsContent) {
        skillsContent.insertBefore(searchContainer, skillsContent.firstChild);

        const searchInput = document.getElementById('skillSearch');
        const skillCategories = skillsContent.querySelectorAll('.skill-category');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();

            skillCategories.forEach(category => {
                const categoryText = category.textContent.toLowerCase();
                category.style.display = categoryText.includes(query) ? 'block' : 'none';
            });
        });

        searchInput.addEventListener('focus', () => {
            searchInput.style.borderColor = '#764ba2';
            searchInput.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.3)';
        });

        searchInput.addEventListener('blur', () => {
            searchInput.style.borderColor = '#667eea';
            searchInput.style.boxShadow = 'none';
        });
    }
};

// Initialize skill search when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSkillSearch);
} else {
    createSkillSearch();
}

// ============ PRINT STATISTICS ============
const printStats = () => {
    const stats = {
        skills: document.querySelectorAll('.tag').length,
        projects: document.querySelectorAll('.project-card').length,
        certifications: document.querySelectorAll('.cert-item').length,
        languages: document.querySelectorAll('.language-item').length
    };
    
    console.log('Resume Statistics:', stats);
};

// Print stats on load
printStats();

// ============ THEME TOGGLE (Optional Dark Mode) ============
const createThemeToggle = () => {
    // Create toggle button
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙 Dark Mode';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 0.7rem 1.2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s;
        z-index: 999;
    `;

    themeToggle.addEventListener('mouseover', () => {
        themeToggle.style.transform = 'scale(1.05)';
    });

    themeToggle.addEventListener('mouseout', () => {
        themeToggle.style.transform = 'scale(1)';
    });

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.style.backgroundColor = '#1a1a1a';
            document.body.style.color = '#e0e0e0';
            document.querySelectorAll('section').forEach(section => {
                section.style.backgroundColor = '#2a2a2a';
                section.style.color = '#e0e0e0';
            });
            themeToggle.innerHTML = '☀️ Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.style.backgroundColor = '#f8f9fa';
            document.body.style.color = '#333';
            document.querySelectorAll('section').forEach(section => {
                section.style.backgroundColor = 'white';
                section.style.color = '#333';
            });
            themeToggle.innerHTML = '🌙 Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    };

    themeToggle.addEventListener('click', () => {
        const newTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Apply saved theme on load
    if (currentTheme === 'dark') {
        setTimeout(() => applyTheme('dark'), 100);
    }

    document.body.appendChild(themeToggle);
};

// Initialize theme toggle
createThemeToggle();

// ============ FORM VALIDATION (If contact form is added) ============
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

console.log('✅ Resume page loaded successfully!');
console.log('📊 For contact, email: madhushalinipatnala@gmail.com');
console.log('🔗 GitHub: https://github.com/PatnalaMadhuShalini');
