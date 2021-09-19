var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { system } from '/pokit/ecs.js';
window.Pokit.ecs.registerComponent("moveable", {
    speed: 0
});
let Move = class Move {
    defaultComponent = "moveable";
    engine;
    input;
    constructor(engine) {
        this.engine = engine;
    }
    init(entity) {
        this.input = this.engine.modules.get("input");
    }
    update(entity) {
        let speed = entity.get("moveable").speed;
        entity.position.y -= this.input.get("up") * speed;
        entity.position.y += this.input.get("down") * speed;
        entity.position.x -= this.input.get("left") * speed;
        entity.position.x += this.input.get("right") * speed;
    }
};
Move = __decorate([
    system()
], Move);
