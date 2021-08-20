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
        this.currDir = (this.currDir + stepAngle) % 360
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
  
  static roadFromData(scene,x,y,width,dir,data,roadColor,bg) {
    const roadPoints = new RoadPoints(x, y, width, dir);
    
    for (let entry of data) {
      if (entry.type===0) {
        roadPoints.addStraight(entry.dist);
      } else if (entry.type===1) {
        roadPoints.addTurn(
          entry.dir,
          entry.stepDist,
          entry.steps,
          entry.stepAngle
          );
          
      }
    }
    console.log(roadPoints.outer)
    return new Road(scene,0,0, roadPoints.outer, roadPoints.inner, roadColor, bg);
  }
  
  static defaultRoad(scene) {
    let currDir = 0;
    const roadWidth = 100;
    const startX = 150;
    const startY = 200;
    
    //const roadPoints = new RoadPoints(startX, startY, roadWidth, currDir);
    
    const roadData = [
      {
        type:0,
        dist:200
      },
      {
        type:1,
        dir:"l",
        stepDist:5,
        step:10,
        stepAngle:9
      },
      {
        type:0,
        dist:5,
      },
      {
        type:1,
        dir:"r",
        stepDist:5,
        step:20,
        stepAngle:9
      },
      {
        type:0,
        dist:55
      },
      {
        type:1,
        dir:"r",
        stepDist:10,
        step:5,
        stepAngle:9
      },
      {
        type:0,
        dist:200
      },
      {
        type:1,
        dir:"r",
        stepDist:5,
        step:5,
        stepAngle:9
      },
      {
        type:0,
        dist:200
      },
      {
        type:1,
        dir:"r",
        stepDist:5,
        step:10,
        stepAngle:9
      },
      {
        type:0,
        dist:50
      },
      {
        type:1,
        dir:"r",
        stepDist:5,
        step:10,
        stepAngle:9
      },
      {
        type:0,
        dist:39
      }
    ]
    
    return Road.roadFromData(scene,startX,startY,roadWidth,currDir,roadData,0x888888, 0x337733);
    
    /*
    roadPoints.addStraight(200);
    roadPoints.addTurn("l", 5, 10, 9);
    roadPoints.addStraight(5);
    roadPoints.addTurn("r", 5, 20, 9);
    roadPoints.addStraight(55);
    roadPoints.addTurn("r",10,5,9);
    roadPoints.addStraight(200);
    roadPoints.addTurn("r",5,5,9);
    roadPoints.addStraight(200);
    roadPoints.addTurn("r",5,10,9);
    roadPoints.addStraight(50);
    roadPoints.addTurn("r",5,10,9);
    roadPoints.addStraight(39);

    return new Road(scene,0,0, roadPoints.outer, roadPoints.inner, 0x888888, 0x337733);
  */
    
  }
  
}
