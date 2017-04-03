int cellSize = 16;
PGraphics pg;

void setup() {
  frameRate(40);
  size(500, 500);
  pg = createGraphics(cellSize, cellSize, JAVA2D);
}

void draw() {
  background(0);
  for (int y = 0; y <= height; y += cellSize) {
    for (int x = 0; x <= width; x += cellSize) {
      float circleScale = (1 + sin(radians((frameCount + x + y) * 1.5))) / 2;
      float circleSize = cellSize * 0.2 + cellSize * 1.2 * circleScale;
      pg.beginDraw();
      pg.smooth();
      pg.background(0);
      pg.fill(0, 0, 0, 0);
      pg.strokeWeight(1);
      pg.stroke(155 + 100 * circleScale);
      pg.ellipse(cellSize / 2, cellSize / 2, circleSize, circleSize);
      pg.endDraw();
      image(pg, x, y);
    }
  }
}
