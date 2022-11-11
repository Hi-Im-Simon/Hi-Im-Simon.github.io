import Matter from 'matter-js';

export default class Game {
    constructor(Engine, Render, ch, cw, sr) {
        this.Engine = Engine;
        this.Render = Render;
        this.ch = ch;
        this.cw = cw;
        this.sr = sr;
        this.parts = [];
    }

    showParts(parts) {
        // create visible elements
        Matter.World.add(this.Engine.world, parts);
        if (parts.isArray) this.parts.concat(parts);
        else this.parts.push(parts);
    }

    createWalls() {
        return [
            // Matter.Bodies.rectangle(cw / 2, -500, cw, 1000, { isStatic: true }),       // top
            Matter.Bodies.rectangle(-500, this.ch * 5, 1000, this.ch * 10, { isStatic: true }),       // left
            Matter.Bodies.rectangle(this.cw / 2, this.ch + 500, this.cw, 1000, { isStatic: true }),   // bottom
            Matter.Bodies.rectangle(this.cw + 500, this.ch * 5, 1000, this.ch * 10, { isStatic: true }),   // right
        ];
    }

    createParts() { return [...this.createWalls()]; }

    bindEvents() {}
}