import Matter from 'matter-js';
import Game from './_Game';

export default class Game1 extends Game {
    constructor(element) {
        super(element);
        this.mousePosition = false;
        this.isPressed = { left: false };

        this.particleColor = 'white';

        // default values of button states, DON'T CHANGE IN CODE
        this._boolButtonsDefault = {
            snowFall: true,
        };
        // current values of button states
        this.boolButtons = this._boolButtonsDefault;

        this.Engine.world.gravity.y = 0.05 * this.sr;

        this.showStartingParts();
        this.bindEvents();
        this.addMouseControl();
        this.addMouseEffect();
    }

    // override createWalls to make particles sticky to the bottom
    _createWalls() {
        let walls = [
            // Matter.Bodies.rectangle(cw / 2, -500, cw, 1000, { isStatic: true }),       // top
            Matter.Bodies.rectangle(-500, this.ch * 50, 1000, this.ch * 100, { isStatic: true }),       // left
            Matter.Bodies.rectangle(this.cw / 2, this.ch + 500, this.cw, 1000, { isStatic: true }),   // bottom
            Matter.Bodies.rectangle(this.cw + 500, this.ch * 50, 1000, this.ch * 100, { isStatic: true }),   // right
        ];

        walls[0].dontJoinOnTouch = true;
        walls[1].dontJoinOnTouch = true;
        walls[2].dontJoinOnTouch = true;

        return walls;
    }

    addMouseEffect() {
        if (this.mousePosition) {
            const particle = Matter.Bodies.circle(...this.mousePosition, (Math.random() + 0.5) * this.sr, {
                render: {
                    fillStyle: this.particleColor,
                }
            });
            
            // if LMB is pressed and not in building mode, don't remove particles
            if (!this.isPressed.left) {
                setTimeout(() => this.removeParts(particle), 250);
                particle.dontJoinOnTouch = true;
            }

            this.showParts(particle);
        }

        setTimeout(() => this.addMouseEffect(), 10);
    }

    mergeColliding() {
        for (let element0 of this.parts) {
            if (element0.dontJoinOnTouch) continue;
            for (let element1 of this.parts) {
                if (element1.dontJoinOnTouch) continue;
                if (element0 !== element1) {
                    if (Matter.Collision.collides(element0, element1) != null) {
                        // Matter.Body.setParts(element0, [element0, element1]);
                        let newElement = Matter.Composite.create({
                            parts: [
                                ...element0.parts,
                                ...element1.parts,
                            ],
                            render: {
                                fillStyle: this.particleColor,
                            }
                        });
                        newElement.dontJoinOnTouch = true;
                        
                        this.showParts(newElement);
                    }
                }
            }
        }

        setTimeout(() => this.mergeColliding(), 100);
    }

    bindEvents() {
        this.eventDetectMousePress();
        this.eventSaveMousePosition();
        // this.mergeColliding();
    }
}