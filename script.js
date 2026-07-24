document.addEventListener('DOMContentLoaded', () => {

    // 1. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === current) {
                link.classList.add('active');
            }
        });
    });

    // 2. Playful Theme Toggle (Mockup)
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        themeToggle.classList.toggle('active');
    });

    // 3. Drag Interaction for Skill Sliders
    const sliders = document.querySelectorAll('.drag-slider');

    sliders.forEach(slider => {
        const thumb = slider.querySelector('.thumb');
        const fill = slider.querySelector('.fill');
        let isDragging = false;

        const updateSlider = (clientX) => {
            const rect = slider.getBoundingClientRect();
            let x = clientX - rect.left;
            let percent = (x / rect.width) * 100;
            
            // Clamp between 0 and 100
            percent = Math.max(0, Math.min(100, percent));
            
            fill.style.width = percent + '%';
            thumb.style.left = percent + '%';
        };

        thumb.addEventListener('mousedown', (e) => {
            isDragging = true;
            thumb.style.cursor = 'grabbing';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                thumb.style.cursor = 'grab';
            }
        });

        // Allow clicking on the track to jump
        slider.addEventListener('mousedown', (e) => {
            if (e.target === thumb) return; // Don't trigger if clicking thumb directly
            updateSlider(e.clientX);
        });
    });

    // 4. Drag to scroll for Specialties (Horizontal track)
    const specTrack = document.getElementById('specTrack');
    let isDown = false;
    let startX;
    let scrollLeft;

    specTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        specTrack.style.cursor = 'grabbing';
        startX = e.pageX - specTrack.offsetLeft;
        scrollLeft = specTrack.scrollLeft;
    });

    document.addEventListener('mouseleave', () => {
        isDown = false;
        specTrack.style.cursor = 'grab';
    });

    document.addEventListener('mouseup', () => {
        isDown = false;
        specTrack.style.cursor = 'grab';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - specTrack.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        specTrack.scrollLeft = scrollLeft - walk;
    });

    // 5. Intersection Observer for Fade-up animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
});
