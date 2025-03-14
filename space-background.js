/**
 * Advanced Space Background with Theme Integration
 * Creates a responsive, interactive stellar background that changes with theme
 */

class SpaceBackground {
    constructor(config = {}) {
        this.canvas = null;
        this.ctx = null;
        this.stars = [];
        this.meteors = [];
        this.config = {
            starCount: config.starCount || 150,
            meteorCount: config.meteorCount || 3,
            speed: config.speed || 0.1,
            meteorSpeed: config.meteorSpeed || 0.5,
            container: config.container || '.hero-section',
            darkModeColor: config.darkModeColor || '#ffffff',
            lightModeColor: config.lightModeColor || '#0066ff',
            ...config
        };
        
        this.init();
        this.setupThemeListener();
    }
    
    init() {
        // Create canvas element if it doesn't exist
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.classList.add('space-background');
            this.canvas.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 0;
                pointer-events: none;
            `;
            
            // Add canvas to container
            const container = document.querySelector(this.config.container);
            if (container) {
                container.appendChild(this.canvas);
            } else {
                document.body.appendChild(this.canvas);
            }
            
            this.ctx = this.canvas.getContext('2d');
        }
        
        // Set canvas size
        this.resizeCanvas();
        
        // Generate stars
        this.generateStars();
        
        // Start animation
        this.animate();
        
        // Add resize event listener
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.generateStars();
        });
    }
    
    resizeCanvas() {
        const container = document.querySelector(this.config.container) || document.body;
        const rect = container.getBoundingClientRect();
        
        // Set canvas dimensions
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // Set device pixel ratio for sharper rendering
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        
        // Set canvas CSS dimensions
        this.canvas.style.width = `${rect.width}px`;
        this.canvas.style.height = `${rect.height}px`;
    }
    
    generateStars() {
        // Clear existing stars
        this.stars = [];
        
        // Get current theme
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        const starColor = isDarkMode ? this.config.darkModeColor : this.config.lightModeColor;
        const starOpacity = isDarkMode ? 0.9 : 0.7;
        
        // Generate new stars
        for (let i = 0; i < this.config.starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 0.5,
                opacity: Math.random() * starOpacity + 0.3,
                color: starColor,
                speed: Math.random() * this.config.speed
            });
        }
        
        // Generate meteors
        this.meteors = [];
        for (let i = 0; i < this.config.meteorCount; i++) {
            this.meteors.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                length: Math.random() * 80 + 20,
                speed: Math.random() * this.config.meteorSpeed + 1,
                opacity: 0,
                color: starColor,
                active: false,
                delay: Math.random() * 50
            });
        }
    }
    
    updateStarsForTheme() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        const starColor = isDarkMode ? this.config.darkModeColor : this.config.lightModeColor;
        const starOpacity = isDarkMode ? 0.9 : 0.7;
        
        // Update existing stars
        this.stars.forEach(star => {
            star.color = starColor;
            star.opacity = Math.random() * starOpacity + 0.3;
        });
        
        // Update meteors
        this.meteors.forEach(meteor => {
            meteor.color = starColor;
        });
    }
    
    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw stars
        this.stars.forEach(star => {
            star.y += star.speed;
            
            // Reset star position if it goes off screen
            if (star.y > this.canvas.height) {
                star.y = 0;
                star.x = Math.random() * this.canvas.width;
            }
            
            // Draw star with twinkle effect
            const twinkle = Math.sin(Date.now() * 0.001 + star.x) * 0.2 + 0.8;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${this.hexToRgb(star.color)}, ${star.opacity * twinkle})`;
            this.ctx.fill();
        });
        
        // Draw meteors
        this.meteors.forEach(meteor => {
            if (!meteor.active) {
                meteor.delay--;
                if (meteor.delay <= 0) {
                    meteor.active = true;
                    meteor.x = Math.random() * this.canvas.width;
                    meteor.y = -meteor.length;
                    meteor.opacity = Math.random() * 0.7 + 0.3;
                }
                return;
            }
            
            meteor.x += meteor.speed;
            meteor.y += meteor.speed;
            
            // Reset meteor if it goes off screen
            if (meteor.y > this.canvas.height || meteor.x > this.canvas.width) {
                meteor.active = false;
                meteor.delay = Math.random() * 300 + 100;
            }
            
            // Draw meteor trail
            this.ctx.beginPath();
            this.ctx.moveTo(meteor.x, meteor.y);
            const angle = Math.atan2(meteor.speed, meteor.speed);
            const endX = meteor.x - Math.cos(angle) * meteor.length;
            const endY = meteor.y - Math.sin(angle) * meteor.length;
            
            // Create gradient for meteor trail
            const gradient = this.ctx.createLinearGradient(meteor.x, meteor.y, endX, endY);
            gradient.addColorStop(0, `rgba(${this.hexToRgb(meteor.color)}, ${meteor.opacity})`);
            gradient.addColorStop(1, `rgba(${this.hexToRgb(meteor.color)}, 0)`);
            
            this.ctx.lineTo(endX, endY);
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();
        });
        
        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
    
    hexToRgb(hex) {
        // Default to white if no color specified
        if (!hex) return '255, 255, 255';
        
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Handle shorthand hex
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        
        // Parse hex values
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return `${r}, ${g}, ${b}`;
    }
    
    setupThemeListener() {
        // Watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    this.updateStarsForTheme();
                }
            });
        });
        
        // Start observing
        observer.observe(document.documentElement, { attributes: true });
        
        // Initial theme check
        this.updateStarsForTheme();
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const spaceBackground = new SpaceBackground({
        container: '.hero-section',
        starCount: 200,
        meteorCount: 5,
        darkModeColor: '#ffffff',
        lightModeColor: '#0066ff'
    });
    
    // Make available globally
    window.spaceBackground = spaceBackground;
});
