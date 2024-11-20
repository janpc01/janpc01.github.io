// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // Check for saved dark mode preference
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            document.body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    }

    // Search functionality
    const searchInput = document.getElementById('projectSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const projectCards = document.querySelectorAll('.project-card');
            const projectSections = document.querySelectorAll('section > div');

            [...projectCards, ...projectSections].forEach(element => {
                const text = element.textContent.toLowerCase();
                const parentSection = element.closest('section');
                
                if (text.includes(searchTerm)) {
                    element.style.display = '';
                    if (parentSection) {
                        parentSection.style.display = '';
                    }
                } else {
                    element.style.display = 'none';
                }
            });
        });
    }

    // Add click handlers for demo and github buttons
    document.querySelectorAll('.demo-btn, .github-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const type = e.target.classList.contains('demo-btn') ? 'demo' : 'github';
            const card = e.target.closest('.project-card');
            const projectTitle = card.querySelector('h3').textContent;
            
            // Replace these URLs with your actual URLs
            const urls = {
                'Kyoso Cards': {
                    demo: 'https://your-demo-url.com',
                    github: 'https://github.com/your-repo'
                }
                // Add more projects as needed
            };

            if (urls[projectTitle] && urls[projectTitle][type]) {
                window.open(urls[projectTitle][type], '_blank');
            }
        });
    });
});