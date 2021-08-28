import Phaser from "phaser"
import Car from "./Car"

const mod = (a,n) => {
  return a - Math.floor(a/n) * n
}

export default class NPC extends Car {
  constructor(scene,color,x,y,id,name) {
    super(scene,color,x,y,id,name);
    
    this.targetPoint;
    
    const showMarker = 0;
    this.targetMarker = scene.add.circle(0,0,5,0xffffff,showMarker);
    
    this.willingnessToChangePath=0.01;
    this.pathChangeTarget=-1;
    
    
    this.gpsTargetRange=8;
    
    this.acceptedDistAhead=2;
    this.reduceAcceleration=0;
    
    this.roadPosition;
  }
  
  start(time) {
    super.start(time);
    
  }
  
  
  
  getWillingToChangePath() {
    const rand =Math.random();
    if (rand<this.willingnessToChangePath)
      
    return rand<this.willingnessToChangePath;
  }
  
  getForcedToChangePath() {
    
    //return {forced:false,target:-1};
    
    
    
    for (const opp of this.opponents) {
      if (opp.closestNavPoint.pathIndex == this.closestNavPoint.pathIndex && opp.closestNavPoint.pointIndex >= this.closestNavPoint.pointIndex  && opp.closestNavPoint.pointIndex < this.closestNavPoint.pointIndex + 4) {
        //Opponent is on the same path and very close (likely touching))
        
        
        if (this.roadPosition< opp.roadPosition) {
          if (this.closestNavPoint.pathIndex ==0) {
            this.reduceAcceleration=1;
          } else {
            return {forced:true, target:this.closestNavPoint.pathIndex-1}
          }
        } else {
          if (this.closestNavPoint.pathIndex ==2) {
            this.reduceAcceleration=1;
          } else {
            return {forced:true, target:Number(this.closestNavPoint.pathIndex)+1}
          }
        }
      }
      if (opp.closestNavPoint.pathIndex == this.closestNavPoint.pathIndex && opp.closestNavPoint.pointIndex > this.closestNavPoint.pointIndex +3 && opp.closestNavPoint.pointIndex < this.closestNavPoint.pointIndex + this.acceptedDistAhead) {
        //Opponent is ahead within x points in NPCs path but not too close
        
        
        
        return {forced:true,target:-1}; //-1=Any path
      }
    }
    return {forced:false,target:-1};
  }
  
  pickTargetPoint(pointsAhead) {
    
    //Determine path for target point
    let targetPath = this.closestNavPoint.pathIndex;
    
    //Reset pathChangeTarget if target path is reached
    if (this.pathChangeTarget == this.closestNavPoint.pathIndex) {
      this.pathChangeTarget = -1;
    }
    
    //Find if willing to switch towards optimal path without being forced to do so
    const willingToSwitch = this.getWillingToChangePath();
    
    //Find if forced to switch paths
    const forcedToSwitch = this.getForcedToChangePath();
    
    
    //Set target path to pathChangeTarget if active
    if (this.pathChangeTarget>-1) {
      targetPath=this.pathChangeTarget;
    } else if (forcedToSwitch.forced || willingToSwitch) {
      const optimal =this.findOptimalPath();
      let potentialTarget = optimal<targetPath ? targetPath-1 : (optimal >targetPath ? Number(targetPath)+1 : targetPath);
      
      if (forcedToSwitch.forced && forcedToSwitch.target>=0) {
        
        console.log(this.name+": "+forcedToSwitch.target)
        
        targetPath=forcedToSwitch.target;
      } else if (forcedToSwitch.forced) {
        
        console.log(this.name+": "+forcedToSwitch.target)
        
        if (this.closestNavPoint.pathIndex!=potentialTarget) {
          targetPath=potentialTarget
        } else if (this.closestNavPoint.pathIndex==2) {
          targetPath=1;
        }
        else {
          targetPath=this.closestNavPoint.pathIndex+1;
        }
      }
      else if (willingToSwitch) {
      targetPath=potentialTarget;
      
    }
    this.pathChangeTarget=targetPath;
    }
    
   
    
    //Determine point in path for target
    let targetIndex = (this.closestNavPoint.pointIndex+pointsAhead)%this.navPoints[0].length;
    if (this.closestNavPoint.pointIndex>124 || this.closestNavPoint.pointIndex < 5) {
      //console.log(this.closestNavPoint.pointIndex+" "+targetIndex)
    }
    
    this.targetPoint = this.navPoints[targetPath][targetIndex];
    //console.log(targetPoi)
    this.targetMarker.setPosition(this.targetPoint.x,this.targetPoint.y)
  }
  
  findOptimalPath() {
    return 2;
  }
  
  turnToTarget() {
    //find angle between current point and target
    const deltaX=this.targetPoint.x - this.x;
    const deltaY= this.y - this.targetPoint.y ;
    const rads = Math.atan2(deltaY,deltaX);
    const angleToTarget = rads * 180 / Math.PI
    const angleDiff = mod(-this.angle-angleToTarget+180,360) -180;
    
    let turnAmount = 0;
    const turnThreshold = 20;
    if (angleDiff<-turnThreshold) {
      turnAmount=-1;
    } else if (angleDiff>turnThreshold) {
      turnAmount=1;
    } else {
      turnAmount = angleDiff/turnThreshold;
    }
    
    const randTurnFactor =0.2;
    const randTurnRange = Math.abs(turnAmount*randTurnFactor);
    const randTurn = Math.random()*randTurnRange - randTurnRange/2;
    
    this.turn(turnAmount + randTurn)
    //this.scene.printText(turnAmount);
  }
  
  
  
  
  update(time,delta) {
this.accelerate(0.16);
  
    
    
    this.findClosestNavPoint(5);
    
    
    this.pickTargetPoint(this.gpsTargetRange);
    
    this.turnToTarget();
    super.update(time,delta);
  }
}