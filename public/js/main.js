import { loadLevel } from "./loaders.js";
import { loadBackgroundSprites } from "./sprites.js";
import { Compositor } from "./Compositor.js";
import { createPlayer } from "./entities.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

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

    const gravity = 30;
    player.pos.set(48, 100);
    player.vel.set(200, -600);

    const characterLayer = createSpriteLayer(player);
    comp.layers.push(characterLayer);

    const deltaTime = 1 / 60;
    let accumulatedTime = 0;
    let lastTime = 0;

    function update(time) {
      accumulatedTime += (time - lastTime) / 1000;

      while (accumulatedTime > deltaTime) {
        comp.draw(context);
        player.update(deltaTime);
        player.vel.y += gravity;
        accumulatedTime -= deltaTime;
      }

      requestAnimationFrame(update);

      lastTime = time;
    }
    update(0);
  }
);
