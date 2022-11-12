import Matter from 'matter-js';
import Game from './_Game';

import getRandomColor from '../../lib/getRandomColor';

const lettersVerts = require('../../static/letters.json');

export default class Game0 extends Game {
    constructor(...args) {
        super(...args);
        this.mousePosition = false;

        this.addMouseControl();
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

    bindEvents() {
        // add letters on their key press
        document.addEventListener('keydown', (event) => {
            const key = event.key.toUpperCase()
            if (this.mousePosition) {
                this.showLetter(key, getRandomColor());
            }
        }, false);

        document.onmousemove = (event) => {
            // save current mouse position on mouse move
            if (event.target === this.Render.element.firstChild) {
                var rect = event.target.getBoundingClientRect();
                var x = (event.clientX - rect.left) * (925 / rect.height); //x position within the element
                var y = (event.clientY - rect.top) * (925 / rect.height);  //y position within the element
                this.mousePosition = [x, y];
            }
            else {
                this.mousePosition = false;
            }
        }
    }
}