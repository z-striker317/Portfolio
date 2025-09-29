// Data Visualizations for Portfolio
// This file creates interactive charts to showcase data science skills

class PortfolioVisualizations {
    constructor() {
        this.charts = {};
        this.init();
    }

    init() {
        // Initialize visualizations when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.createSkillsRadarChart();
            this.createProjectsTimelineChart();
            this.createTechnologyUsageChart();
        });
    }

    // Skills Radar Chart
    createSkillsRadarChart() {
        const canvas = document.getElementById('skillsRadarChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        this.charts.skillsRadar = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Machine Learning',
                    'Deep Learning',
                    'Data Analysis',
                    'Python Programming',
                    'Data Visualization',
                    'Statistical Modeling',
                    'Database Management',
                    'Research & Analytics'
                ],
                datasets: [{
                    label: 'Current Skill Level',
                    data: [90, 85, 95, 95, 88, 82, 80, 90],
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            font: {
                                size: 12
                            }
                        },
                        ticks: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Projects Timeline Chart
    createProjectsTimelineChart() {
        const canvas = document.getElementById('projectsTimelineChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const projectsCompleted = [1, 2, 1, 3, 2, 4];
        
        this.charts.projectsTimeline = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Projects Completed',
                    data: projectsCompleted,
                    borderColor: 'rgba(139, 92, 246, 1)',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(139, 92, 246, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    // Technology Usage Chart
    createTechnologyUsageChart() {
        const canvas = document.getElementById('technologyChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        const technologies = ['Python', 'SQL', 'TensorFlow', 'Pandas', 'Scikit-learn', 'Matplotlib'];
        const usage = [95, 88, 82, 90, 85, 80];
        const colors = [
            'rgba(59, 130, 246, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 101, 101, 0.8)',
            'rgba(251, 146, 60, 0.8)',
            'rgba(168, 85, 247, 0.8)'
        ];
        
        this.charts.technology = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: technologies,
                datasets: [{
                    data: usage,
                    backgroundColor: colors,
                    borderColor: colors.map(color => color.replace('0.8', '1')),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                cutout: '50%'
            }
        });
    }

    // Method to animate charts on scroll
    animateChartsOnScroll() {
        const charts = Object.values(this.charts);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate the chart
                    const chartId = entry.target.id;
                    if (this.charts[chartId.replace('Chart', '')]) {
                        this.charts[chartId.replace('Chart', '')].update('show');
                    }
                }
            });
        }, {
            threshold: 0.5
        });

        // Observe chart containers
        const chartContainers = document.querySelectorAll('[id$="Chart"]');
        chartContainers.forEach(container => observer.observe(container));
    }
}

// Initialize visualizations
const portfolioViz = new PortfolioVisualizations();