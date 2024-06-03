const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight
let particleArray = []
let adjustX = 10;
let adjustY = 10;

const mouse = {
  x: null,
  y: null,
  radius: 80 // size of mouse area where particles interact with mouse
}

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
})

ctx.fillStyle = 'white'
ctx.font = '150px Helvetica';
// ctx.fillText('A', 10, 60);
ctx.fillText('Baby Cute', 50, 200); // text, x pos, y pos, max width (optional)
// ctx.fillText('Anicescu', 0, 330);
const textCoordinates = ctx.getImageData(0, 0, 800, 400)

// need to save all the pixels of the above letter, store them
const data = ctx.getImageData(0, 0, 100, 100)

class Particle {
  constructor(x, y) {
    this.x = x + 100;
    this.y = y;
    this.size = 1;
    this.baseX = this.x; // initial position to return to
    this.baseY = this.y;
    this.density = (Math.random() * 100) + 1 // weight of particle (how fast it moves away from mouse)
  }

  draw() {
    ctx.fillStyle = 'pink';
    ctx.beginPath();  // pencil touching down
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.closePath(); // lift pencil up
    ctx.fill() // fill path with color
  }

  update() {  // push particles if mouse is close
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius; // max distance from mouse

    // take the distance of pixel from mouse, and divide that by mouse max interaction area
    // This gives us a range from 0 to 1, when number closer to 1 is closer to mouse
    // Pixels closer to the mouse should move faster
    // mouse range = 100,     pixel A dist from mouse = 20
    // 100 - 20 = 80        80 / 100 = .8  or 80%
    // Interpretation: - particle has 80% of it's max speed
    //                 - particle lost 20% of it's max speed
    let force = (maxDistance - distance) / maxDistance;

    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x != this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx/30;
      }
      if (this.y != this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy/30;
      }
      // this.size = 3;
    }
  }
}
function init() {
  particleArray = []
  // show only pixels of text, and not the background of the text
  // y = row, y2 = holds img data option from scaning for text,
  // since y is the line, we go line by line from the scanned img
  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    // now we read each pixel in the line above, till we get to width of line/img
    for (let x = 0, x2 = textCoordinates.width; x< x2; x++) {
      //         r  g  b  a   | next pixel...    
      // data = [0, 0, 0, 0,  | 145, 247, 8, 201,  | ...]
      // Each pixel is made of rgba, so there are 1, 2, 3, 4 values we care about
      // The 4th one, alpha, is the opancy (0 - 255). If it's oppancy is at least
      // half (50%), we will take this pixel.
      // If we have 100 w by 100 h, that is 10,000 pixels, so array is 40,000 long of rgba
      // so we need to skip to every 4th element 
      if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
        // x & y coord of pixel we could see
        // Multiply by # to space out, so it's not too close together
        let spread = 1;
        let positionX = x * spread + adjustX; 
        let positionY = y * spread + adjustY;
        particleArray.push(new Particle(positionX, positionY))
      }
    }
  }

  // ### of particles, randomly placed
  // for(let i = 0; i < 500; i++) {
  //   let x = Math.random() * 500;
  //   let y = Math.random() * 500;
  //   particleArray.push(new Particle(x, y))
  // }
}
init()

// refreshing canvas for every frame
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  // connect()
  requestAnimationFrame(animate)
}
animate();


// add the constelation effect
function connect() {
  let opacity = 1;
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      let dx = particleArray[a].x - particleArray[b].x;
      let dy = particleArray[a].y - particleArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 20) {
        opacity = 1 - (distance/30);
        ctx.strokeStyle = 'rgba(255, 0, 0,' + opacity + ')';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }
    }
  }
}