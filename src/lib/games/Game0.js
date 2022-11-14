import Matter from 'matter-js';
import Game from './_Game';

import { getRandomColor } from '../../lib/getRandomColor';

const lettersVerts = require('../../static/letters.json');

export default class Game0 extends Game {
    constructor(element, firstRender) {
        super(element);
        this.firstRender = firstRender;
        this.mousePosition = false;
        this.isPressed = { left: false };

        // default values of button states, DON'T CHANGE IN CODE
        this._boolButtonsDefault = {
            builderMode: false,
        };
        // current values of button states
        this.boolButtons = this._boolButtonsDefault;

        this.functionalButtons = {
            spawnTitle: () => this.showTitle(),
        };
        
        this.showStartingParts();
        this.bindEvents();
        this.addMouseControl();
        this.addMouseEffect();
    }

    showTitle() {
        let letters = [
            ['H', '#58a6ff'], ['i', '#58a6ff'], ['-', 'white'],
            ['I', '#58a6ff'], ['m', '#58a6ff'], ['-', 'white'],
            ['S', 'orange'], ['i', 'orange'], ['m', 'orange'], ['o', 'orange'], ['n', 'orange'],
        ];

        let spawn = 0;
        for (let i = 0; i < letters.length; i++) {
            const part = Matter.Bodies.fromVertices(0, 0, lettersVerts[letters[i][0]], {
                render: {
                    fillStyle: letters[i][1],
                }
            });
            const width = part.bounds.max.x - part.bounds.min.x;

            spawn -= ((width + 15) * this.sr);

            Matter.Body.rotate(part, 3 * (Math.PI / 2));
            Matter.Body.scale(part, 1.75 * this.sr, 1.75 * this.sr);
            Matter.Body.setPosition(part, { x: this.cw / 2, y: spawn });

            spawn -= ((width + 15) * this.sr);
            this.setGravity(part, 0, 0.05);
            letters[i] = part;
        }
        this.showParts([...letters]);
    }

    showStartingParts() {
        // create these parts only if it's the first render of the game 
        if (this.firstRender) {
            this.showTitle();
        }

        let otherParts = [
            
        ];
        for (let part of otherParts) {
            part.restitution = 0.25;
        }

        this.showParts([...this._createWalls(), ...otherParts]);
    }

    // create mouse moving effect
    addMouseEffect(r=0, g=0, b=12, phase=0) {
        if (this.mousePosition) {
            const particle = Matter.Bodies.circle(...this.mousePosition, ((Math.random() * 8) + 2) * this.sr, {
                render: {
                    fillStyle: `#${ r.toString(16) + g.toString(16) + b.toString(16) }`,
                }
            });
            
            // disable collision for elements if in builder mode
            if (this.boolButtons.builderMode) {
                particle.collisionFilter = { group: -1 };
                Matter.Body.scale(particle, 0.5, 0.5);
            }
            
            this.showParts(particle);

            // if LMB is pressed and not in building mode, don't remove particles
            if(!this.isPressed.left || this.boolButtons.builderMode) setTimeout(() => this.removeParts(particle), 250);
            else this.setGravity(particle, 0, 0.5, false);

            // colors are values 3 - 12 (in hex)
            if (phase === 0) if (++g >= 12) phase = 1;
            if (phase === 1) if (--b <= 3) phase = 2;
            if (phase === 2) if (++r >= 12) phase = 3;
            if (phase === 3) if (--g <= 3) phase = 4;
            if (phase === 4) if (++b >= 12) phase = 5;
            if (phase === 5) if (--r <= 3) phase = 0;
        }

        setTimeout(() => this.addMouseEffect(r, g, b, phase), 25);
    }

    bindEvents() {
        // add letters on their key press
        document.addEventListener('keydown', (event) => {
            const key = event.key.toUpperCase();
            if (this.mousePosition) {
                this.showLetter(key, getRandomColor(6, 3, 15));
            }
        }, false);

        this.eventDetectMousePress();
        this.eventSaveMousePosition();
    }
}