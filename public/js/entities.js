import Entity from "./Entity.js";
import { loadPlayerSprite } from "./sprites.js";

export function createPlayer() {
  return loadPlayerSprite().then((sprite) => {
    const player = new Entity();
    player.pos.set(48, 100);
    player.vel.set(2, -10);

    player.update = function updatePlayer() {
      this.pos.x += player.vel.x;
      this.pos.y += player.vel.y;
    };

    player.draw = function drawPlayer(context) {
      sprite.draw("idle", context, this.pos.x, this.pos.y);
    };

    return player;
  });
}
