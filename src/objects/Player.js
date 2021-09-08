import Phaser from "phaser";
import Car from "./Car";
import NPC from "./NPC"

export default class extends NPC {
    constructor(scene,color,x,y,id,name) {
        super(scene,color,x,y,id,name);
        this.shouldAutoDrive=false;

    }

    finishLap(time) {
      if (!this.finished) {
        super.finishLap(time);
        this.scene.displayLapTime(this.lapTimes.slice(-1)[0]);
        if (this.lapCount === this.finishedLaps) {
            this.shouldAutoDrive=true;
        }
        else {
            this.scene.setLapLabel(this.finishedLaps+1, this.lapCount);
        }
      }
    }
    
    update(time,delta) {
      //this.findClosestNavPoint(5);
      super.update(time,delta);
    }
}