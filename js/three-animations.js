// Three.js 3D Animations for Portfolio
// Creating floating geometric shapes and interactive 3D background

class Portfolio3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.geometries = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.createScene();
            this.createGeometries();
            this.setupEventListeners();
            this.animate();
            this.createScrollAnimations();
        });
    }

    createScene() {
        // Create scene
        this.scene = new THREE.Scene();

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        
        // Add canvas to hero section
        const heroSection = document.querySelector('section');
        if (heroSection) {
            const canvas = this.renderer.domElement;
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.zIndex = '-1';
            canvas.style.pointerEvents = 'none';
            heroSection.appendChild(canvas);
        }
    }

    createGeometries() {
        // Create floating geometric shapes
        const shapes = [
            { geometry: new THREE.BoxGeometry(0.5, 0.5, 0.5), count: 8 },
            { geometry: new THREE.SphereGeometry(0.3, 32, 32), count: 6 },
            { geometry: new THREE.ConeGeometry(0.3, 0.8, 32), count: 5 },
            { geometry: new THREE.OctahedronGeometry(0.4), count: 7 }
        ];

        const materials = [
            new THREE.MeshPhongMaterial({ 
                color: 0x3b82f6, 
                transparent: true, 
                opacity: 0.8,
                wireframe: false 
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0x8b5cf6, 
                transparent: true, 
                opacity: 0.7,
                wireframe: true 
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0x10b981, 
                transparent: true, 
                opacity: 0.6,
                wireframe: false 
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0xf59e0b, 
                transparent: true, 
                opacity: 0.5,
                wireframe: true 
            })
        ];

        shapes.forEach((shape, shapeIndex) => {
            for (let i = 0; i < shape.count; i++) {
                const mesh = new THREE.Mesh(
                    shape.geometry, 
                    materials[shapeIndex % materials.length]
                );
                
                // Random positioning
                mesh.position.x = (Math.random() - 0.5) * 20;
                mesh.position.y = (Math.random() - 0.5) * 20;
                mesh.position.z = (Math.random() - 0.5) * 10;
                
                // Random rotation
                mesh.rotation.x = Math.random() * Math.PI;
                mesh.rotation.y = Math.random() * Math.PI;
                
                // Store animation properties
                mesh.userData = {
                    originalPosition: mesh.position.clone(),
                    rotationSpeed: {
                        x: (Math.random() - 0.5) * 0.02,
                        y: (Math.random() - 0.5) * 0.02,
                        z: (Math.random() - 0.5) * 0.01
                    },
                    floatSpeed: 0.5 + Math.random() * 0.5,
                    floatOffset: Math.random() * Math.PI * 2
                };
                
                this.geometries.push(mesh);
                this.scene.add(mesh);
            }
        });

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x3b82f6, 1, 100);
        pointLight.position.set(0, 0, 10);
        this.scene.add(pointLight);
    }

    setupEventListeners() {
        // Mouse movement interaction
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Scroll interaction
        window.addEventListener('scroll', () => {
            const scrollPercent = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
            this.camera.position.z = 5 + scrollPercent * 3;
            this.camera.rotation.z = scrollPercent * 0.1;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Animate geometries
        this.geometries.forEach((mesh) => {
            const userData = mesh.userData;
            
            // Rotation animation
            mesh.rotation.x += userData.rotationSpeed.x;
            mesh.rotation.y += userData.rotationSpeed.y;
            mesh.rotation.z += userData.rotationSpeed.z;
            
            // Floating animation
            mesh.position.y = userData.originalPosition.y + 
                Math.sin(time * userData.floatSpeed + userData.floatOffset) * 0.5;
            
            // Mouse interaction
            const mouseInfluence = 0.1;
            mesh.position.x = userData.originalPosition.x + this.mouse.x * mouseInfluence;
            mesh.position.z = userData.originalPosition.z + this.mouse.y * mouseInfluence;
        });

        // Camera gentle movement
        this.camera.position.x = Math.sin(time * 0.1) * 0.1;
        this.camera.position.y = Math.cos(time * 0.1) * 0.1;

        this.renderer.render(this.scene, this.camera);
    }

    createScrollAnimations() {
        // Intersection Observer for scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slide-up');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
}

// Particle System for Additional Effects
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.createCanvas();
            this.createParticles();
            this.animate();
        });
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-2';
        this.canvas.style.pointerEvents = 'none';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
            });
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 1;
    }
}

// Initialize 3D animations
window.portfolio3D = new Portfolio3D();
window.particleSystem = new ParticleSystem();