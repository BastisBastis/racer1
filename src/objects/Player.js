import Phaser from "phaser";
import Car from "./Car";

export default class extends Car {
    constructor(scene,color,x,y) {
        super(scene,color,x,y);
    }

    finishLap(time) {
        super.finishLap(time);
        this.scene.displayLapTime(this.lapTimes.slice(-1)[0]);
        if (this.lapCount === this.finishedLaps) {
            this.scene.finished();
        }
        else {
            this.scene.setLapLabel(this.finishedLaps+1, this.lapCount);
        }
    }
}