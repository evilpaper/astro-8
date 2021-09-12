import SpriteSheet from "./SpriteSheet.js";
import { loadImage } from "./loaders.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

loadImage("./img/spritesheet.png").then((image) => {
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define("ground", 0, 35);
  sprites.define("space", 66, 35);

  for (let x = 0; x < 24; ++x) {
    for (let y = 0; y < 16; ++y) {
      sprites.draw("space", context, x * 16, y * 16);
    }
  }
  sprites.draw("ground", context, 100, 100);
});
