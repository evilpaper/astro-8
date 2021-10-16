import SpriteSheet from "./SpriteSheet.js";
import { loadImage } from "./loaders.js";

export function loadCharacterSprites() {
  return loadImage("./img/spritesheet.png").then((image) => {
    const sprites = new SpriteSheet(image, 26, 35);
    sprites.define("idle", 0, 0, 25, 35);
    return sprites;
  });
}

export function loadBackgroundSprites() {
  return loadImage("./img/spritesheet.png").then((image) => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.defineTile("ground", 0, 35);
    sprites.defineTile("space", 66, 35);
    return sprites;
  });
}
