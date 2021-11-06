import Entity from "./Entity.js";
import Velocity from "./traits/Velocity.js";
import Jump from "./traits/Jump.js";
import { loadPlayerSprite } from "./sprites.js";

export function createPlayer() {
  return loadPlayerSprite().then((sprite) => {
    const player = new Entity();

    player.addTrait(new Velocity());
    player.addTrait(new Jump());

    player.draw = function drawPlayer(context) {
      sprite.draw("idle", context, this.pos.x, this.pos.y);
    };

    return player;
  });
}
