import Phaser from "phaser"
import Road from "./Road"
import Car from "./Car"

export default class Map {
  
  constructor (scene, road, checkpoints, bg) {
    this.scene =scene;
    scene.cameras.main.setBackgroundColor(bg);
    this.road = road;
    this.checkpoints=checkpoints;
    this.cars=[];
    this.lapCount=3;
    this.shouldStart=true;
    
    
  }
  
  static mapFromData(scene,roadData,wallData,bounds, checkpoints,bg) {
    
    
    const road = Road.roadFromData(
      scene,
      roadData.x,
      roadData.y,
      roadData.width,
      roadData.dir,
      roadData.path,
      roadData.color,
      bg
    );
    for (const wd of wallData) {
      
      const shape = scene.add.polygon(wd.x,wd.y,wd.points,wd.color);
      
      let pointString = "";
      for (const p of wd.points) {
        pointString+= p+" ";
      }
      const body =scene.matter.add.gameObject(shape, { shape: { type: 'fromVerts', verts: pointString, flagInternal: true }, isStatic: true });
    }
    
    const borderWidth=10;
    const borderPoints = `${0} ${0} ${0+bounds.w} ${0} ${0+bounds.w} ${0+bounds.h} ${0} ${0+bounds.h} ${0} ${0+borderWidth} ${0+borderWidth} ${0+borderWidth} ${0+borderWidth} ${0+bounds.h - borderWidth} ${0+bounds.w-borderWidth} ${0+bounds.h-borderWidth} ${0+bounds.w-borderWidth} ${0+borderWidth} ${0} ${0+borderWidth}`;
    
    const borderShape = scene.add.polygon(bounds.x, bounds.y, borderPoints, 0x000000);
    scene.matter.add.gameObject(borderShape, { shape: { type: 'fromVerts', verts: borderPoints, flagInternal: true }, isStatic: true });
   
   const checkpointShapes = [];
   
   for (const cp of checkpoints) {
     const w = 10;
     
     const points = `0 0 0 ${Math.max(bounds.w,bounds.h)} ${w} ${Math.max(bounds.w,bounds.h)} ${w} 0`
     
     const shape = scene.add.polygon(cp.centerX, cp.centerY, points,0x00ffff,0.0);
     const body = scene.matter.add.gameObject(shape, { shape: { type: 'fromVerts', verts: points, flagInternal: true }, isStatic: true });
     shape.setOrigin(0.5,1)
      
     shape.body.position.y += shape.height/2;
     shape.y-=shape.height/2
     
     shape.setCollisionGroup(2);
     shape.setCollidesWith(0);
     
     shape.setAngle(cp.angle);
     
     checkpointShapes.push(shape);
     
   }
    
    return new Map(scene,road,checkpointShapes,bg);
  }
  
  static defaultMap(scene) {
    
    const roadData = {
      x:150,
      y:200,
      width:100,
      dir:0,
      color:0x888888,
      path:[
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
    }
    
    const walls = [
      {points: [
        150,850,
        375,850,
        495,720,
        495,670,
        515,670,
        515,730,
        385,870,
        150,870
        
      ],
      color:0x883300,
      x:410,
      y:280
      }
    ]
    
    const bounds = {x:300,y:300,w:800,h:600};
    
    const checkpoints = [{
      centerX:440,
      centerY:300,
      angle:90
    },{
      centerX:300,
      centerY:360,
      angle:180
    }, {
      centerX:360,
      centerY:360,
      angle:0
    }
    ];
    
    return Map.mapFromData(scene,roadData,walls,bounds,checkpoints,0x337733)
  }
  
  addCar(car) {
    this.cars.push(car);
    car.setMapDetails(this.checkpoints.length, this.lapCount);
  }
  
  startRace(time) {
    this.startTime=now();
    for (const car of this.cars) {
        car.start(this.startTime);
        this.scene.startRace(this.startTime);
      }
  }
  
  update(time, delta) {
    
    for (const car of this.cars) {
      for (const [i,cp] of Object.entries(this.checkpoints)) {
        this.scene.matter.overlap(cp,car,(a,b)=>{
          car.passCheckpoint(i,this.checkpoints.length,time);
        })
      }
    }
  }
  
}