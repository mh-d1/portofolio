document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ELEMEN DOM ---
    const kebabBtn = document.getElementById('menuToggle');
    const popupMenu = document.getElementById('popupMenu');
    const overlay = document.getElementById('overlay');
    
    const audioWrapper = document.getElementById('audioWrapper');
    const audioToggleBtn = document.getElementById('audioToggleBtn');
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const bgMusic = document.getElementById('bgMusic');
    const progressFill = document.getElementById('progressFill');

    // --- 2. FUNGSI MENU (Titik Tiga) ---
    function closeMenu() {
        popupMenu.classList.remove('open');
        overlay.classList.remove('active');
    }

    function toggleMenu() {
        const isOpen = popupMenu.classList.contains('open');
        if (isOpen) {
            closeMenu();
        } else {
            // Jika menu audio sedang terbuka, tutup audio dulu untuk menghindari tabrakan UI
            if (audioPlayer.classList.contains('open')) {
                audioPlayer.classList.remove('open');
            }
            popupMenu.classList.add('open');
            overlay.classList.add('active');
        }
    }

    kebabBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    // Escape key untuk menutup semua popup
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            if (audioPlayer.classList.contains('open')) {
                audioPlayer.classList.remove('open');
            }
        }
    });

    // --- 3. FUNGSI AUDIO PLAYER ---
    let isPlaying = false;

    audioToggleBtn.addEventListener('click', () => {
        // Toggle player visibility
        const isPlayerOpen = audioPlayer.classList.contains('open');
        if (isPlayerOpen) {
            audioPlayer.classList.remove('open');
        } else {
            // Tutup menu navigasi jika terbuka agar tidak menumpuk
            if (popupMenu.classList.contains('open')) {
                closeMenu();
            }
            audioPlayer.classList.add('open');
        }
    });

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            audioToggleBtn.classList.remove('playing');
            playBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
            `;
        } else {
            bgMusic.play();
            isPlaying = true;
            audioToggleBtn.classList.add('playing');
            playBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1"/>
                    <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
            `;
            
            // Update progress bar
            bgMusic.addEventListener('timeupdate', updateProgress);
        }
    });

    function updateProgress() {
        if (bgMusic.duration) {
            const percent = (bgMusic.currentTime / bgMusic.duration) * 100;
            progressFill.style.width = percent + '%';
        }
    }

    // Reset jika lagu berakhir
    bgMusic.addEventListener('ended', () => {
        isPlaying = false;
        audioToggleBtn.classList.remove('playing');
        playBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
        `;
        progressFill.style.width = '0%';
    });

    // --- 4. ANIMASI SCROLL (Intersection Observer Apple Style) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Jangan animasikan lagi setelah muncul
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

});
