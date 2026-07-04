// Typing Animation
const phrases = [
    "Computer Science Student",
    "Penetration Tester",
    "Threat Hunter",
    "Bug Bounty Hunter"
];

let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let typingSpeed = 80;

function type() {
    const typingElement = document.getElementById("typing");
    if (!typingElement) return;

    currentPhrase = phrases[i];

    if (!isDeleting && j <= currentPhrase.length) {
        typingElement.textContent = currentPhrase.substring(0, j);
        j++;
    } else if (isDeleting && j >= 0) {
        typingElement.textContent = currentPhrase.substring(0, j);
        j--;
    }

    if (!isDeleting && j === currentPhrase.length) {
        setTimeout(() => { isDeleting = true; }, 1500);
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
    }

    setTimeout(type, isDeleting ? 40 : typingSpeed);
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.innerHTML = `
                <div class="flex flex-col p-8 space-y-8 text-xl font-medium">
                    <a href="#about" class="hover:text-[#00ff9f]">About</a>
                    <a href="#skills" class="hover:text-[#00ff9f]">Skills</a>
                    <a href="#projects" class="hover:text-[#00ff9f]">Projects</a>
                    <a href="#certifications" class="hover:text-[#00ff9f]">Certifications</a>
                    <a href="#contact" class="hover:text-[#00ff9f]">Contact</a>
                </div>
            `;
        }
    });
}

// Navbar
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-2xl', 'py-3');
        } else {
            navbar.classList.remove('shadow-2xl', 'py-3');
        }

        let current = '';
        document.querySelectorAll('section').forEach(section => {
            if (scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });
}

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');

        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        // Success handling (after Web3Forms submits)
        setTimeout(() => {
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
        }, 1000);
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    type();
    initMobileMenu();
    initNavbar();
    initContactForm();

    // Back to Top
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'fixed bottom-8 right-8 w-12 h-12 bg-[#00ff9f] text-black rounded-full flex items-center justify-center text-2xl shadow-xl hidden hover:scale-110 transition-all z-50';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('hidden', window.scrollY < 500);
    });

    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});