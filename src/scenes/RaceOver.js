import Phaser from "phaser"
import Map from "../objects/Map"

const msToString=(time)=> {
    const totalCents = Math.floor(time/10)
      let cents = totalCents%100;
      if (cents<10) {
        cents="0"+""+cents;
      }
      const totalSecs = Math.floor(totalCents/100);
       let secs= totalSecs%60;
       if (secs <10) {
         secs = ""+"0"+secs;
       }
       const mins = Math.floor(totalSecs/60)
      return mins+":"+secs+":"+cents;
  }

export default class RaceOver extends Phaser.Scene {
  
  
  constructor (data) {
      
      super({key:"RaceOver"});
  }

  preload () {
      
  }
  
  create (data) {
    const cam = this.cameras.main;
    
    this.add.rectangle(0,0,cam.width,cam.height,0x000000,0.5).setOrigin(0,0)
    
    this.add.text(cam.width/2,100,data.results[0].name+" wins!", {fontSize:50}).setOrigin(0.5,0.5);
    for (const i in data.results) {
      const car=data.results[i];
      
      this.add.text(100,160+70*i, car.name, {fontSize:30});
      this.add.text(cam.width-100,160+70*i, msToString(car.finishTime), {fontSize:30}).setOrigin(1,0);
      
    }
  }
  
  
  update() {
    if (this.input.activePointer.x<100 && this.input.activePointer.x>0) {
      
      this.scene.start("Game");
       
    }
  }
  
}