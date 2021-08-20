import Phaser from "phaser"
//import Road from "./Road"


export default class Car extends Phaser.Physics.Matter.Sprite {
  
  constructor(scene,color,x,y) {
    super(scene.matter.world,200,250,"car")
    
    this.scene=scene;
    
    this.setTint(0xff0000);
    this.setScale(0.125);
    
    this.maxSpeed=5;
    this.accSpeed =0.0015
    
    this.airFric=0.05;
    this.setFrictionAir(0.05);
    //this.setMass(10);
    
    
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
  
  update(delta) {
    
    if (!this.scene.road.contains(this.x,this.y)) {
      //console.log(7272)
      this.setFrictionAir(this.airFric*2)
    }
    else {
      this.setFrictionAir(this.airFric)
    }
    
    
  }
  
}