import SpriteSheet from "./SpriteSheet.js";
import { loadImage } from "./loaders.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

loadImage("./img/spritesheet.png").then((image) => {
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define("ground", 0, 35);
  sprites.draw("ground", context, 100, 100);
});
