import Phaser from "phaser"
import Car from "../objects/Car"


export default class Controller {
  constructor(scene,player) {
    this.scene = scene;
    this.player = player;
    
    this.steeringTouch = false;
    
    //this.movementRect=scene.add.rectangle(scene.cameras.main.width-150,scene.cameras.main.height-150,275,275,0x000000,0.3);
    const steeringOrigin = scene.add.circle(scene.cameras.main.width-100,100,30,0x000000,0.0);
    const steeringPoint = scene.add.circle(50,50,10,0x882222,0.0)
    
    //enable multi touch
    scene.input.addPointer(3);
    
    /* Camera dimensions */
    const cam = {w:scene.cameras.main.width, h:scene.cameras.main.height};
      
    const maxJoystick = 100;
    //Register new touches
    scene.input.on("pointerdown", pointer => {
      if (!this.steeringTouch && pointer.x>cam.w/2) {
        
        this.steeringTouch = {
          id:pointer.id,
          startX:pointer.x,
          startY:pointer.y,
          accelerate:0,
          turn:0
        };
        //steeringOrigin.setPosition(pointer.position.x, pointer.position.y);
        steeringOrigin.fillAlpha = 0.3;
        steeringPoint.setPosition(steeringOrigin.x, steeringOrigin.y);
        steeringPoint.fillAlpha = 1;
        
      } 
    });
    
    scene.input.on("pointerup", pointer => {
      if (this.steeringTouch && this.steeringTouch.id === pointer.id) {
        
        this.steeringTouch = false;
        steeringOrigin.fillAlpha = 0.0;
        steeringPoint.fillAlpha = 0.0;
        
      } 
    });
    
    scene.input.on("pointermove", pointer => {
      if (this.steeringTouch && this.steeringTouch.id === pointer.id) {
        
        let deltaX = Math.min(Math.max(this.steeringTouch.startX-pointer.x, -maxJoystick),maxJoystick);
        let deltaY = Math.min(Math.max(this.steeringTouch.startY-pointer.y, -maxJoystick),maxJoystick);
        if (deltaX > -10 && deltaX < 10) {
          deltaX = 0;
        }
        else {
          deltaX = deltaX>0 ? deltaX-10 : deltaX+10;
        }
        if (deltaY > -10 && deltaY < 10) {
          deltaY = 0;
        }
        else {
          deltaY = deltaY>0 ? deltaY-10 : deltaY+10;
        }
        
        steeringPoint.x = steeringOrigin.x-deltaX;
        steeringPoint.y = steeringOrigin.y-deltaY;
        
        this.steeringTouch.accelerate=deltaY/(maxJoystick-10);
        this.steeringTouch.turn=-deltaX/(maxJoystick-10);
        
      } 
    });
    
    const keyCodes = {
      a:Phaser.Input.Keyboard.KeyCodes.A,
      s:Phaser.Input.Keyboard.KeyCodes.S,
      d:Phaser.Input.Keyboard.KeyCodes.D,
      w:Phaser.Input.Keyboard.KeyCodes.W
    }
    this.keys = {}
    for (const [key,keyCode] of Object.entries(keyCodes)) {
      this.keys[key] = scene.input.keyboard.addKey(keyCode);
    }
    

  }
  
  update(delta) {
    
    const dRatio = delta*0.01;
    if (this.steeringTouch) {
      this.player.accelerate(dRatio*this.steeringTouch.accelerate);
      if (this.steeringTouch.accelerate<0) {
        this.player.turn(-this.steeringTouch.turn);
      }
      else {
        this.player.turn(this.steeringTouch.turn);
      }
      
    } else {
      if (this.keys.w.isDown) {
        this.player.accelerate(dRatio);
      } else if (this.keys.s.isDown) {
        this.player.accelerate(-dRatio);
      }
      if (this.keys.a.isDown) {
        this.player.turn(-0.8);
      }
      else if (this.keys.d.isDown) {
        this.player.turn(0.8);
      }
    }
    
    
  }
}