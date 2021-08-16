import Phaser from "phaser"

import logoImg from '../assets/logo.png';

export default class Game extends Phaser.Scene {
  constructor () {
      super();
  }

  preload () {
      this.load.image('logo', logoImg);
  }
    
  create () {
    this.cameras.main.setBackgroundColor("#aaff00")
    
    this.createMap();  
    console.log("huop")
  }

  createMap() {
    
    
    let currDir = 0;
    const roadWidth = 50;
    const startX = 0;
    const startY = 150;
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
    addStraight(50);
    addTurn("r", 5, 20, 9);
    addStraight(100);
    addTurn("r",10,5,9);
    addStraight(200);
    addTurn("r",5,5,9);
    addStraight(200);
    addTurn("r",5,10,9);
    addStraight(99);
    addTurn("r",5,10,9);
    addStraight(39)

    var poly = this.add.polygon(400, 300, roadParts, 0x0000ff);

  }
}

