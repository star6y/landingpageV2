import React, { useEffect, useRef } from 'react';

const AnimationCanvas = ({ text, textSize, color, constellation }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = {
      x: null,
      y: null,
      radius: 80
    };


    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    ctx.fillStyle = 'white';
    ctx.font = `${textSize}px Helvetica`;
    ctx.fillText(text, 1, 200);
    const textCoordinates = ctx.getImageData(0, 0, 800, 400);

    class Particle {
      constructor(x, y) {
        this.x = x + 100;
        this.y = y;
        this.size = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 100) + 1;
      }

      draw() {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;


        let force = (maxDistance - distance) / maxDistance;

        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 30;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 30;
          }
        }
      }
    }

    function init() {
      const particleArray = [];
      for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
          if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
            let positionX = x * 1 + 10;
            let positionY = y * 1 + 10;
            particleArray.push(new Particle(positionX, positionY));
          }
        }
      }
      particlesRef.current = particleArray;
    }

    init();

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach(particle => {
        particle.draw();
        particle.update();
      });
      if (constellation) {
        connectParticles();
      }
      requestAnimationFrame(animate);
    }

    function connectParticles() {
      let opacity = 1;
      for (let a = 0; a < particlesRef.current.length; a++) {
        for (let b = a; b < particlesRef.current.length; b++) {
          let dx = particlesRef.current[a].x - particlesRef.current[b].x;
          let dy = particlesRef.current[a].y - particlesRef.current[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 20) {
            opacity = 1 - (distance / 30);
            ctx.strokeStyle = 'rgba(255, 0, 0,' + opacity + ')';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[a].x, particlesRef.current[a].y);
            ctx.lineTo(particlesRef.current[b].x, particlesRef.current[b].y);
            ctx.stroke();
          }
        }
      }
    }

    animate();
    // console.log(text, textSize, particleArray)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [text, textSize, color, constellation]);
  

  return <canvas ref={canvasRef} id="canvas1"></canvas>;
};

export default AnimationCanvas;




























import React, { useEffect, useRef, useState } from 'react';

const AnimationCanvas = ({ text, color, constellation }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  const calculateTextSize = (width) => {
    if (width < 400) return 60;
    if (width < 950) return 100;
    return 120; // Adjust the divisor as needed for your desired text size
  };

  const [textSize, setTextSize] = useState(calculateTextSize(window.innerWidth));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const mouse = {
      x: null,
      y: null,
      radius: 50,
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleResize = () => {
      setDimensions({ width: container.clientWidth, height: container.clientHeight });
      setTextSize(calculateTextSize(container.clientWidth));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    ctx.fillStyle = 'white';
    ctx.font = `${textSize}px Helvetica`;

    const textY = canvas.width < 400 ? 80 : 150;
    // ctx.fillText(text, 0, textY);

    for (let i = 0; i < text.length; i++) {
      ctx.fillText(text[i], 0, textY * (i + 1))
    }

    const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);

    function init() {
      let minX = canvas.width;
      let maxX = 0;

      const particleArray = [];
      for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
          if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
          }
        }
      }

      const textWidth = maxX - minX;
      const textX = (canvas.width - textWidth) / 2;

      for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
          if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
            const positionX = x + textX - minX; // Adjust particle position based on textX and minX
            const positionY = y + textY - textSize;
            particleArray.push(new Particle(positionX, positionY));
          }
        }
      }

      particlesRef.current = particleArray;
    }

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 100) + 1;
      }

      draw() {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;

        let force = (maxDistance - distance) / maxDistance;

        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 30;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 30;
          }
        }
      }
    }

    init();

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((particle) => {
        particle.draw();
        particle.update();
      });
      if (constellation) {
        connectParticles();
      }
      requestAnimationFrame(animate);
    }

    function connectParticles() {
      let opacity = 1;
      for (let a = 0; a < particlesRef.current.length; a++) {
        for (let b = a; b < particlesRef.current.length; b++) {
          let dx = particlesRef.current[a].x - particlesRef.current[b].x;
          let dy = particlesRef.current[a].y - particlesRef.current[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 20) {
            opacity = 1 - distance / 30;
            ctx.strokeStyle = 'rgba(255, 0, 0,' + opacity + ')';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[a].x, particlesRef.current[a].y);
            ctx.lineTo(particlesRef.current[b].x, particlesRef.current[b].y);
            ctx.stroke();
          }
        }
      }
    }

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [text, textSize, color, constellation, dimensions]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} id="canvas1"></canvas>
    </div>
  );
};

export default AnimationCanvas;
