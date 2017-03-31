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
      float circleScale = (1 + sin(radians((frameCount + x + y) * 1.5))) / 2;
      float circleSize = cellSize * 0.2 + cellSize * 1.6 * circleScale;
      stroke(155 + 100 * circleScale);
      pushMatrix();
      translate(x, y);
      ellipse(0, 0, circleSize, circleSize);
      popMatrix();
    }
  }
}
