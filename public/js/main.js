import { loadLevel } from "./loaders.js";
import { createPlayer } from "./entities.js";
import { loadBackgroundSprites } from "./sprites.js";
import { Compositor } from "./Compositor.js";
import { createBackgroundLayer } from "./layers.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

function createSpriteLayer(entity) {
  return function drawSpriteLayer(context) {
    entity.draw(context);
  };
}

Promise.all([createPlayer(), loadBackgroundSprites(), loadLevel("1-1")]).then(
  ([player, backgroundSprites, level]) => {
    const comp = new Compositor();
    // The return value of createBackgroundLayer is a draw function. When we call that function as we do in
    // the compositor it will draw the background to the context
    const backgroundLayer = createBackgroundLayer(
      level.backgrounds,
      backgroundSprites
    );
    comp.layers.push(backgroundLayer);

    const gravity = 0.5;

    const characterLayer = createSpriteLayer(player);
    comp.layers.push(characterLayer);

    function update() {
      comp.draw(context);
      player.update();
      player.vel.y += gravity;
      requestAnimationFrame(update);
    }
    update();
  }
);
