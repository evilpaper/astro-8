import { loadLevel } from "./loaders.js";
import { loadCharacterSprites, loadBackgroundSprites } from "./sprites.js";

function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; ++x) {
      for (let y = y1; y < y2; ++y) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

// The compositors role is to draw the layers in order
// A layer is a function that draw on a context
class Compositor {
  constructor() {
    this.layers = [];
  }
  draw(context) {
    this.layers.forEach((layer) => {
      layer(context);
    });
  }
}

function createBackgroundLayer(backgrounds, sprites) {
  // Initialize new buffer
  // The buffer is used to avoid drawing every single tile on every update call
  // Instead we draw the background once on another canvas and then place it on our main canvas
  const buffer = document.createElement("canvas");
  buffer.width = 256;
  buffer.height = 240;

  backgrounds.forEach((background) => {
    drawBackground(background, buffer.getContext("2d"), sprites);
  });

  // We return the function that actually draws
  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0);
  };
}

Promise.all([
  loadCharacterSprites(),
  loadBackgroundSprites(),
  loadLevel("1-1"),
]).then(([characterSprites, sprites, level]) => {
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);
  comp.layers.push(backgroundLayer);

  const pos = {
    x: 48,
    y: 24,
  };
  function update() {
    comp.draw(context);
    characterSprites.draw("idle", context, pos.x, pos.y);
    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }
  update();
});
