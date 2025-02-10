class PhysicsButton {
    constructor(config) {
        this.config = config;
        this.element = document.createElement('div');
        this.element.className = `button button-${config.id}`;
        this.element.style.width = `${config.size}px`;
        this.element.style.height = `${config.size}px`;
        
        // Physics properties
        this.x = 100 + (config.finalPosition * 400); // Convert percentage to pixels
        this.y = config.initialDropHeight;
        this.velocity = { x: 0, y: 0 };
        this.rotation = 0;
        this.isDropping = true;
        this.hasLanded = false;

        // Add click handler
        this.element.addEventListener('click', () => {
            window.open(config.link, '_blank');
        });

        // Initial position
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.transform = `
            translate(${this.x}px, ${this.y}px)
            rotate(${this.rotation}deg)
        `;
    }

    update(angle, deltaTime) {
        const radians = (angle * Math.PI) / 180;
        const gravity = 9.81;
        const friction = 0.98; // Change here for diff button
        const elasticity = 0.7;
        
        if (this.isOnSeesaw) {
            // Calculate acceleration based on slope angle
            const acceleration = Math.sin(radians) * gravity;
            
            // Update velocities
            this.velocity.x += acceleration * deltaTime * Math.cos(radians);
            this.velocity.y += acceleration * deltaTime * Math.sin(radians);
            
            // Apply friction
            this.velocity.x *= friction;
            this.velocity.y *= friction;
            
            // Update position
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            
            // Update rotation (based on movement)
            const rotationSpeed = (this.velocity.x * 1);
            this.rotation += rotationSpeed;

            // Constrain to seesaw bounds
            const seesawWidth = 600;
            const buttonWidth = 40;
            const minX = 100;
            const maxX = seesawWidth - buttonWidth + 100;

            if (this.x < minX) {
                this.x = minX;
                this.velocity.x *= -elasticity;
            }
            if (this.x > maxX) {
                this.x = maxX;
                this.velocity.x *= -elasticity;
            }

            // Calculate Y position based on seesaw angle
            const distanceFromCenter = this.x - (seesawWidth / 2 + 100);
            const heightOffset = Math.sin(radians) * distanceFromCenter;
            
            // Update element position and rotation
            this.element.style.transform = `
                translate(${this.x}px, ${177 + heightOffset}px)
                rotate(${this.rotation}deg)
            `;
        }
    }
}

// Button configuration object
const buttonConfigs = [
    {
        id: 1,
        size: 60,                    // size in pixels
        finalPosition: 0.1,          // 10% from left
        link: openPdfViewer('assets/pdfs/Networks.pdf'),
        image: 'assets/img/networks.jpg', // replace with actual image path
        initialDropHeight: -200      // starting height above seesaw
    },
    {
        id: 2,
        size: 45,
        finalPosition: 0.25,         // 25% from left
        link: openPdfViewer('assets/pdfs/Networks.pdf'),
        image: 'assets/img/networks.jpg', // replace with actual image path
        initialDropHeight: -200      // starting height above seesaw
    },
    {
        id: 3,
        size: 70,
        finalPosition: 0.9,          // 90% from left
        link: openPdfViewer('assets/pdfs/Networks.pdf'),
        image: 'assets/img/networks.jpg', // replace with actual image path
        initialDropHeight: -200      // starting height above seesaw
    },
    {
        id: 4,
        size: 50,
        finalPosition: 0.6,          // 60% from left
        link: openPdfViewer('assets/pdfs/Networks.pdf'),
        image: 'assets/img/networks.jpg', // replace with actual image path
        initialDropHeight: -200      // starting height above seesaw
    },
    {
        id: 5,
        size: 55,
        finalPosition: 1.0,          // 100% from left
        link: openPdfViewer('assets/pdfs/Networks.pdf'),
        image: 'assets/img/networks.jpg', // replace with actual image path
        initialDropHeight: -200      // starting height above seesaw
    },
];


const seesaw = document.getElementById('seesaw');
const container = document.getElementById('seesaw-container');
const leftArea = document.getElementById('left-area');
const rightArea = document.getElementById('right-area');

// Create buttons with physics
const buttonPositions = [150, 250, 350, 450, 550];
const physicsButtons = [];

buttonPositions.forEach((position) => {
    const button = document.createElement('div');
    button.className = 'button';
    container.appendChild(button);
    
    const physicsButton = new PhysicsButton(button, position);
    physicsButtons.push(physicsButton);
});

let currentAngle = 0;
let lastTime = performance.now();
let isAnimating = true;

function animate(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    physicsButtons.forEach(button => {
        button.update(currentAngle, deltaTime);
    });

    if (isAnimating) {
        requestAnimationFrame(animate);
    }
}

function tiltSeesaw(angle) {
    currentAngle = angle;
    seesaw.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
}

// Event listeners
leftArea.addEventListener('mouseenter', () => tiltSeesaw(-5));
rightArea.addEventListener('mouseenter', () => tiltSeesaw(5));
container.addEventListener('mouseleave', () => tiltSeesaw(0));

// Make buttons interactive
physicsButtons.forEach(physicsButton => {
    physicsButton.element.addEventListener('click', () => {
        physicsButton.element.style.backgroundColor = 
            `hsl(${Math.random() * 360}, 70%, 60%)`;
    });
});

// Start animation loop
requestAnimationFrame(animate);