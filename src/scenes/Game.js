import Phaser from "phaser"
import carImg from '../assets/car1.png';
import Car from "../objects/Car"
import Controller from "../helpers/Controller"
import Map from "../objects/Map"
import Player from "../objects/Player";

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
    
    this.player = new Player(this, 0xff0000, 200,250);
    const removeLater = new Car(this,0x00ff00, 150, 250)
    
    this.map.addCar(this.player);
    
    this.controller= new Controller(this, this.player)
    
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1)
    
    
    this.totalTimeLabel=this.add.text(50,50,"0:00:00", {fontSize:50}).setScrollFactor(0);
    this.lapTimeLabel=this.add.text(50,100,"0:00:00", {fontSize:50}).setScrollFactor(0);
    this.lastLapTimeLabel=this.add.text(50,150,"0:00:00", {fontSize:50}).setScrollFactor(0);
    this.lapLabel=this.add.text(350,50,"Lap: 1/"+this.map.lapCount, {fontSize:50}).setScrollFactor(0);
    this.startTime;
    this.lapStartTime;
    this.raceActive=false;

    this.startRace();
    
  }
  
  startRace() {
    this.raceActive=true;
    this.startTime=this.time.now;
    this.player.start(this.startTime);
  }
  
  displayLapTime(time) {
    this.lastLapTimeLabel.text = this.msToString(time);
  }
  
  msToString(time) {
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

  finished() {
    this.raceActive = false;
  }

  setLapLabel(lap, total) {
    this.lapLabel.text = "Lap: "+lap+"/"+total;
  }

  update(time,delta) {
    if (this.raceActive) {
      this.controller.update(delta)
      this.player.update(time, delta)
    }
    this.map.update(time, delta);
    
    if (this.raceActive) {
      const totalElapsed = time-this.startTime;
      this.totalTimeLabel.text=this.msToString(totalElapsed);
      const lapElapsed = time-this.player.lapStartTime;
      this.lapTimeLabel.text = this.msToString(lapElapsed);
    }
  }
}

