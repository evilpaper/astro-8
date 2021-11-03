import Timer from "./Timer.js";
import { loadLevel } from "./loaders.js";
import { loadBackgroundSprites } from "./sprites.js";
import { Compositor } from "./Compositor.js";
import { createPlayer } from "./entities.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import Keyboard from "./KeyboardState.js";

const input = new Keyboard();

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

    const gravity = 1200;
    player.pos.set(20, 188);
    player.vel.set(100, -600);

    const characterLayer = createSpriteLayer(player);
    comp.layers.push(characterLayer);

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
      player.update(deltaTime);
      comp.draw(context);
      player.vel.y += gravity * deltaTime;
    };
    timer.start();
  }
);
