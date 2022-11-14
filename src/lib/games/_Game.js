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
        
        this.Engine.world.gravity.y = 0.1 * this.sr;
        
        Matter.Runner.run(this.Engine);
        Matter.Render.run(this.Render);
    }

    _createWalls() {
        let walls = [
            // Matter.Bodies.rectangle(cw / 2, -500, cw, 1000, { isStatic: true }),       // top
            Matter.Bodies.rectangle(-500, this.ch * 50, 1000, this.ch * 100, { isStatic: true }),       // left
            Matter.Bodies.rectangle(this.cw / 2, this.ch + 500, this.cw, 1000, { isStatic: true }),   // bottom
            Matter.Bodies.rectangle(this.cw + 500, this.ch * 50, 1000, this.ch * 100, { isStatic: true }),   // right
        ];

        for (let wall of walls) {
            wall.dontJoinOnTouch = true;
        }

        return walls;
    }

    // set how fast should the element move with every tick and if it should ignore the world's gravity
    // x, y default is 0 0 false
    setGravity(element, x = 0, y = 0, ignoreWorldGravity = true) {
        const gravity = this.Engine.world.gravity;
        let nx = 0, ny = 0;
        if (ignoreWorldGravity) {
            nx += (-gravity.x * gravity.scale * element.mass);
            ny += (-gravity.y * gravity.scale * element.mass);
        }
        nx += (x * gravity.scale * element.mass * this.sr);
        ny += (y * gravity.scale * element.mass * this.sr);

        if (!element.gravity) {
            element.gravity = [nx, ny];

            Matter.Events.on(this.Engine, 'beforeUpdate', () => {
                x = element.gravity[0];
                y = element.gravity[1];

                Matter.Body.applyForce(element, element.position, {
                    x: x,
                    y: y
                });
            });
        }
        else element.gravity = [nx, ny];
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
            this.setGravity(part, 0, 0.5);
            this.showParts(part);
            return part;
        }
    }

    showParts(parts) {
        // create visible elements
        Matter.World.add(this.Engine.world, parts);

        if (Array.isArray(parts)) {
            for (let part of parts) {
                this.parts.push(part);
            }
        }
        else {
            this.parts.push(parts);
        }
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

    eventSaveMousePosition() {
        // save current mouse position on mouse move
        this.element.onmousemove = (event) => {
            const rect = event.target.getBoundingClientRect();
            let x = (event.clientX - rect.left) * (925 / rect.height) * this.sr; //x position within the element
            let y = (event.clientY - rect.top) * (925 / rect.height) * this.sr;  //y position within the element
            this.mousePosition = [x, y];
        };

        this.element.onmouseleave = (event) => {
            this.mousePosition = false;
        };
    }

    // detect when mouse buttons are pressed and released
    eventDetectMousePress() {
        this.element.onmousedown = () => this.isPressed.left = true;
        this.element.onmouseup = () => this.isPressed.left = false;
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