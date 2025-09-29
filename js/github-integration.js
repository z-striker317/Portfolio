// GitHub API Integration for Real Project Data
// This file can be used to fetch real GitHub repositories

class GitHubPortfolio {
    constructor(username) {
        this.username = username;
        this.apiUrl = `https://api.github.com/users/${username}/repos`;
        this.cache = new Map();
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
    }

    async fetchRepositories() {
        // Check cache first
        const cached = this.cache.get('repos');
        if (cached && (Date.now() - cached.timestamp) < this.cacheExpiry) {
            return cached.data;
        }

        try {
            const response = await fetch(this.apiUrl + '?sort=updated&per_page=20');
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const repos = await response.json();
            
            // Cache the results
            this.cache.set('repos', {
                data: repos,
                timestamp: Date.now()
            });

            return repos;
        } catch (error) {
            console.error('Error fetching GitHub repositories:', error);
            return this.getFallbackProjects();
        }
    }

    async getTopProjects(limit = 6) {
        const repos = await this.fetchRepositories();
        
        // Filter and sort repositories
        const filteredRepos = repos
            .filter(repo => !repo.fork && repo.description) // Exclude forks and repos without description
            .sort((a, b) => {
                // Sort by stars, then by recent updates
                const starDiff = b.stargazers_count - a.stargazers_count;
                if (starDiff !== 0) return starDiff;
                return new Date(b.updated_at) - new Date(a.updated_at);
            })
            .slice(0, limit);

        return filteredRepos.map(repo => this.transformRepository(repo));
    }

    transformRepository(repo) {
        return {
            name: repo.name,
            description: repo.description || 'No description available',
            technologies: this.extractTechnologies(repo),
            githubUrl: repo.html_url,
            demoUrl: repo.homepage || null,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            updatedAt: repo.updated_at,
            createdAt: repo.created_at
        };
    }

    extractTechnologies(repo) {
        // This is a simplified version - in reality, you might want to use GitHub's languages API
        const technologies = [];
        
        if (repo.language) {
            technologies.push(repo.language);
        }

        // Add common data science technologies based on repository name and description
        const text = (repo.name + ' ' + (repo.description || '')).toLowerCase();
        
        const techMap = {
            'machine learning': ['Scikit-learn', 'TensorFlow', 'PyTorch'],
            'deep learning': ['TensorFlow', 'Keras', 'PyTorch'],
            'data analysis': ['Pandas', 'NumPy', 'Matplotlib'],
            'visualization': ['Plotly', 'Seaborn', 'D3.js'],
            'api': ['Flask', 'FastAPI', 'REST'],
            'web': ['HTML', 'CSS', 'JavaScript'],
            'database': ['SQL', 'MongoDB', 'PostgreSQL'],
            'nlp': ['NLTK', 'spaCy', 'Transformers'],
            'computer vision': ['OpenCV', 'PIL', 'TensorFlow'],
            'streamlit': ['Streamlit'],
            'jupyter': ['Jupyter'],
            'docker': ['Docker'],
            'aws': ['AWS'],
            'azure': ['Azure'],
            'gcp': ['Google Cloud']
        };

        Object.entries(techMap).forEach(([keyword, techs]) => {
            if (text.includes(keyword)) {
                technologies.push(...techs);
            }
        });

        // Remove duplicates and limit to 4-5 technologies
        return [...new Set(technologies)].slice(0, 5);
    }

    getFallbackProjects() {
        // Return the sample projects if GitHub API fails
        return [
            {
                name: 'customer-churn-prediction',
                description: 'Machine learning model to predict customer churn using ensemble methods. Achieved 94% accuracy with Random Forest and XGBoost.',
                html_url: 'https://github.com/z-striker317',
                homepage: null,
                stargazers_count: 15,
                forks_count: 3,
                language: 'Python',
                updated_at: new Date().toISOString(),
                created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString() // 3 months ago
            },
            {
                name: 'stock-price-lstm',
                description: 'Deep learning model using LSTM networks to predict stock prices. Implemented with TensorFlow and real-time data visualization.',
                html_url: 'https://github.com/z-striker317',
                homepage: null,
                stargazers_count: 28,
                forks_count: 7,
                language: 'Python',
                updated_at: new Date().toISOString(),
                created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() // 2 months ago
            },
            {
                name: 'sentiment-analysis-dashboard',
                description: 'Real-time sentiment analysis of social media data with interactive dashboard. Uses NLP and data visualization.',
                html_url: 'https://github.com/z-striker317',
                homepage: 'https://sentiment-dashboard.herokuapp.com',
                stargazers_count: 22,
                forks_count: 5,
                language: 'Python',
                updated_at: new Date().toISOString(),
                created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                name: 'ecommerce-recommendation-system',
                description: 'Collaborative filtering recommendation system for e-commerce platform. Implemented matrix factorization techniques.',
                html_url: 'https://github.com/z-striker317',
                homepage: null,
                stargazers_count: 31,
                forks_count: 9,
                language: 'Python',
                updated_at: new Date().toISOString(),
                created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                name: 'covid19-data-analysis',
                description: 'Comprehensive analysis of COVID-19 data with interactive visualizations and statistical insights.',
                html_url: 'https://github.com/z-striker317',
                homepage: null,
                stargazers_count: 18,
                forks_count: 4,
                language: 'Python',
                updated_at: new Date().toISOString(),
                created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                name: 'image-classification-cnn',
                description: 'Convolutional Neural Network for image classification with transfer learning. Achieved 96% accuracy on test set.',
                html_url: 'https://github.com/z-striker317',
                homepage: null,
                stargazers_count: 25,
                forks_count: 6,
                language: 'Python',
                updated_at: new Date().toISOString(),
                created_at: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
    }

    async getRepositoryLanguages(repoName) {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.username}/${repoName}/languages`);
            if (!response.ok) {
                throw new Error(`Languages API error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching repository languages:', error);
            return {};
        }
    }

    async getUserStats() {
        try {
            const response = await fetch(`https://api.github.com/users/${this.username}`);
            if (!response.ok) {
                throw new Error(`User API error: ${response.status}`);
            }
            
            const user = await response.json();
            return {
                name: user.name,
                bio: user.bio,
                publicRepos: user.public_repos,
                followers: user.followers,
                following: user.following,
                createdAt: user.created_at,
                avatarUrl: user.avatar_url
            };
        } catch (error) {
            console.error('Error fetching user stats:', error);
            return null;
        }
    }
}

// Usage example:
async function loadRealGitHubProjects() {
    const github = new GitHubPortfolio('z-striker317');
    
    try {
        const projects = await github.getTopProjects(6);
        displayProjects(projects);
        
        // Optionally load user stats
        const userStats = await github.getUserStats();
        if (userStats) {
            updateUserStats(userStats);
        }
    } catch (error) {
        console.error('Error loading GitHub projects:', error);
        showProjectsError();
    }
}

function updateUserStats(stats) {
    // Update any user statistics displayed on the page
    const statsElements = {
        repos: document.querySelector('.github-repos-count'),
        followers: document.querySelector('.github-followers-count')
    };
    
    if (statsElements.repos) {
        statsElements.repos.textContent = stats.publicRepos;
    }
    
    if (statsElements.followers) {
        statsElements.followers.textContent = stats.followers;
    }
}

// Export for use in main.js if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GitHubPortfolio;
}