import Phaser from "phaser"
import Road from "./Road"
import Car from "./Car"
import MapCollection from "../assets/maps.json"

export default class Map {
  
  constructor (scene, road, checkpoints, startPoints, bg) {
    this.scene =scene;
    scene.cameras.main.setBackgroundColor(bg);
    this.road = road;
    this.checkpoints=checkpoints;
    this.cars=[];
    this.lapCount=3;
    this.shouldStart=true;
    this.startPoints = startPoints
    
    
  }
  
  static mapFromData(scene,roadData,wallData,bounds, checkpoints, finishLine, startPoints,bg) {
    
    
    const road = Road.roadFromData(
      scene,
      roadData.x,
      roadData.y,
      roadData.width,
      roadData.dir,
      roadData.path,
      roadData.optimalPath,
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
     const length = cp.length? cp.length: Math.max(bounds.w,bounds.h);
     
     const points = `0 0 0 ${length} ${w} ${length} ${w} 0`
     
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

   scene.add.polygon(finishLine.x, finishLine.y, finishLine.points, 0xffffff);

    
    return new Map(scene,road,checkpointShapes, startPoints,bg);
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
          dir:"r",
          stepDist:10,
          steps:9,
          stepAngle:10
        },
        {
          type:1,
          dir:"l",
          stepDist:10,
          steps:18,
          stepAngle:10
        },
        {
          type:0,
          dist:70,
        },
        {
          type:1,
          dir:"l",
          stepDist:10,
          steps:10,
          stepAngle:9
        },
        {
          type:1,
          dir:"r",
          stepDist:10,
          steps:23,
          stepAngle:9
        },
        
        {
          type:1,
          dir:"r",
          stepDist:10,
          steps:14,
          stepAngle:3
        },
        {
          type:0,
          dist:200,
        },
        {
          type:1,
          dir:"l",
          stepDist:10,
          steps:8,
          stepAngle:10
        },
        {
          type:1,
          dir:"r",
          stepDist:10,
          steps:40,
          stepAngle:6
        },
        {
          type:1,
          dir:"l",
          stepDist:10,
          steps:9,
          stepAngle:10
        },
        {
          type:0,
          dist:200,
        },
        {
          type:1,
          dir:"l",
          stepDist:10,
          steps:9,
          stepAngle:10
        },
        {
          type:1,
          dir:"r",
          stepDist:10,
          steps:14,
          stepAngle:10
        },
        {
          type:1,
          dir:"l",
          stepDist:10,
          steps:4,
          stepAngle:10
        },
        {
          type:1,
          dir:"r",
          stepDist:10,
          steps:16,
          stepAngle:10
        },
        {
          type:1,
          dir:"l",
          stepDist:10,
          steps:8,
          stepAngle:10
        },
        {
          type:0,
          dist:200
        },
        {
          type:1,
          dir:"l",
          stepDist:10,
          steps:9,
          stepAngle:10
        },
        
        {
          type:1,
          dir:"r",
          stepDist:10,
          steps:25,
        stepAngle:7
        },
        {
          type:0,
          dist:150
        },
        {
          type:1,
          dir:"r",
          stepDist:10,
          steps:5,
        stepAngle:9.2
        },
        {
          type:0,
          dist:220
        },
      ]
    }
    
    const walls = [
      {points: [
        0,0,
        8,-8,
        260,140,
        260,260,
        250,260,
        250,150
      ],
      color:0x883300,
      x:495,
      y:270
      },
      {points: [
        0,0,
        5,-8,
        100,40,
        230,370,
        440,420,
        435,430,
        185,370,
        -100,600,
        -105,595,
        180,360,
        225,370,
        100,50
      ], 
      color:0x883300,
      x:722,
      y:360
      },
      {points: [
        0,0,
        10,0,
        10,300,
        0,300
      ],
      color:0x883300,
      x:360,
      y:800
      },
      {points: [
        0,0,
        0,10,
        400,10,
        400,0
      ],
      color:0x883300,
      x:135,
      y:350
      },
    ]
    
    const bounds = {x:200,y:350,w:2000,h:1500};
    
    const checkpoints = [{
      centerX:695,
      centerY:180,
      angle:70
    },
      {
      centerX:550,
      centerY:590,
      angle:120
    },{
      centerX:360,
      centerY:800,
      angle:180
    },
    {
      centerX:330,
      centerY:350,
      length:200,
      angle:0
    }
    ];
    const finishLine = {
      x:330,
      y:250,
      points:[
        0,0,
        0,100,
        10,100,
        10,0
      ]
    };

    const startPoints = [
      {x:300, y:230},
      {x:300, y:270},
      {x:230, y:230},
      {x:230, y:270},
      {x:160, y:230},
      {x:160, y:270}
    ]
    
    //until "point": "path" is optimal
    const optimalPath=[
      {point:28,path:2},
      {point:70,path:1},
      {point:100,path:2},
      {point:135,path:1},
      {point:160,path:2},
      {point:200,path:0},
      {point:210,path:1},
      {point:240,path:2},
      {point:275,path:0},
      {point:5000,path:2}
    ]
    
    const optimalPath1=[
     
      {point:5000,path:1}];
    
    roadData.optimalPath=optimalPath;
    const mapData={
      title:"Map 3",
      roadData:roadData,
      walls:walls,
      bounds:bounds,
      checkpoints:checkpoints,
      finishLine:finishLine,
      startPoints:startPoints,
      bg:0x337733
    };
    
    return Map.mapFromData(scene,roadData,walls,bounds,checkpoints, finishLine, startPoints,0x337733)
  }

  static mapWithIndex(scene,mapIndex) {
    const mapData= MapCollection[mapIndex];
    //console.log(mapData);
    
    /*
    title:"Map 1",
      roadData:roadData,
      walls:walls,
      bounds:bounds,
      checkpoints:checkpoints,
      finishLine:finishLine,
      startPoints:startPoints,
      bg:0x337733 */
    
    return Map.mapFromData(
      scene,
      mapData.roadData,
      mapData.walls,
      mapData.bounds,
      mapData.checkpoints, 
      mapData.finishLine, 
      mapData.startPoints,
      mapData.bg);
    
    //return Map.defaultMap(scene);
  }
  
  addCar(car) {
    if (this.cars.length < this.startPoints.length) {
      const {x, y} = this.startPoints[this.cars.length];
      car.setPosition(x, y);
      this.cars.push(car);
      car.setMapDetails(this.checkpoints.length, this.lapCount, this.road.navPoints,this.road.optimalPath);
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