import Phaser from "phaser"
import Car from "../objects/Car"

export default class Controller {
  constructor(scene,player) {
    this.scene = scene;
    this.player = player;
  }
  
  update(delta) {
    
    const dRatio = delta*0.01;
    //this.player.accelerate(dRatio*0.5);
    //this.player.turn(-1);
    //console.log(this.scene.input.activePointer.x)
    if (this.scene.input.activePointer.isDown) {
      const cam = {w:this.scene.cameras.main.width, h:this.scene.cameras.main.height};
      
      if (this.scene.input.activePointer.x > cam.w/2+10) {
        this.player.turn(1);
      }
      else if (this.scene.input.activePointer.x < cam.w/2-100) {
        this.player.turn(-1);
      }
      if (this.scene.input.activePointer.y > cam.h/2+50) {
        this.player.accelerate(-1 * dRatio);
      }
      else if (this.scene.input.activePointer.y < cam.h/2-50) {
        this.player.accelerate(1 * dRatio);
      }
    }
    
  }
}