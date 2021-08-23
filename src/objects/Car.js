import Phaser from "phaser"
//import Road from "./Road"


export default class Car extends Phaser.Physics.Matter.Sprite {
  
  constructor(scene,color,x,y) {
    super(scene.matter.world,x,y,"car");
    
    this.scene=scene;
    
    this.setTint(color);
    this.setScale(0.125);
    this.setOrigin(0.25,0.5);
    this.body.position.x-=this.width*0.0625/2
    this.body.positionPrev.x-=this.width*0.0625/2
    
    this.maxSpeed=5;
    this.accSpeed =0.0015
    
    this.airFric=0.05;
    this.setFrictionAir(0.05);
    //this.setMass(10);
    this.setCollisionGroup(1);
    this.setCollidesWith([0,1,3,4]);
    this.checkpointsPassed=-1;
    this.finishedLaps=0;
    this.lapTimes=[];
    this.startTime;
    this.lapStartTime;
    
    scene.add.existing(this);
    
    
  }
  
  turn(dir) {
    //Change turning method
    //const turnSpeed=0.02 * this.getSpeed();
    
    const turnSpeed=0.04 * Math.pow(this.getSpeed(),0.3);
    
    //console.log("speed: "+this.getSpeed()+ " ts: " + turnSpeed);
    
    this.setAngularVelocity(dir*turnSpeed);
    
  }
  
  getSpeed() {
    const v =this.body.velocity;
    return Math.sqrt(v.x*v.x+v.y*v.y);
  }
  
  accelerate(amount) {
    
    if (this.getSpeed() <= this.maxSpeed) {
      this.thrust(this.accSpeed*amount);
    }
  }
  
  setMapDetails(checkpointCount,lapCount) {
    this.checkpointsPassed=checkpointCount-1;
    this.lapCount = lapCount;
  }
  
  passCheckpoint(i,checkpointCount, time) {
    const tmpPassed =this.checkpointsPassed;
    this.checkpointsPassed = (this.checkpointsPassed + 1) % checkpointCount == i ? i : this.checkpointsPassed;
    if (tmpPassed!=this.checkpointsPassed && this.checkpointsPassed == checkpointCount-1) {
      this.finishLap(time);
    }
  }
  
  finishLap (time) {
    this.finishedLaps+=1;
    const lapTime= time-this.lapStartTime;
    this.lapStartTime=time;
    this.lapTimes.push(lapTime);
    console.log(lapTime)
  }
  
  start(time) {
    this.startTime=time;
    this.lapStartTime=time;
  }
  
  update(time,delta) {
    
    if (!this.scene.road.contains(this.x,this.y)) {
      
      this.setFrictionAir(this.airFric*2)
    }
    else {
      this.setFrictionAir(this.airFric)
    }
    
    
  }
  
}