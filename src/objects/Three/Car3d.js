import * as THREE from "three"

const getGeometry =()=> {
    
    
  const vertices = [
    // windshield
    { pos: [-1,  0,  2], norm: [ 0,  0,  1], uv: [0, 0], },
    { pos: [ 1, 0,  2], norm: [ 0,  0,  1], uv: [1, 0], },
    { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], },
   
    { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], },
    { pos: [ 1,  0,  2], norm: [ 0,  0,  1], uv: [1, 0], },
    { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [1, 1], },
    
    //hood
    
    { pos: [-1, -1,  2], norm: [ 0,  0,  1], uv: [0, 0], },
    { pos: [ 1, -1,  2], norm: [ 0,  0,  1], uv: [1, 0], },
    { pos: [-1,  0,  2], norm: [ 0,  0,  1], uv: [0, 1], },
   
    { pos: [-1,  0,  2], norm: [ 0,  0,  1], uv: [0, 1], },
    { pos: [ 1, -1,  2], norm: [ 0,  0,  1], uv: [1, 0], },
    { pos: [ 1,  0,  2], norm: [ 0,  0,  1], uv: [1, 1], },
    
    // right
    { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [0, 0], },
    { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 0], },
    { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 1], },
   
    { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 1], },
    { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 0], },
    { pos: [ 1,  1, -1], norm: [ 1,  0,  0], uv: [1, 1], },
    //right door
    { pos: [ 1, -1,  2], norm: [ 1,  0,  0], uv: [0, 0], },
    { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [1, 0], },
    { pos: [ 1,  0,  2], norm: [ 1,  0,  0], uv: [0, 1], },
   
    { pos: [ 1,  0,  2], norm: [ 1,  0,  0], uv: [0, 1], },
    { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [1, 0], },
    { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [1, 1], },
    // back
    { pos: [ 1, -1, -1], norm: [ 0,  0, -1], uv: [0, 0], },
    { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 0], },
    { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 1], },
   
    { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 1], },
    { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 0], },
    { pos: [-1,  1, -1], norm: [ 0,  0, -1], uv: [1, 1], },
    // left
    { pos: [-1, -1, -1], norm: [-1,  0,  0], uv: [0, 0], },
    { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 0], },
    { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 1], },
   
    { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 1], },
    { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 0], },
    { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [1, 1], },
    // left door
    { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [0, 0], },
    { pos: [-1, -1,  2], norm: [-1,  0,  0], uv: [1, 0], },
    { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [0, 1], },
   
    { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [0, 1], },
    { pos: [-1, -1,  2], norm: [-1,  0,  0], uv: [1, 0], },
    { pos: [-1,  0,  2], norm: [-1,  0,  0], uv: [1, 1], },
    // top
    { pos: [ 1,  1, -1], norm: [ 0,  1,  0], uv: [0, 0], },
    { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 0], },
    { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 1], },
   
    { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 1], },
    { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 0], },
    { pos: [-1,  1,  1], norm: [ 0,  1,  0], uv: [1, 1], },
    // bottom
    { pos: [ 1, -1,  2], norm: [ 0, -1,  0], uv: [0, 0], },
    { pos: [-1, -1,  2], norm: [ 0, -1,  0], uv: [1, 0], },
    { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 1], },
   
    { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 1], },
    { pos: [-1, -1,  2], norm: [ 0, -1,  0], uv: [1, 0], },
    { pos: [-1, -1, -1], norm: [ 0, -1,  0], uv: [1, 1], },
  ];
  
  
  
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
        
  const colors = new Uint8Array([
    0, 0, 0, //windshield
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    
    255,  0,  0,  //hood
    255,  0,  0,
    255,  0,  0,  
    255,  0,  0,
    255,  0,  0,  
    255,  0,  0,
    
    0,    255,0,  //right
    0,    255,0,
    0,    255,0,  
    0,    255,0,
    0,    255,0,  
    0,    255,0,
    
    0,    150,0,  //right door
    0,    150,0,
    0,    150,0,  
    0,    150,0,
    0,    150,0,  
    0,    150,0,
    
    0,    0,  255, //back
    0,    0,  255,
    0,    0,  255,
    0,    0,  255,
    0,    0,  255,
    0,    0,  255,
    
    255,  255,0,  //left
    255,  255,0,
    255,  255,0,  
    255,  255,0,
    255,  255,0,  
    255,  255,0,
    
    255,  255,100,  //left door
    255,  255,100,
    255,  255,100,  
    255,  255,100,
    255,  255,100,  
    255,  255,100,
    
    255,  0,  255,
    255,  0,  255,
    255,  0,  255,
    255,  0,  255,
    255,  0,  255,
    255,  0,  255,
    
    0,    255,255,
    0,    255,255,
    0,    255,255,
    0,    255,255,
    0,    255,255,
    0,    255,255,
  ])
  
  geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3, true) );
    
  geometry.scale(10,10,10);
  
  return geometry;
}

export default class Car3d extends THREE.Mesh {
  
  constructor() {
    
    
    const geometry = getGeometry();
    
    //const geometry = new THREE.PlaneGeometry( 400, 300 );
    
    const material = new THREE.MeshPhongMaterial( {vertexColors: THREE.VertexColors });
    
    //const material = new THREE.MeshBasicMaterial( {color: 0x777777, side: THREE.DoubleSide} );
    
    
    super(geometry, material);
    console.log("hiop")
    //this.geometry = geometry;
    //this.material = material
    this.position.y=10;
    
  }
  
  
  
}

