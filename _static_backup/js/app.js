document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initGlassTilt();
});

function initClock() {
    const clockEl = document.getElementById('clock');

    function update() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        clockEl.textContent = `${hours}:${minutes}`;
    }

    update();
    setInterval(update, 1000);
}

function initGlassTilt() {
    // Select elements
    const desktop = document.getElementById('os-desktop');
    const mainWindow = document.querySelector('.glass-window');
    const layers = document.querySelectorAll('.ambient-layer');

    // Configuration
    const STATE = {
        mouseX: 0,
        mouseY: 0,
        targetX: 0,
        targetY: 0,
        // Damping factor: Lower = smoother/slower (0.05 is very fluid)
        lerpFactor: 0.05
    };

    // Track Mouse
    document.addEventListener('mousemove', (e) => {
        // Normalize to -1 to 1
        STATE.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        STATE.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    });

    // Animation Loop
    function animate() {
        // Lerp current values towards target
        STATE.mouseX += (STATE.targetX - STATE.mouseX) * STATE.lerpFactor;
        STATE.mouseY += (STATE.targetY - STATE.mouseY) * STATE.lerpFactor;

        // Apply effects
        applyParallax();
        applyTilt();

        requestAnimationFrame(animate);
    }

    function applyTilt() {
        const tiltX = STATE.mouseY * -5; // Max 5 deg tilt
        const tiltY = STATE.mouseX * 5;

        // Apply to main window
        if (mainWindow) {
            mainWindow.style.transform = `
                perspective(1000px)
                rotateX(${tiltX}deg)
                rotateY(${tiltY}deg)
                translateZ(0)
            `;

            // Subtle Window Glare
            // Calculate a gradient position based on mouse to simulate light moving across glass
            const glareX = 50 + (STATE.mouseX * 40); // 10% to 90%
            const glareY = 50 + (STATE.mouseY * 40);
            mainWindow.style.background = `
                radial-gradient(
                    circle at ${glareX}% ${glareY}%, 
                    rgba(255, 255, 255, 0.08) 0%, 
                    transparent 60%
                ),
                linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(20,20,30,0.2) 100%)
            `;
        }
    }

    function applyParallax() {
        // Layers move at different speeds for depth
        // Background moves opposite to mouse (feels far away)
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 15;
            const x = STATE.mouseX * -speed;
            const y = STATE.mouseY * -speed;
            layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });

        // Floating UI elements (Dock, Top Bar) move slightly WITH mouse (feels closer)
        const uiX = STATE.mouseX * 5;
        const uiY = STATE.mouseY * 5;

        const dock = document.querySelector('.glass-dock');
        if (dock) dock.style.transform = `translate3d(${uiX}px, ${uiY}px, 0)`;

        // Note: Top bar is fixed/sticky usually, but subtle movement creates "floating" feel
        const topBar = document.querySelector('.top-bar');
        if (topBar) topBar.style.transform = `translate3d(${uiX * 0.5}px, ${uiY * 0.5}px, 0)`;
    }

    animate();
}
