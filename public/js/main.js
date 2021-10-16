import { loadLevel } from "./loaders.js";
import { loadCharacterSprites, loadBackgroundSprites } from "./sprites.js";
import { Compositor } from "./Compositor.js";
import { createBackgroundLayer } from "./layers.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

function createSpriteLayer(sprite, pos) {
  return function drawSpriteLayer(context) {
    sprite.draw("idle", context, pos.x, pos.y);
  };
}

Promise.all([
  loadCharacterSprites(),
  loadBackgroundSprites(),
  loadLevel("1-1"),
]).then(([characterSprites, backgroundSprites, level]) => {
  const comp = new Compositor();
  // The return value of createBackgroundLayer is a draw function. When we call that function as we do in
  // the compositor it will draw the background to the context
  const backgroundLayer = createBackgroundLayer(
    level.backgrounds,
    backgroundSprites
  );
  comp.layers.push(backgroundLayer);

  const pos = {
    x: 48,
    y: 24,
  };

  const characterLayer = createSpriteLayer(characterSprites, pos);
  comp.layers.push(characterLayer);

  function update() {
    comp.draw(context);

    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }
  update();
});
