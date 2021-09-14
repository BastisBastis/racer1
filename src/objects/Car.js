import Phaser from "phaser"
//import Road from "./Road"

function foot(A, B, P) {
  const AB = {
    x: B.x - A.x,
    y: B.y - A.y
  };
  const k = ((P.x - A.x) * AB.x + (P.y - A.y) * AB.y) / (AB.x * AB.x + AB.y * AB.y);
  return {
    x: A.x + k * AB.x,
    y: A.y + k * AB.y
  };
}

const distance = (a,b) => {
  return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

export default class Car extends Phaser.Physics.Matter.Sprite {
  
  constructor(scene,color,x,y,id,name) {
    super(scene.matter.world,x,y,"car");
    
    this.scene=scene;
    
    this.name=name;
    this.id=id;
    
    this.setTint(color);
    this.setScale(0.125);
    this.setOrigin(0.25,0.5);
    this.body.position.x-=this.width*0.0625/2
    this.body.positionPrev.x-=this.width*0.0625/2
    
    this.maxSpeed=5;
    this.accSpeed =0.0015
    this.setBounce(0)
    
    this.airFric=0.05;
    this.setFrictionAir(0.05);
    //this.setMass(10);
    this.setCollisionGroup(1);
    this.setCollidesWith([0,1,3,4]);
    this.checkpointsPassed=-1;
    this.finishedLaps=0;
    this.lapTimes=[];
    this.finished=false;
    this.finishTime;
    this.startTime;
    this.lapStartTime;
    this.navPoints;
    this.roadPosition;
    
    this.opponents=[];
    
    this.closestNavPoint;
    
    
    scene.add.existing(this);
    
    
  }
  
  turn(dir) {
    //Change turning method
    //const turnSpeed=0.02 * this.getSpeed();
    
    const turnSpeed=0.04 * Math.pow(this.getSpeed(),0.3);
    
    this.setAngularVelocity(dir*turnSpeed);
    
  }
  
  getSpeed() {
    const v =this.body.velocity;
    return Math.sqrt(v.x*v.x+v.y*v.y);
  }
  
  getMovementDirection() {
    return Math.atan2(this.body.velocity.x,this.body.velocity.y)
  }
  
  addOpponent(opponent) {
    
    this.opponents.push(opponent);
  }
  
  setOpponents(opponents) {
    this.opponents=opponents;
  }
  
  accelerate(amount) {
    
    if (this.getSpeed() <= this.maxSpeed) {
      this.thrust(this.accSpeed*amount);
    }
  }
  
  setMapDetails(checkpointCount,lapCount,navPoints,optimalPath) {
    this.checkpointsPassed=checkpointCount-1;
    this.lapCount = lapCount;
    this.navPoints=navPoints;
    this.findClosestNavPoint(-1);
    this.optimalPath=optimalPath
    //console.log(optimalPath)
  }
  
  passCheckpoint(i,checkpointCount, time) {
    
    const tmpPassed =this.checkpointsPassed;
    this.checkpointsPassed = (this.checkpointsPassed-0 + 1) % checkpointCount == i ? i : this.checkpointsPassed;
    if (tmpPassed!=this.checkpointsPassed && this.checkpointsPassed == checkpointCount-1) {
      this.finishLap(time);
    }
    
    
    //For checking checkpoint times
    /*
    if (tmpPassed!=this.checkpointsPassed)
      this.scene.displayLapTime(time-this.startTime);
    */
  }
  
  finishLap (time) {
    if (!this.finished) {
      this.finishedLaps+=1;
      const lapTime= time-this.lapStartTime;
      this.lapStartTime=time;
      this.lapTimes.push(lapTime);
      if (this.lapTimes.length === this.lapCount) {
        this.finishTime=time-this.startTime;
        this.finished = true;
      }
    }
  }
  
  start(time) {
    
    this.startTime=time;
    this.lapStartTime=time;
    
  }
  
  findClosestNavPoint(range) {
    
    let closestPoint ={
      pathIndex:-1,
      pointIndex:-1,
      dist:999999
      }
      
    const fromPoint = range<0 ? 0 : this.closestNavPoint.pointIndex - range;
    const toPoint = range<0 ? this.navPoints[0].length : this.closestNavPoint.pointIndex+range;
    
    
    
    for (const pathIndex in this.navPoints) {
      const path = this.navPoints[pathIndex];
      for (let pointIndex = fromPoint; pointIndex < toPoint; pointIndex++) {
        
        const calculatedPointIndex = pointIndex < 0 ? this.navPoints[0].length+pointIndex : pointIndex % this.navPoints[0].length;
        
        
        const point = path[calculatedPointIndex];
        const dist = distance(this,point);
        if (dist <=closestPoint.dist) {
          closestPoint={
            pathIndex:pathIndex,
            pointIndex:calculatedPointIndex,
            dist:dist
          }
        }
      }
    }
    //this.scene.printText(closestPoint.pointIndex)
    this.closestNavPoint=closestPoint;
  }
  
  updateRoadPosition() {
    
    
    const p = {x:this.x,y:this.y};
    const v = this.navPoints[0][this.closestNavPoint.pointIndex];
    
    const w = this.navPoints[2][this.closestNavPoint.pointIndex];
    
    const newPoint = foot(v,w,p);
    
    this.roadPosition = distance(newPoint, v);
    
  }
  
  update(time,delta) {
    
    this.updateRoadPosition();
    
    if (!this.scene.road.contains(this.x,this.y)) {
      //console.log(time+ " not road " + this.name)
      
      this.setFrictionAir(this.airFric*2)
    }
    else {
      this.setFrictionAir(this.airFric)
    }
    
    
  }
  
}