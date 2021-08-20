import Phaser from "phaser"

const angleToRad = (angle) => {
  return angle * Math.PI / 180; 
}

class RoadPoints {
  constructor(x, y, width, dir) {
    this.outer = [x, y];
    this.inner = [x, y+width];
    this.roadWidth = width;
    this.currDir = dir;
  }
  
  addStraight(dist) {
    const newX1 = this.outer[0] + dist * Math.cos(angleToRad(this.currDir));
    const newY1 = this.outer[1] + dist * Math.sin(angleToRad(this.currDir));
    const newX2 = newX1 + this.roadWidth*Math.cos(angleToRad(this.currDir+90));
    const newY2 = newY1 + this.roadWidth*Math.sin(angleToRad(this.currDir+90));
    this.outer = [
      newX1,
      newY1,
      ...this.outer
    ];
    this.inner = [
      newX2,
      newY2,
      ...this.inner
    ];
  }
  
  addTurn(turnDir,stepDist, steps, stepAngle) {
    for (let i = 0; i < steps; i++) {
      let newX1, newX2, newY1, newY2;
      if (turnDir === "l") {
        this.currDir = (this.currDir - stepAngle + 360) % 360
        newX1 = this.outer[0] + stepDist * Math.cos(angleToRad(this.currDir));
        newY1 = this.outer[1] + stepDist * Math.sin(angleToRad(this.currDir));
        newX2 = newX1 + this.roadWidth*Math.cos(angleToRad(this.currDir+90));
        newY2 = newY1 + this.roadWidth*Math.sin(angleToRad(this.currDir+90));
      }
      else if (turnDir === "r") {
        currDir = (currDir + stepAngle) % 360
        newX2 = this.inner[0] + stepDist * Math.cos(angleToRad(this.currDir));
        newY2 = this.inner[1] + stepDist * Math.sin(angleToRad(this.currDir));
        newX1 = newX2 + this.roadWidth*Math.cos(angleToRad(this.currDir-90));
        newY1 = newY2 + this.roadWidth*Math.sin(angleToRad(this.currDir-90));
      }
      this.outer = [
      newX1,
      newY1,
      ...this.outer
    ]
    this.inner = [
      newX2,
      newY2,
      ...this.inner
    ]
    }
  }
  
}

export default class Road extends Phaser.GameObjects.Polygon {
  
  constructor (scene,x,y,outerPoints,innerPoints,fill,bg,cars,obstacles) {
    
    
    super(scene,x,y,outerPoints,fill);
    this.scene = scene;
    scene.add.existing(this);
    this.setOrigin(0,0);
    
    this.island = scene.add.polygon(x, y, innerPoints, bg).setOrigin(0,0);
    
    
  }
  
  
  contains(x,y) {
    return Phaser.Geom.Polygon.Contains(this.geom,x,y) && !Phaser.Geom.Polygon.Contains(this.island.geom,x,y)
  }
  
  
  
  static defaultRoad(scene) {
    let currDir = 0;
    const roadWidth = 100;
    const startX = 150;
    const startY = 200;
    
    const roadPoints = new RoadPoints(startX, startY, roadWidth, currDir);
    
    let roadParts = [startX,startY] //50 = width of road
    
    let innerRoad = [startX,startY+roadWidth]
    
    
    
    const addStraight = (dist) => {
      const newX1 = roadParts[0] + dist * Math.cos(angleToRad(currDir));
      const newY1 = roadParts[1] + dist * Math.sin(angleToRad(currDir));
      const newX2 = newX1 + roadWidth*Math.cos(angleToRad(currDir+90));
      const newY2 = newY1 + roadWidth*Math.sin(angleToRad(currDir+90));
      roadParts = [
        newX1,
        newY1,
        ...roadParts
      ]
      innerRoad = [
        newX2,
        newY2,
        ...innerRoad
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
          newX2 = innerRoad[0] + stepDist * Math.cos(angleToRad(currDir));
          newY2 = innerRoad[1] + stepDist * Math.sin(angleToRad(currDir));
          newX1 = newX2 + roadWidth*Math.cos(angleToRad(currDir-90));
          newY1 = newY2 + roadWidth*Math.sin(angleToRad(currDir-90));
        }
        roadParts = [
        newX1,
        newY1,
        ...roadParts
      ]
      innerRoad = [
        newX2,
        newY2,
        ...innerRoad
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
    addStraight(39);
    
    roadPoints.addStraight(200);

    return new Road(scene,0,0, roadPoints.outer,roadPoints.inner, 0x888888, 0x337733);
  }
  
}
