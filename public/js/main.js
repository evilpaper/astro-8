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

class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
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

  const gravity = 0.5;

  const pos = new Vec2(48, 100);

  const vel = new Vec2(2, -10);

  const characterLayer = createSpriteLayer(characterSprites, pos);
  comp.layers.push(characterLayer);

  function update() {
    comp.draw(context);

    pos.x += vel.x;
    pos.y += vel.y;
    vel.y += gravity;
    requestAnimationFrame(update);
  }
  update();
});
