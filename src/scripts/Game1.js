import Matter from 'matter-js';
import Game from './_Game';
const lettersVerts = require('../static/letters.json');

export default class Game0 extends Game {
    constructor(...args) {
        super(...args);
        this.mousePosition = false;
    }
    createParts() {
        let otherParts = [
        ];

        this.showParts([...this.createWalls(), ...otherParts]);
    }

    showLetter(letter, x=this.mousePosition[0], y=this.mousePosition[1], color='#ffffff', scale=1) {
        // console.log(x, y)
        const part = Matter.Bodies.fromVertices(x * this.sr, y * this.sr, lettersVerts[letter], {
            render: {
                fillStyle: color,
            }
        });
        Matter.Body.scale(part, scale * this.sr, scale * this.sr);

        this.showParts(part);
    }

    bindEvents() {
        // add letters on their key press
        document.addEventListener('keydown', (event) => {
            const key = event.key.toUpperCase()
            if (
                this.mousePosition
                &&
                lettersVerts['letters'].includes(key)
            ) {
                this.showLetter(key);
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