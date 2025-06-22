// GitHub API Integration for NodeCracker Projects
class GitHubProjects {
    constructor() {
        this.username = 'N0D3TR4CK3R'; // Tu usuario de GitHub
        this.apiUrl = 'https://api.github.com';
    }

    async fetchRepositories() {
        try {
            const response = await fetch(`${this.apiUrl}/users/${this.username}/repos`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            const repos = await response.json();
            return repos.filter(repo => !repo.fork && !repo.private).slice(0, 6); // Top 6 públicos
        } catch (error) {
            console.error('Error fetching GitHub repositories:', error);
            return [];
        }
    }

    getLanguageIcon(language) {
        const icons = {
            'JavaScript': 'fab fa-js-square',
            'TypeScript': 'fab fa-js-square',
            'Python': 'fab fa-python',
            'Java': 'fab fa-java',
            'C++': 'fas fa-code',
            'C#': 'fas fa-code',
            'PHP': 'fab fa-php',
            'Ruby': 'fas fa-gem',
            'Go': 'fas fa-code',
            'Rust': 'fas fa-code',
            'HTML': 'fab fa-html5',
            'CSS': 'fab fa-css3-alt',
            'Vue': 'fab fa-vuejs',
            'React': 'fab fa-react',
            'Node.js': 'fab fa-node-js',
            'Docker': 'fab fa-docker',
            'Shell': 'fas fa-terminal',
            'PowerShell': 'fas fa-terminal'
        };
        return icons[language] || 'fas fa-code';
    }

    getProjectCategory(repo) {
        const name = repo.name.toLowerCase();
        const description = (repo.description || '').toLowerCase();
        const topics = (repo.topics || []).map(t => t.toLowerCase());
        if (name.includes('web') || name.includes('frontend') || name.includes('ui') || topics.includes('web') || topics.includes('frontend') || topics.includes('ui')) {
            return 'Web Development';
        }
        if (name.includes('api') || name.includes('backend') || name.includes('server') || topics.includes('api') || topics.includes('backend') || topics.includes('server')) {
            return 'Backend Development';
        }
        if (name.includes('mobile') || name.includes('app') || name.includes('react-native') || topics.includes('mobile') || topics.includes('app')) {
            return 'Mobile Development';
        }
        if (name.includes('security') || name.includes('crypto') || name.includes('hack') || topics.includes('security') || topics.includes('cryptography')) {
            return 'Cybersecurity';
        }
        if (name.includes('ai') || name.includes('ml') || name.includes('machine-learning') || topics.includes('ai') || topics.includes('machine-learning')) {
            return 'AI & Machine Learning';
        }
        if (name.includes('tool') || name.includes('utility') || name.includes('cli') || topics.includes('tools') || topics.includes('utilities')) {
            return 'Development Tools';
        }
        return 'Software Development';
    }

    formatDescription(description, maxLength = 120) {
        if (!description) return 'A software project showcasing modern development practices and innovative solutions.';
        if (description.length <= maxLength) {
            return description;
        }
        return description.substring(0, maxLength) + '...';
    }

    async loadProjects() {
        const repos = await this.fetchRepositories();
        const carousel = document.getElementById('servicesCarousel');
        if (!carousel || repos.length === 0) {
            carousel.innerHTML = `<div class='col-12 text-center'><p>No public projects found.</p></div>`;
            return;
        }
        carousel.innerHTML = '';
        repos.forEach(repo => {
            const category = this.getProjectCategory(repo);
            const language = repo.language || 'Other';
            const icon = this.getLanguageIcon(language);
            const description = this.formatDescription(repo.description);
            const card = `
                <div class="col-lg-4 col-md-6">
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="${icon}"></i>
                        </div>
                        <h3 class="service-title">${repo.name}</h3>
                        <p class="service-description">${description}</p>
                        <div class="mt-3">
                            <span class="badge bg-secondary me-2">${language}</span>
                            <span class="badge bg-secondary me-2">${category}</span>
                            <span class="badge bg-secondary">${repo.stargazers_count} ⭐</span>
                        </div>
                        <div class="mt-3">
                            <a href="${repo.html_url}" target="_blank" class="btn btn-sm btn-outline-primary">
                                <i class="fab fa-github me-1"></i>View Project
                            </a>
                        </div>
                    </div>
                </div>
            `;
            carousel.innerHTML += card;
        });
        this.updateCarousel();
    }

    updateCarousel() {
        const cards = document.querySelectorAll('.service-card');
        let currentCardIndex = 0;
        const totalCards = cards.length;
        window.changeCard = function(direction) {
            currentCardIndex += direction;
            if (currentCardIndex >= totalCards) {
                currentCardIndex = 0;
            } else if (currentCardIndex < 0) {
                currentCardIndex = totalCards - 1;
            }
            cards.forEach((card, index) => {
                if (index === currentCardIndex) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1.05)';
                } else {
                    card.style.opacity = '0.7';
                    card.style.transform = 'scale(1)';
                }
            });
        };
        if (cards.length > 0) {
            changeCard(0);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const githubProjects = new GitHubProjects();
    if (window.location.pathname.includes('services.html')) {
        githubProjects.loadProjects();
    }
}); 