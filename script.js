document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('closePanel');
    const sidePanel = document.getElementById('sidePanel');
    const overlay = document.getElementById('overlay');

    // Fungsi untuk membuka panel
    function openPanel() {
        sidePanel.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Mencegah scroll background saat popup terbuka
    }

    // Fungsi untuk menutup panel
    function closePanelFunc() {
        sidePanel.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners
    menuBtn.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanelFunc);
    overlay.addEventListener('click', closePanelFunc);

    // Menutup panel jika user menekan tombol Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidePanel.classList.contains('open')) {
            closePanelFunc();
        }
    });
});
