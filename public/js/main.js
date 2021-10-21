import { loadLevel } from "./loaders.js";
import { loadCharacterSprites, loadBackgroundSprites } from "./sprites.js";
import { Compositor } from "./Compositor.js";
import { createBackgroundLayer } from "./layers.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

function createSpriteLayer(entity) {
  return function drawSpriteLayer(context) {
    entity.draw(context);
  };
}
class Vec2 {
  constructor(x, y) {
    this.set(x, y);
  }
  set(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Entity {
  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
  }
}

Promise.all([
  loadCharacterSprites(),
  loadBackgroundSprites(),
  loadLevel("1-1"),
]).then(([characterSprite, backgroundSprites, level]) => {
  const comp = new Compositor();
  // The return value of createBackgroundLayer is a draw function. When we call that function as we do in
  // the compositor it will draw the background to the context
  const backgroundLayer = createBackgroundLayer(
    level.backgrounds,
    backgroundSprites
  );
  comp.layers.push(backgroundLayer);

  const gravity = 0.5;

  const player = new Entity();
  player.pos.set(48, 100);
  player.vel.set(2, -10);

  player.update = function updatePlayer() {
    this.pos.x += player.vel.x;
    this.pos.y += player.vel.y;
  };

  player.draw = function drawPlayer(context) {
    characterSprite.draw("idle", context, this.pos.x, this.pos.y);
  };

  const characterLayer = createSpriteLayer(player);
  comp.layers.push(characterLayer);

  function update() {
    comp.draw(context);
    player.update();
    player.vel.y += gravity;
    requestAnimationFrame(update);
  }
  update();
});
