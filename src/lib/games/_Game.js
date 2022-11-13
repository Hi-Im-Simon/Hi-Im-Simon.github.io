import Matter from 'matter-js';

Matter.Common.setDecomp(require('poly-decomp'));

const lettersVerts = require('../../static/letters.json');

export default class Game {
    constructor(element) {
        this.element = element;
        this.ch = element.offsetHeight;
        this.cw = element.offsetWidth;  // adjust game window width here
        this.sr = this.ch / 929;    // size ratio (base = 1)

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

        this.boolButtons = {};
        this.functionalButtons = {};
        this.parts = [];
        this.Engine.world.gravity.y = 0.2 * this.sr;

        Matter.Runner.run(this.Engine);
        Matter.Render.run(this.Render);
    }

    _createWalls() {
        return [
            // Matter.Bodies.rectangle(cw / 2, -500, cw, 1000, { isStatic: true }),       // top
            Matter.Bodies.rectangle(-500, this.ch * 50, 1000, this.ch * 100, { isStatic: true }),       // left
            Matter.Bodies.rectangle(this.cw / 2, this.ch + 500, this.cw, 1000, { isStatic: true }),   // bottom
            Matter.Bodies.rectangle(this.cw + 500, this.ch * 50, 1000, this.ch * 100, { isStatic: true }),   // right
        ];
    }

    addMouseControl() {
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

    showStartingParts() {
        this.showParts([...this._createWalls()]);
    }

    showLetter(letter, color = '#ffffff', x = this.mousePosition[0], y = this.mousePosition[1], scale = 1) {
        if (lettersVerts['letters'].includes(letter)) {
            const part = Matter.Bodies.fromVertices(x, y, lettersVerts[letter], {
                render: {
                    fillStyle: color,
                }
            });
            Matter.Body.scale(part, scale * this.sr, scale * this.sr);

            this.showParts(part);
            return part;
        }
    }

    showParts(parts) {
        // create visible elements
        Matter.World.add(this.Engine.world, parts);
        if (parts.isArray) this.parts.concat(parts);
        else this.parts.push(parts);
    }

    removeParts(parts) {
        // remove elements
        Matter.World.remove(this.Engine.world, parts);
        if (parts.isArray) {
            for (let part of parts) {
                const i = this.parts.indexOf(part);
                this.parts.splice(i, 1);
            }
        }
        else {
            const i = this.parts.indexOf(parts);
            this.parts.splice(i, 1);
        }
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