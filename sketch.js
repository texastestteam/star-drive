let stars = [];
let speed = 0;
let maxSpeed = 10;
let friction = 0.98;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 500; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0);
  
  let targetSpeed = dist(mouseX, mouseY, pmouseX, pmouseY) / 10;
  speed = lerp(speed, targetSpeed, 0.1);
  speed *= friction;
  
  translate(width / 2, height / 2);
  for (let star of stars) {
    star.update();
    star.show();
  }
}

class Star {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;
  }
  
  update() {
    this.z -= speed;
    if (this.z < 1) {
      this.reset();
      this.z = width;
      this.pz = this.z;
    }
  }
  
  show() {
    fill(255);
    noStroke();
    
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    
    let r = map(this.z, 0, width, 8, 0);
    
    ellipse(sx, sy, r, r);
    
    let px = map(this.x / this.pz, 0, 1, 0, width);
    let py = map(this.y / this.pz, 0, 1, 0, height);
    
    this.pz = this.z;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
