import * as THREE from "three"
import Car3d from "../objects/Three/Car3d"
//import Test from "../objects/Three/Test"

const angleToRad = (angle) => {
  return angle * Math.PI / 180; 
}

export default class Graphics3d {
  
  constructor(args) {
    console.log(args)
    
    //console.log(args.roadData)
    
    const canvas = document.querySelector('#c');
    this.renderer = new THREE.WebGLRenderer({canvas});
  
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 10000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 350;
    this.camera.position.y=20;
    this.camera.position.x=350
    
    this.camera.lookAt(new THREE.Vector3( 50, 0, 50 ))
    
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x87CEFA );
    
    const road=this.getRoad(args.roadData);
    
    
    for (const wallData of args.walls) {
      const wall = this.getWall(wallData);
      //console.log(wall)
      this.scene.add(wall);
    }
    
    
    const ground=this.getGround();
    this.player=new Car3d({color:args.player.color});
    this.opponents={};
    for (const opp of args.opponents) {
        
      const car = new Car3d({color:opp.color});
      this.opponents[opp.id] =car;
      this.scene.add(car);
    }
    
    this.scene.add(road)
    this.scene.add(ground);
    this.scene.add(this.player);
    this.renderer.render(this.scene, this.camera);
  
  
   
    requestAnimationFrame(()=>this.render());
    
    
    const color = 0xFFFFFF;
    const intensity = 1;
    const dirLight = new THREE.DirectionalLight(color, intensity);
    dirLight.position.set(-1, 2, 4);
    this.scene.add(dirLight);
    
    const ambLight = new THREE.AmbientLight( 0x202020 ); // soft white light
    this.scene.add( ambLight );
    
  }
  
  render(time) {
    
    const camDist = 50;
    const camX= this.player.position.x+ camDist*Math.cos(Math.PI-this.player.rotation.y + 90*Math.PI/180);
    const camY= this.player.position.z+ camDist*Math.sin(Math.PI-this.player.rotation.y + 90*Math.PI/180);
    
    this.camera.position.z = camY;
    this.camera.position.x = camX;
    
    
    
  this.camera.lookAt(new THREE.Vector3( this.player.position.x,this.player.position.y,this.player.position.z ))
    //console.log(time);
 
    this.renderer.render(this.scene, this.camera);
   
    requestAnimationFrame(()=>this.render());
  }
  
  getWall(wallData) {
    let minX =wallData.points[0];
    let maxX = minX;
    let minZ =wallData.points[1]
    let maxZ =minZ;
    
    const h=50;
    let lastX=wallData.points[0];
    let lastZ=wallData.points[1];
    
    const vertices=[];
    
    for (let i =2; i<wallData.points.length;i+=2) {
      const newX=wallData.points[i];
      const newZ=wallData.points[i+1];
      vertices.push(...[
        { pos: [ newX,  h, newZ], norm: [ 0,  1,  0], uv: [0, 0], },
    { pos: [lastX,  h, lastZ], norm: [ 0,  1,  0], uv: [1, 0], },
    { pos: [ newX,  0,  newZ], norm: [ 0,  1,  0], uv: [0, 1], },
   
    { pos: [ newX,  0,  newZ], norm: [ 0,  1,  0], uv: [0, 1], },
    { pos: [lastX,  h, lastZ], norm: [ 0,  1,  0], uv: [1, 0], },
    { pos: [lastX,  0,  lastZ], norm: [ 0,  1,  0], uv: [1, 1], },
      ])
      
      lastX=newX;
      lastZ=newZ;
      
      minX = Math.min(minX,newX);
      maxX = Math.max(maxX,newX);
      minZ = Math.min(minZ,newZ);
      maxZ = Math.max(maxZ,newZ);
      
    }
    
    const bounds = {w:maxX-minX,h:maxZ-minZ};
    console.log(bounds.w)
    
    const positions = [];
    const normals = [];
    const uvs = [];
    for (const vertex of vertices) {
      
      positions.push(...vertex.pos);
      normals.push(...vertex.norm);
      uvs.push(...vertex.uv);
    }
      
    const geometry = new THREE.BufferGeometry();
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const uvNumComponents = 2;
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
  geometry.setAttribute(
      'normal',
      new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
    geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));
    
    const material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
    
    const wall=new THREE.Mesh(geometry,material);
    wall.position.x=wallData.x-bounds.w/2;
    wall.position.z=wallData.y-bounds.h/2;
    
    return wall;
    
  }
  
  getGround () {
    const geometry = new THREE.PlaneGeometry( 4000, 3000 );
      
      const colors = new Uint8Array([
    255, 0, 0, 
    0, 255, 0,
    0, 0, 255,
    0, 255, 0,
    255, 255, 0,
    0, 0, 255,
  ])
  
  geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3, true) );
      
      const material = new THREE.MeshBasicMaterial( {color: 0x337733, side: THREE.DoubleSide} );
      
      //const material = new THREE.MeshPhongMaterial( {vertexColors: THREE.VertexColors , side: THREE.DoubleSide});
      const plane = new THREE.Mesh( geometry, material );
      plane.rotation.x=90*Math.PI/180;
      plane.position.x=200;
      plane.position.z=150;
      return plane;
  }
  
  getRoad(roadData) {
    const w =roadData.width;
    let currDir = roadData.dir+0;
    
    //let lastOp={x:roadData.x,z:roadData.y};
    //let lastIp={x:roadData.x,z:roadData.y+w};
    
    
    let lastOp={x:roadData.x,z:roadData.y};
    let lastIp={x:roadData.x,z:roadData.y+w};
    
    const vertices = [
      /*
      { pos: [ 1,  1, -1], norm: [ 0,  1,  0], uv: [0, 0], },
    { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 0], },
    { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 1], },
   
    { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 1], },
    { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 0], },
    { pos: [-1,  1,  1], norm: [ 0,  1,  0], uv: [1, 1], },
    */
      ];
    
    const addStraight=(dist)=>{
      const newX1 = lastOp.x + dist * Math.cos(angleToRad(currDir));
      const newZ1 = lastOp.z + dist * Math.sin(angleToRad(currDir));
      
      const newX2 = newX1 + w*Math.cos(angleToRad(currDir+90));
      const newZ2 = newZ1 + w*Math.sin(angleToRad(currDir+90));
      
      
      vertices.push(...[
        { pos: [ newX1,  1, newZ1], norm: [ 0,  1,  0], uv: [0, 0], },
    { pos: [lastOp.x,  1, lastOp.z], norm: [ 0,  1,  0], uv: [1, 0], },
    { pos: [ newX2,  1,  newZ2], norm: [ 0,  1,  0], uv: [0, 1], },
   
    { pos: [ newX2,  1,  newZ2], norm: [ 0,  1,  0], uv: [0, 1], },
    { pos: [lastOp.x,  1, lastOp.z], norm: [ 0,  1,  0], uv: [1, 0], },
    { pos: [lastIp.x,  1,  lastIp.z], norm: [ 0,  1,  0], uv: [1, 1], },
      ])
      
      lastOp.x=newX1;
      lastOp.z=newZ1;
      lastIp.x=newX2;
      lastIp.z=newZ2;
    }
    
    const addTurn=(turnDir,stepDist, steps, stepAngle) =>{
      for (let i =0;i<steps;i++) {
      
      let newX1,newZ1,newX2,newZ2;
      
      if (turnDir === "l") {
        currDir = (currDir - stepAngle + 360) % 360;
        newX1 = lastOp.x + stepDist * Math.cos(angleToRad(currDir));
        
        newZ1 = lastOp.z + stepDist * Math.sin(angleToRad(currDir));
        
        newX2 = newX1 + w*Math.cos(angleToRad(currDir+90));
        
        newZ2 = newZ1 + w*Math.sin(angleToRad(currDir+90));
        
      }
      else if (turnDir === "r") {
        currDir = (currDir + stepAngle) % 360
        
        newX2 = lastIp.x + stepDist * Math.cos(angleToRad(currDir));
        newZ2 = lastIp.z + stepDist * Math.sin(angleToRad(currDir));
        newX1 = newX2 + w*Math.cos(angleToRad(currDir-90));
        newZ1 = newZ2 + w*Math.sin(angleToRad(currDir-90));
      }
      
      vertices.push(...[
        { pos: [ newX1,  1, newZ1], norm: [ 0,  1,  0], uv: [0, 0], },
    { pos: [lastOp.x,  1, lastOp.z], norm: [ 0,  1,  0], uv: [1, 0], },
    { pos: [ newX2,  1,  newZ2], norm: [ 0,  1,  0], uv: [0, 1], },
   
    { pos: [ newX2,  1,  newZ2], norm: [ 0,  1,  0], uv: [0, 1], },
    { pos: [lastOp.x,  1, lastOp.z], norm: [ 0,  1,  0], uv: [1, 0], },
    { pos: [lastIp.x,  1,  lastIp.z], norm: [ 0,  1,  0], uv: [1, 1], },
      ])
      
      
      lastOp.x=newX1;
      lastOp.z=newZ1;
      lastIp.x=newX2;
      lastIp.z=newZ2;
      
    }
  }
    
    for (const p of roadData.data) {
      
      if (p.type ==0) {
        addStraight(p.dist);
      } else if (p.type==1) {
        addTurn(p.dir,p.stepDist, p.steps, p.stepAngle);
      }
    }
    
    const positions = [];
    const normals = [];
    const uvs = [];
    for (const vertex of vertices) {
      
      positions.push(...vertex.pos);
      normals.push(...vertex.norm);
      uvs.push(...vertex.uv);
    }
      
    const geometry = new THREE.BufferGeometry();
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const uvNumComponents = 2;
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
  geometry.setAttribute(
      'normal',
      new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
    geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));
    
    const material = new THREE.MeshBasicMaterial( {color: 0x777777, side: THREE.DoubleSide} );
    
    const road=new THREE.Mesh(geometry,material);
    
    return road;
  }

  update(opponents, player) {
    //console.log(player.x);
    this.player.position.x = player.x;
    this.player.position.z = player.y;
    this.player.rotation.y = Math.PI-(player.rot+90*Math.PI/180);
    
    for (const oppData of opponents) {
      const opp = this.opponents[oppData.id];
      if (opp) {
        //console.log(oppData)
        opp.position.x=oppData.x;
        opp.position.z=oppData.y;
      opp.rotation.y=Math.PI-(oppData.rot+90*Math.PI/180);
      } else 
        alert("opponent id not found")
    }
    //console.log(player.x,player.y)
  }
  
}