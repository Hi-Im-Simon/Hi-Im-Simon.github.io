import Matter from 'matter-js';
import Game from './_Game';

import { getRandomColor } from '../../lib/getRandomColor';

const lettersVerts = require('../../static/letters.json');

export default class Game0 extends Game {
    constructor(...args) {
        super(...args);
        this.mousePosition = false;

        this.functionalButtons = {
            builderMode: false,
        };

        this.addMouseControl();
        this.createMouseEffect();
    }

    showStartingParts() {
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
            Matter.Body.setMass(part, 2000);

            spawn -= ((width + 15) * this.sr);
            letters[i] = part;
        }

        let otherParts = [
            
        ];
        for (let part of otherParts) {
            part.restitution = 0.25;
        }

        this.showParts([...this._createWalls(), ...letters, ...otherParts]);
    }

    // create mouse moving effect
    createMouseEffect(r=0, g=0, b=12, phase=0) {
        if (this.mousePosition) {
            const particle = Matter.Bodies.circle(...this.mousePosition, ((Math.random() * 8) + 4) * this.sr, {
                render: {
                    fillStyle: `#${ r.toString(16) + g.toString(16) + b.toString(16) }`,
                }
            });
            
            // disable collision for elements if in builder mode
            if (this.functionalButtons.builderMode) {
                particle.collisionFilter = { group: -1 };
                Matter.Body.scale(particle, 0.5, 0.5);
            }

            this.showParts(particle);
            setTimeout(() => this.removeParts(particle), 250);

            // colors are values 3 - 12 (in hex)
            if (phase === 0) if (++g >= 12) phase = 1;
            if (phase === 1) if (--b <= 3) phase = 2;
            if (phase === 2) if (++r >= 12) phase = 3;
            if (phase === 3) if (--g <= 3) phase = 4;
            if (phase === 4) if (++b >= 12) phase = 5;
            if (phase === 5) if (--r <= 3) phase = 0;
        }

        setTimeout(() => this.createMouseEffect(r, g, b, phase), 10);
    }

    bindEvents() {
        // add letters on their key press
        document.addEventListener('keydown', (event) => {
            const key = event.key.toUpperCase();
            if (this.mousePosition) {
                this.showLetter(key, getRandomColor());
            }
        }, false);

        // save current mouse position on mouse move
        document.onmousemove = (event) => {
            if (event.target === this.Render.element.getElementsByTagName('canvas')[0]) {
                var rect = event.target.getBoundingClientRect();
                var x = (event.clientX - rect.left) * (925 / rect.height) * this.sr; //x position within the element
                var y = (event.clientY - rect.top) * (925 / rect.height) * this.sr;  //y position within the element
                this.mousePosition = [x, y];
            }
            else {
                this.mousePosition = false;
            }
        }
    }
}