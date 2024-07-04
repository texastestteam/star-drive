let stars = [];
let speed = 0;
let maxSpeed = 5; // Reduced max speed
let friction = 0.98;
let stopTimer = 0;
let slowdownDelay = 5000; // 5 seconds
let centerZoneRadius = 100; // Radius of the central zone
let centerSpeedMultiplier = 2; // Speed multiplier for center
let mouseInactiveTime = 2000; // 2 seconds for mouse fade
let lastMouseMoveTime = 0; // Track the last mouse movement time
let starDensityMultiplier = 0.2; // Multiplier for star density

// Star size ranges for each color group
let whiteStarSize = [2, 3, 5];
let yellowOrangeStarSize = [2, 3, 5, 4, 6];
let redStarSize = [1, 2, 3, 3, 5];
let blueStarSize = [5, 6, 8];

function setup() {
  createCanvas(windowWidth, windowHeight);
  createStars(500 * starDensityMultiplier); // Create stars based on density multiplier
}

function draw() {
  background(0);

  let distanceFromCenter = dist(mouseX, mouseY, width / 2, height / 2);
  let targetSpeed = distanceFromCenter / 100; // Calculate speed based on distance from center

  if (targetSpeed > 0) {
    speed = targetSpeed;
    stopTimer = millis();
  } else if (millis() - stopTimer > slowdownDelay) {
    speed *= friction;
  }

  translate(width / 2, height / 2); // Center the origin

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

  handleMouseVisibility(); // Handle mouse visibility
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
    this.setColorAndSize();
  }

  setColorAndSize() {
    let rand = random(100);
    if (rand < 75) { // 75% white
      this.color = color(255, 255, 255); // White
      this.size = random(whiteStarSize[0], whiteStarSize[2]);
    } else if (rand < 85) { // 10% yellow/orange
      this.color = random() < 0.5 ? color(255, 255, 0) : color(255, 165, 0); // Yellow or Orange
      this.size = random(yellowOrangeStarSize[0], yellowOrangeStarSize[1]);
    } else if (rand < 95) { // 10% red
      this.color = color(255, 0, 0); // Red
      this.size = random(redStarSize[0], redStarSize[4]);
    } else { // 5% blue
      this.color = color(0, 0, 255); // Blue
      this.size = random(blueStarSize[0], blueStarSize[2]); // Larger blue stars
    }
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
    fill(this.color);
    noStroke();

    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

    let r = map(this.z, 0, width, this.size * 2, this.size * 0.5);

    ellipse(sx, sy, r, r);

    let px = map(this.x / this.pz, 0, 1, 0, width);
    let py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;
  }
}

// Function to handle mouse visibility
function handleMouseVisibility() {
  if (millis() - lastMouseMoveTime > mouseInactiveTime) {
    noCursor(); // Hide the cursor
  } else {
    cursor(); // Show the cursor
  }
}

// Update last mouse move time
function mouseMoved() {
  lastMouseMoveTime = millis(); // Update the last mouse move time
}

// Create stars based on density multiplier
function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push(new Star());
  }
}

// Adjust canvas size on window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createStars(500 * starDensityMultiplier); // Recreate stars with updated canvas size
}
