let stars = [];
let speed = 0;
let maxSpeed = 5; // Reduced max speed
let friction = 0.98;
let stopTimer = 0;
let slowdownDelay = 5000; // 5 seconds
let centerZoneRadius = 100; // Radius of the central zone
let centerSpeedMultiplier = 10; // Speed multiplier for center

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 500; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0);

  let distanceFromCenter = dist(mouseX, mouseY, width / 2, height / 2);
  let targetSpeed = distanceFromCenter / 100; // Slower speed calculation

  if (targetSpeed > 0) {
    speed = targetSpeed;
    stopTimer = millis();
  } else if (millis() - stopTimer > slowdownDelay) {
    speed *= friction;
  }

  translate(width / 2, height / 2);

  let angle;
  if (distanceFromCenter < centerZoneRadius) {
    angle = undefined; // Direct forward movement
    speed = targetSpeed * centerSpeedMultiplier; // Apply speed multiplier for center
  } else {
    let normalizedDistance = map(distanceFromCenter, centerZoneRadius, width / 2, 0, 1);
    let targetAngle = atan2(mouseY - height / 2, mouseX - width / 2);
    angle = lerp(0, targetAngle, normalizedDistance);
  }

  for (let star of stars) {
    star.update(angle);
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

  update(angle) {
    let dx, dy;
    if (angle === undefined) {
      this.z -= speed; // Move forward
    } else {
      dx = cos(angle) * speed;
      dy = sin(angle) * speed;
      this.x -= dx;
      this.y -= dy;
      this.z -= speed;
    }

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
