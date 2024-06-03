import React, { useEffect, useRef, useState } from 'react';

const AnimationCanvas = ({ source, text, color = { r: 229, g: 118, b: 118 }, color2 = { r: 200, g: 17, b: 70 },
  userTextSize, constellation, fixedY, textDistY = 50, particleSpread = 1, particleSize = 1, mouseRad }) => {

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameId = useRef(null); // Ref to store the animation frame ID
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Depending on the screen size, set a max text size
  const calculateTextSize = (width) => {
    if (width < 400) return Math.min(60, userTextSize);
    if (width < 950) return Math.min(100, userTextSize);
    return Math.min(180, userTextSize);
  };

  const [textSize, setTextSize] = useState(calculateTextSize(window.innerWidth));

  particleSpread = parseFloat(particleSpread)

  // const color2 = "rgb(200, 17, 70)"

  // console.log("color: ", color)
  // console.log("color2: ", color2)





  // Listen to window resizing so that text can be position can be readjusted to the middle
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      setDimensions({ width: container.clientWidth, height: container.clientHeight });
      setTextSize(calculateTextSize(container.clientWidth));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    if (userTextSize !== textSize) {
      setTextSize(calculateTextSize(window.innerWidth));
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const mouse = {
      x: null,
      y: null,
      // size of circle around mouse that interacts with particles
      radius: mouseRad,
    };

    // Usually the canvas starts in the very top-left corner of the page.
    // The canvas on the website is centered. The coordinates of the mouse
    // are still based on the canvas being in the top-left, but we need to
    // adjust these mouse coordinates so it's actual position is over the 
    // new canvas position, which is centered horizontally on the page.
    const handleMouseMove = (event) => {
      // Get the position of the canvas within the page. This is relative 
      // to the viewport, or how the users is viewing the page
      const rect = canvas.getBoundingClientRect();
      // Now we calculate the mouse position over the actual canvas position.
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    // If the window size changes, then we adjust adjust the moust so it
    // is on the canvas.
    window.addEventListener('mousemove', handleMouseMove);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // This draws the text, with this font and size
    ctx.fillStyle = 'white';
    ctx.font = `${textSize}px Helvetica`;

    // depending on source, we need different Y-axis spacing between words
    if (source = "Home" && window.innerWidth < 400) {
      textDistY = 80;
    }
    const textY = Number(textDistY);

    // Words come in a string, and a " " means put word on the next line
    let words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      ctx.fillText(words[i], 0, textY * (i + 1)); // This command actually "draws" text ot canvas
    }

    // We read the whole canvas
    const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);


    // Initiate the particles onto the canvas
    function init() {
      let minX = canvas.width;
      let maxX = 0;

      // The below loops find the left most and right most pixel/particle in the text.
      // This is used to center the text on the canvas
      const particleArray = [];
      for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
          if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
          }
        }
      }

      // Now we know the width of the text, and can center it on the canvas
      const textWidth = maxX - minX;
      const textX = (canvas.width - textWidth * particleSpread) / 2;



// console.log("userTextSize", userTextSize)
// console.log("\ntextSize", textSize)
console.log("textY", textY, "   textDistY", textDistY, '   ghhe:', typeof textY, typeof textDistY)
// console.log("textX", textX)
// console.log("particleSpread", particleSpread,)


      // Now we add each new Particle into our array, to keep track of them and update them.
      // We can add more spacing to the particle as needed.
      // y = this row, y2 = num or rows of pixels in this "iamge" of text
      for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        // x = this pixel, x2 = num of pixels in this row
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
          //         r  g  b  a   | next pixel...    
          // data = [0, 0, 0, 0,  | 145, 247, 8, 201,  | ...]
          // Each pixel is made of rgba, so there are 1, 2, 3, 4 values we care about
          // The 4th one, alpha, is the opancy (0 - 255). If it's oppancy is at least half (50%), 
          // we will take this pixel. If we have 100 w by 100 h, that is 10,000 pixels,
          // so array is 40,000 long of rgba so we need to skip to every 4th element 
          if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
            const positionX = (x - minX) * particleSpread + textX;
            const positionY = (y + textY - textSize) * particleSpread;
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
        this.size = particleSize;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 100) + 1; // weight of particle, smaller = faster
      }

      draw() {
// let distance = Math.sqrt((this.x - this.baseX) ** 2 + (this.y - this.baseY) ** 2);
// let maxDistance = 100; // Adjust this value to control the effect
// let distanceRatio = Math.min(distance / maxDistance, 1);
// let colorIntensity = Math.floor(255 * distanceRatio);
// // ctx.fillStyle = `rgb(255, ${255 - colorIntensity}, ${0})`;



// let r = Math.floor(color.r + distanceRatio * (color2.r - color.r));
// let g = Math.floor(color.g + distanceRatio * (color2.g - color.g));
// let b = Math.floor(color.b + distanceRatio * (color2.b - color.b));
// ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

        ctx.fillStyle = color;
        ctx.beginPath();  // pencil touching down
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();  // lift pencil up
        ctx.fill();       // fill path with color
      }
    
      // Push particles if mouse is close
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
      
        // Take the distance of pixel from mouse, and divide that by mouse max interaction area.
        // This gives us a range from 0 to 1, when number closer to 1 is closer to mouse
        // Pixels closer to the mouse should move faster
        // mouse range = 100,     pixel P dist from mouse = 20
        // 100 - 20 = 80          80 / 100 = .8  or 80%
        // Interpretation: - particle has 80% of it's max speed
        //                 - particle lost 20% of it's max speed
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

    // Refresh canvas for every frame
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((particle) => {
        particle.draw();
        particle.update();
      });
      if (constellation) {
        connectParticles();
      }
      animationFrameId.current = requestAnimationFrame(animate);
    }

    // This is a constelation effect. Not used to avoid lag
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

      // If the user is not looking at a page with aprticle effects, the 
      // page should not be taking up resources by calculating Particle 
      // position, etc...
      cancelAnimationFrame(animationFrameId.current); 
    };
  }, [text, textSize, color, constellation, dimensions, userTextSize, textDistY,
    particleSpread, particleSize, mouseRad]);


  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} id="canvas1"></canvas>
    </div>
  );
};

export default AnimationCanvas;
