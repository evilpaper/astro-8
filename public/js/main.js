function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.addEventListener("load", () => resolve(image));
  });
}

class SpriteSheet {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name, x, y) {
    const buffer = document.createElement("canvas");
    buffer.width = this.width;
    buffer.height = this.height;
    buffer
      .getContext("2d")
      .drawImage(
        this.image,
        x,
        y,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height
      );
    this.tiles.set(name, buffer);
  }

  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }

  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

loadImage("./img/spritesheet.png").then((image) => {
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define("ground", 0, 35);
  sprites.draw("ground", context, 100, 100);
});
