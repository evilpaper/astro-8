// The compositors role is to draw the layers in order
// A layer is a function that draw on a context
export class Compositor {
  constructor() {
    this.layers = [];
  }
  draw(context) {
    this.layers.forEach((layer) => {
      layer(context);
    });
  }
}
