import Phaser from "phaser"
import carImg from '../assets/car1.png';
import Car from "../objects/Car"
import Road from "../objects/Road"
import Controller from "../helpers/Controller"
import Map from "../objects/Map"


export default class Game extends Phaser.Scene {
  constructor () {
      super();
  }

  preload () {
      this.load.image('car', carImg);
  }
    
  create () {
    
    //World stuff
    this.matter.world.disableGravity();

    
    //Camera Settings
    this.cameras.main.setBackgroundColor("#337733")
    
    this.map = Map.defaultMap(this)
    
    this.road = this.map.road;
    //this.road =Road.defaultRoad(this);
    
    this.player = new Car(this, 0xff0000, 200,250);
    const removeLater = new Car(this,0x00ff00, 150, 250)
    
    this.map.addCar(this.player);
    
    this.controller= new Controller(this, this.player)
    
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1)
    
    
    this.totalTimeLabel=this.add.text(50,50,"0:00:00", {fontSize:50}).setScrollFactor(0);
    this.lapTimeLabel=this.add.text(50,100,"0:00:00", {fontSize:50}).setScrollFactor(0);
    this.startTime;
    this.lapStartTime;
    this.raceActive=false;
    
    /*
    this.add.sprite(300,250,"car").setTint(0x00ff00).setScale(0.125).setRotation(90*Math.PI/180);
    this.add.sprite(200,275,"car").setTint(0x0000ff).setScale(0.125).setRotation(90*Math.PI/180);
    this.add.sprite(300,275,"car").setTint(0xffff00).setScale(0.125).setRotation(90*Math.PI/180);
    */
  }
  
  startRace(time) {
    this.raceActive=true;
    this.startTime=Date.now();
  }
  
  
  update(time,delta) {
    //console.log(this.time.now())
    this.controller.update(delta)
    this.player.update(time, delta)
    this.map.update(time, delta);
    
    if (this.raceActive) {
      
      const elapsed = Date.now()-this.startTime;
      
      const totalCents = Math.floor(elapsed/20)
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
      this.totalTimeLabel.text=mins+":"+secs+":"+cents;
    }
  }
}

