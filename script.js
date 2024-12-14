function toggleTempleTheme() {
    const body = document.body;
    body.classList.toggle('temple-theme');
    
    // Save preference to localStorage
    const isTempleTheme = body.classList.contains('temple-theme');
    localStorage.setItem('templeTheme', isTempleTheme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('templeTheme');
    
    if (savedTheme === 'true') {
        document.body.classList.add('temple-theme');
    }
    
    themeToggle.addEventListener('click', toggleTempleTheme);
});
