import Matter from 'matter-js';
import Game from './_Game';

export default class Game1 extends Game {
    constructor(element) {
        super(element);
        this.mousePosition = false;
        this.isPressed = { left: false };

        // default values of button states, DON'T CHANGE IN CODE
        this._boolButtonsDefault = {
            snowFall: true,
        };
        // current values of button states
        this.boolButtons = this._boolButtonsDefault;

        this.showStartingParts();
        this.bindEvents();
        this.addMouseControl();
        this.addMouseEffect();
    }

    addMouseEffect() {
        if (this.mousePosition) {
            const particle = Matter.Bodies.circle(...this.mousePosition, (Math.random() + 0.5) * this.sr, {
                render: {
                    fillStyle: 'white',
                }
            });

            
            this.showParts(particle);
            // console.log(this.parts.length)

            // if LMB is pressed and not in building mode, don't remove particles
            if (!this.isPressed.left) {
                setTimeout(() => this.removeParts(particle), 250);
                particle.dontJoinOnTouch = true;
            } 
        }

        setTimeout(() => this.addMouseEffect(), 10);
    }

    bindEvents() {
        this.eventDetectMousePress();
        this.eventSaveMousePosition();

        // check to try every x millisec
        Matter.Events.on(this.Engine, 'beforeUpdate', () => {
            // console.log(this.parts)
            for (let element0 of this.parts) {
                if (element0.dontJoinOnTouch) continue;
                console.log(element0)
                for (let element1 of this.parts) {
                    if (element1.dontJoinOnTouch) continue;

                    
                    if (element0 !== element1) {
                        console.log(element0)
                        // if (Matter.Collision.collides(element0, element1) != null) {
                        //     console.log(1)
                        // }
                    }
                }
            }
        });
    }
}