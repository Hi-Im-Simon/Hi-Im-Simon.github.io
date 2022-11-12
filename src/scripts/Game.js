import Matter from 'matter-js';

Matter.Common.setDecomp(require('poly-decomp'));

export default class Game {
    constructor(element) {
        this.ch = document.body.clientHeight;
        this.cw = this.ch / 2;  // adjust game window width here
        this.sr = this.ch / 925;    // size ratio (base = 1)

        this.Engine = Matter.Engine.create();
        this.Render = Matter.Render.create({
            element: element,
            engine: this.Engine,
            options: {
                width: this.cw,
                height: this.ch,
                wireframes: false,
                background: 'transparent',
            }
        });
        
        this.parts = [];
        this.Engine.world.gravity.y = 0.2;

        Matter.Runner.run(this.Engine);
        Matter.Render.run(this.Render);
        this._createParts();
    }

    _addMouseControl() {
        // add mouse control over elements inside canvas
        this.Mouse = Matter.Mouse.create(this.Render.canvas);
        this.MouseConstraint = Matter.MouseConstraint.create(this.Engine, {
            mouse: this.Mouse,
            constraint: {
                render: { visible: false },
            },
        });
        this.Render.mouse = this.Mouse;

        // create visible elements
        Matter.World.add(this.Engine.world, this.MouseConstraint);
    }

    showParts(parts) {
        // create visible elements
        Matter.World.add(this.Engine.world, parts);
        if (parts.isArray) this.parts.concat(parts);
        else this.parts.push(parts);
    }

    _createWalls() {
        return [
            // Matter.Bodies.rectangle(cw / 2, -500, cw, 1000, { isStatic: true }),       // top
            Matter.Bodies.rectangle(-500, this.ch * 5, 1000, this.ch * 10, { isStatic: true }),       // left
            Matter.Bodies.rectangle(this.cw / 2, this.ch + 500, this.cw, 1000, { isStatic: true }),   // bottom
            Matter.Bodies.rectangle(this.cw + 500, this.ch * 5, 1000, this.ch * 10, { isStatic: true }),   // right
        ];
    }

    _createParts() {
        this.showParts([...this._createWalls()]);
    }

    bindEvents() {}

    kill() {
        Matter.World.clear(this.Engine.world);
        Matter.Render.stop(this.Render);
        // prevent memory leak
        this.Render.canvas.remove();
        this.Render.canvas = null;
        this.Render.context = null;
        this.Render.textures = {};
    }
}