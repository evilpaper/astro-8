import SpriteSheet from "./SpriteSheet.js";
import { loadImage, loadLevel } from "./loaders.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

loadImage("./img/spritesheet.png").then((image) => {
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define("ground", 0, 35);
  sprites.define("space", 66, 35);

  loadLevel("1-1").then((level) => {
    console.log(level);
  });

  for (let x = 0; x < 40; ++x) {
    for (let y = 0; y < 16; ++y) {
      sprites.drawTile("space", context, x, y);
    }
  }
  for (let x = 0; x < 40; ++x) {
    for (let y = 14; y < 16; ++y) {
      sprites.drawTile("ground", context, x, y);
    }
  }
});
