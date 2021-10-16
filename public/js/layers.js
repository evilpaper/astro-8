function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; ++x) {
      for (let y = y1; y < y2; ++y) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

// createBackgroundLayer is a higher order function i.e. a function that returns a function
// Layers are stored in the layers array on our compositor. In the compositors draw method we loop over
// all layers and call the layer with our context
export function createBackgroundLayer(backgrounds, sprites) {
  // Initialize a new buffer
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
