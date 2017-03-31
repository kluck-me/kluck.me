int cellSize = 16;

void setup() {
  frameRate(40);
  size(500, 500);
  background(0);
  fill(0, 0, 0, 0);
  strokeWeight(1);
  smooth();
}

void draw() {
  background(0);
  for (int y = 0; y <= height; y += cellSize) {
    for (int x = 0; x <= width; x += cellSize) {
      float circleScale = sin(radians((frameCount + x + y) * 1.5));
      float circleSize = cellSize + cellSize * 0.8 * circleScale;
      stroke(200 + 55 * circleScale);
      ellipse(x, y, circleSize, circleSize);
    }
  }
}
