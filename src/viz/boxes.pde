int cellSize = 16;

void setup() {
  frameRate(40);
  size(500, 500);
  background(0);
  fill(0, 0, 0, 0);
  strokeWeight(1);
  smooth();
  rectMode(CENTER);
}

void draw() {
  background(0);
  for (int y = 0; y <= height; y += cellSize) {
    for (int x = 0; x <= width; x += cellSize) {
      float boxRadius = radians((frameCount + x + y) * 1.5);
      float boxScale = (1 + sin(boxRadius)) / 2;
      float boxSize = cellSize * 0.1 + cellSize * 1.1 * boxScale;
      stroke(155 + 100 * boxScale);
      pushMatrix();
      translate(x, y);
      rotate(boxRadius);
      rect(0, 0, boxSize, boxSize);
      popMatrix();
    }
  }
}
