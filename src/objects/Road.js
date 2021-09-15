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
    this.navPoints = [[],[],[]];
    this.navPointFrequency = 10;
  }
  
  addStraight(dist) {
    const startX = this.outer[0];
    const startY = this.outer[1];
    for (let i = 0; i<dist;i=i+this.navPointFrequency) {
      const outerX = startX + i*Math.cos(angleToRad(this.currDir));
      const outerY = startY + i*Math.sin(angleToRad(this.currDir));
      this.navPoints[0].push({
        x:outerX+this.roadWidth*0.2*Math.cos(angleToRad(this.currDir+90)),
        y:outerY+this.roadWidth*0.2*Math.sin(angleToRad(this.currDir+90))
      });
      this.navPoints[1].push({
        x:outerX+this.roadWidth*0.5*Math.cos(angleToRad(this.currDir+90)),
        y:outerY+this.roadWidth*0.5*Math.sin(angleToRad(this.currDir+90))
      });
      this.navPoints[2].push({
        x:outerX+this.roadWidth*0.8*Math.cos(angleToRad(this.currDir+90)),
        y:outerY+this.roadWidth*0.8*Math.sin(angleToRad(this.currDir+90))
      });
    }

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

      const outerX = this.outer[0];
      const outerY = this.outer[1];
      this.navPoints[0].push({
        x:outerX+this.roadWidth*0.2*Math.cos(angleToRad(this.currDir+90)),
        y:outerY+this.roadWidth*0.2*Math.sin(angleToRad(this.currDir+90))
      });
      this.navPoints[1].push({
        x:outerX+this.roadWidth*0.5*Math.cos(angleToRad(this.currDir+90)),
        y:outerY+this.roadWidth*0.5*Math.sin(angleToRad(this.currDir+90))
      });
      this.navPoints[2].push({
        x:outerX+this.roadWidth*0.8*Math.cos(angleToRad(this.currDir+90)),
        y:outerY+this.roadWidth*0.8*Math.sin(angleToRad(this.currDir+90))
      });

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
  
  constructor (scene,x,y,outerPoints,innerPoints,navPoints,optimalPath, fill,bg,roadData) {
    
    
    super(scene,x,y,outerPoints,fill);
    this.scene = scene;
    scene.add.existing(this);
    this.setOrigin(0,0);
    this.navPoints=navPoints;
    this.optimalPath=optimalPath;
    this.roadData=roadData;
    
    this.island = scene.add.polygon(x, y, innerPoints, bg).setOrigin(0,0);
    
    
    //this.drawNavPoints()
    //this.drawOptimalPath();
    

  }
  
  drawNavPoints() {
    let i=0;
    const clrs = [0xff0000,0x00ff00,0x0000ff];
    for (const path of this.navPoints) {
      for (const p of path) {
        this.scene.add.circle(p.x, p.y, 2, clrs[i]);
      }
      i++;
    }
  }
  
  drawOptimalPath() {
    const findPathAtPoint = (pointIndex) => {
      for (const op of this.optimalPath) {
        if (pointIndex<op.point)
          return op.path;
      }
      console.log("path not found "+pointIndex);
      return 1;
    }
    
    
  for (const i in this.navPoints[0])  {
      const p = this.navPoints[findPathAtPoint(i)][i];
      this.scene.add.circle(p.x,p.y,5,0xffffff);
    }
    
  }
  
  contains(x,y) {
    return Phaser.Geom.Polygon.Contains(this.geom,x,y) && !Phaser.Geom.Polygon.Contains(this.island.geom,x,y)
  }

  
  
  static roadFromData(scene,x,y,width,dir,data,optimalPath,roadColor,bg) {
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
    return new Road(scene,0,0, roadPoints.outer, roadPoints.inner, roadPoints.navPoints, optimalPath,0x888888, 0x337733,{x:x,y:y,width:width,dir:dir,data:data,roadColor:roadColor});
  }
  
  static defaultRoad(scene) {
    let currDir = 0;
    const roadWidth = 100;
    const startX = 150;
    const startY = 200;
    
    const roadData = [
      {
        type:0,
        dist:200
      },
      {
        type:1,
        dir:"l",
        stepDist:5,
        steps:10,
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
        steps:20,
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
        steps:5,
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
        steps:5,
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
        steps:10,
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
        steps:10,
        stepAngle:9
      },
      {
        type:0,
        dist:39
      }
    ]
    
    const r = Road.roadFromData(scene,startX,startY,roadWidth,currDir,roadData,0x888888, 0x337733);
    return r;
  }
  
}
