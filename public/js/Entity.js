import { Vec2 } from "./math.js";

export class Trait {
  constructor(name) {
    this.NAME = name;
  }
  update() {
    console.warn("Unhandled update call in Trait");
  }
}

export default class Entity {
  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);

    // Traits let us compose the object with smaller fragments
    this.traits = [];
  }

  addTrait(trait) {
    this.traits.push(trait);
    // Expose the trait on the object. Make it able to call
    // player.jump.start etc.
    this[trait.NAME] = trait;
  }

  update(deltaTime) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime);
    });
  }
}
