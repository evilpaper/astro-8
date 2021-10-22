import Entity from "./Entity.js";
import { loadPlayerSprite } from "./sprites.js";

export function createPlayer() {
  return loadPlayerSprite().then((sprite) => {
    const player = new Entity();

    player.update = function updatePlayer(deltaTime) {
      this.pos.x += player.vel.x * deltaTime;
      this.pos.y += player.vel.y * deltaTime;
    };

    player.draw = function drawPlayer(context) {
      sprite.draw("idle", context, this.pos.x, this.pos.y);
    };

    return player;
  });
}
