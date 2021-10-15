/*
Defines the structure of a Spritesheet. Used to create instances of spritesheets.
The image is the image we use for the spritesheet. The image can have any size.
The width and height is the width and height of the individual sprites insisde 
the spritesheet. They are needed in order to define and draw the sprites. 
Example, if the width and height is 16 the spritesheet would contain indefinite number of sprites
with the width and height of 16. Not confuse width and heigth with width and height of image used to 
define the sprites. That is a compeltly other thing.
*/

export default class SpriteSheet {
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
