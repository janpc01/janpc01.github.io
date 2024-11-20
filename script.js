document.addEventListener('DOMContentLoaded', () => {
    // Project data structure
    const projects = [
        {
            title: 'Kyoso Cards',
            status: 'in-progress',
            description: 'E-commerce platform for trading cards',
            progress: 75,
            tags: ['Angular', 'Node.js', 'MongoDB'],
            links: {
                demo: 'https://your-demo-url.com',
                github: 'https://github.com/your-repo'
            }
        }
        // Add more projects here
    ];

    // Initialize projects grid
    function initializeProjects() {
        const grid = document.querySelector('.projects-grid');
        projects.forEach((project, index) => {
            const card = createProjectCard(project);
            card.style.animationDelay = `${index * 0.1}s`;
            grid.appendChild(card);
        });
    }

    // Create project card
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';
        card.dataset.status = project.status;
        
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${project.progress}%"></div>
            </div>
            <div class="tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="card-actions">
                <a href="${project.links.demo}" target="_blank" class="btn">Demo</a>
                <a href="${project.links.github}" target="_blank" class="btn">GitHub</a>
            </div>
        `;
        
        return card;
    }

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterProjects(filter);
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    function filterProjects(filter) {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            if (filter === 'all' || card.dataset.status === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Initialize
    initializeProjects();
});