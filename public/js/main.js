import SpriteSheet from "./SpriteSheet.js";
import { loadImage, loadLevel } from "./loaders.js";

function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; ++x) {
      for (let y = y1; y < y2; ++y) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

function loadCharacterSprites() {
  return loadImage("./img/spritesheet.png").then((image) => {
    const sprites = new SpriteSheet(image, 26, 35);
    sprites.define("idle", 0, 0, 25, 35);
    return sprites;
  });
}

function loadBackgroundSprites() {
  return loadImage("./img/spritesheet.png").then((image) => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.defineTile("ground", 0, 35);
    sprites.defineTile("space", 66, 35);
    return sprites;
  });
}

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([
  loadCharacterSprites(),
  loadBackgroundSprites(),
  loadLevel("1-1"),
]).then(([characterSprites, sprites, level]) => {
  level.backgrounds.forEach((background) => {
    drawBackground(background, context, sprites);
  });
  characterSprites.draw("idle", context, 24, 24);
});
