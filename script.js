document.addEventListener('DOMContentLoaded', () => {

    // Ambil elemen DOM
    const menuBtn = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('closePanel');
    const sidePanel = document.getElementById('sidePanel');
    const overlay = document.getElementById('overlay');

    // Fungsi Buka
    function openPanel() {
        sidePanel.classList.add('open');
        overlay.classList.add('active');
    }

    // Fungsi Tutup
    function closePanelFunc() {
        sidePanel.classList.remove('open');
        overlay.classList.remove('active');
    }

    // Event Listener (Dijamin tidak error walau tombol diklik berulang kali)
    if(menuBtn) menuBtn.addEventListener('click', openPanel);
    if(closeBtn) closeBtn.addEventListener('click', closePanelFunc);
    if(overlay) overlay.addEventListener('click', closePanelFunc);

    // Tutup jika tombol Escape ditekan
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidePanel.classList.contains('open')) {
            closePanelFunc();
        }
    });
});
