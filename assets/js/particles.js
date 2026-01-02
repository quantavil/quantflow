const ParticleSystem = {
    trigger(x, y) {
        const count = 20;
        const origin = { x: x || window.innerWidth / 2, y: y || window.innerHeight / 2 };

        for (let i = 0; i < count; i++) {
            this.createParticle(origin);
        }
    },

    createParticle(origin) {
        const p = document.createElement('div');
        p.style.position = 'fixed';
        p.style.width = '4px';
        p.style.height = '4px';
        p.style.background = '#00D26A';
        p.style.left = origin.x + 'px';
        p.style.top = origin.y + 'px';
        p.style.pointerEvents = 'none';
        p.style.zIndex = '9999';

        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 4;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        document.body.appendChild(p);

        let opacity = 1;
        let posX = origin.x;
        let posY = origin.y;

        const animate = () => {
            opacity -= 0.02;
            posX += vx;
            posY += vy;

            p.style.opacity = opacity;
            p.style.transform = `translate(${posX - origin.x}px, ${posY - origin.y}px)`;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                p.remove();
            }
        };
        requestAnimationFrame(animate);
    }
};
