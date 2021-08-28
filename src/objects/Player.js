import Phaser from "phaser";
import Car from "./Car";

export default class extends Car {
    constructor(scene,color,x,y,id,name) {
        super(scene,color,x,y,id,name);
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
    
    update(time,delta) {
      this.findClosestNavPoint(5);
      super.update(time,delta);
    }
}