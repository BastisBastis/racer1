import Phaser from "phaser"


export default class Car extends Phaser.Physics.Matter.Sprite {
  
  constructor(scene,color,x,y) {
    super(scene.matter.world,200,250,"car")
    
    this.scene=scene;
    
    this.setTint(0xff0000);
    this.setScale(0.125);
    
    this.maxSpeed=5;
    this.accSpeed =0.0015
    
    this.setFrictionAir(0.05);
    //this.setMass(10);
    
    
    scene.add.existing(this);
    
    
    
    
  }
  
  turn(dir) {
    //Change turning method
    const turnSpeed=0.02 * this.getSpeed();
    this.setAngularVelocity(dir*turnSpeed);
    
  }
  
  getSpeed() {
    const v =this.body.velocity;
    return Math.sqrt(v.x*v.x+v.y*v.y);
  }
  
  accelerate(amount) {
    let realMaxSpeed = this.maxSpeed;
    console.log(this.scene.road.contains) 
    /*
    if (!Phaser.Geom.Polygon.ContainsPoint(this.scene.road, this.position)) {
      realMaxSpeed *=0.5;
    }
    */
    if (this.getSpeed() <= realMaxSpeed) {
      this.thrust(this.accSpeed*amount);
      //console.log(this.getSpeed())
    }
    
    
  }
  
  update(delta) {
    
  }
  
}