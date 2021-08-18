import Phaser from "phaser"
import carImg from '../assets/car1.png';
import Car from "../objects/Car"
import Controller from "../helpers/Controller"

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
    
    this.createMap();  
    
    
    this.player = new Car(this, 0, 200,250)
    
    this.controller= new Controller(this, this.player)
    
    /*
    this.add.sprite(300,250,"car").setTint(0x00ff00).setScale(0.125).setRotation(90*Math.PI/180);
    this.add.sprite(200,275,"car").setTint(0x0000ff).setScale(0.125).setRotation(90*Math.PI/180);
    this.add.sprite(300,275,"car").setTint(0xffff00).setScale(0.125).setRotation(90*Math.PI/180);
    */
  }

  createMap() {
    
    
    let currDir = 0;
    const roadWidth = 100;
    const startX = 50;
    const startY = 120;
    let roadParts = [startX,startY,startX,startY+roadWidth] //50 = width of road
    
    const angleToRad = (angle) => {
      return angle * Math.PI / 180; 
    }
    
    const addStraight = (dist) => {
      const newX1 = roadParts[0] + dist * Math.cos(angleToRad(currDir));
      const newY1 = roadParts[1] + dist * Math.sin(angleToRad(currDir));
      const newX2 = newX1 + roadWidth*Math.cos(angleToRad(currDir+90));
      const newY2 = newY1 + roadWidth*Math.sin(angleToRad(currDir+90));
      roadParts = [
        newX1,
        newY1,
        ...roadParts,
        newX2,
        newY2
      ]
    }
    
    const addTurn = (turnDir,stepDist, steps, stepAngle) => {
      
      for (let i = 0; i < steps; i++) {
        let newX1, newX2, newY1, newY2;
        if (turnDir === "l") {
          currDir = (currDir - stepAngle + 360) % 360
          newX1 = roadParts[0] + stepDist * Math.cos(angleToRad(currDir));
          newY1 = roadParts[1] + stepDist * Math.sin(angleToRad(currDir));
          newX2 = newX1 + roadWidth*Math.cos(angleToRad(currDir+90));
          newY2 = newY1 + roadWidth*Math.sin(angleToRad(currDir+90));
        }
        else if (turnDir === "r") {
          currDir = (currDir + stepAngle) % 360
          newX2 = roadParts.slice(-2)[0] + stepDist * Math.cos(angleToRad(currDir));
          newY2 = roadParts.slice(-1)[0] + stepDist * Math.sin(angleToRad(currDir));
          newX1 = newX2 + roadWidth*Math.cos(angleToRad(currDir-90));
          newY1 = newY2 + roadWidth*Math.sin(angleToRad(currDir-90));
        }
        roadParts = [
          newX1,
          newY1,
          ...roadParts,
          newX2,
          newY2
        ]
      }
    }
    addStraight(200);
    addTurn("l", 5, 10, 9);
    addStraight(5);
    addTurn("r", 5, 20, 9);
    addStraight(55);
    addTurn("r",10,5,9);
    addStraight(200);
    addTurn("r",5,5,9);
    addStraight(200);
    addTurn("r",5,10,9);
    addStraight(50);
    addTurn("r",5,10,9);
    addStraight(39)

    this.road = this.add.polygon(400, 300, roadParts, 0x888888);

  }
  
  update(time,delta) {
    this.controller.update(delta)
    
  }
}

