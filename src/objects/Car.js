import Phaser from "phaser"


export default class Car extends Phaser.Physics.Matter.Sprite {
  
  constructor(scene,color,x,y) {
    super(scene.matter.world,200,250,"car")
    
    this.setTint(0xff0000);
    this.setScale(0.125);
    
    this.maxSpeed=5;
    this.accSpeed =0.005
    
    this.setFrictionAir(0.1);
    //this.setMass(10);
    
    
    scene.add.existing(this);
    
    
    
  }
  
  turn(dir) {
    //Change turning method
    const turnSpeed=0.01 * this.getSpeed();
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
    
  }
  
}