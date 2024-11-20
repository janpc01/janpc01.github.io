document.addEventListener('DOMContentLoaded', () => {
    // Project data structure
    let projects = JSON.parse(localStorage.getItem('projects')) || [];

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Initialize projects grid
    function initializeProjects() {
        const grid = document.querySelector('.projects-grid');
        grid.innerHTML = '';
        projects.forEach((project, index) => {
            const card = createProjectCard(project);
            grid.appendChild(card);
        });
    }

    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.status = project.status;
        
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-meta">
                <span class="status">${project.status}</span>
                <div class="tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="project-links">
                ${project.links.demo ? `<a href="${project.links.demo}" target="_blank" class="btn">Demo</a>` : ''}
                ${project.links.github ? `<a href="${project.links.github}" target="_blank" class="btn">GitHub</a>` : ''}
            </div>
        `;
        
        return card;
    }
});