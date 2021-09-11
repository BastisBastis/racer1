import * as THREE from "three"

const getGeometry =(rgb)=> {
    
    
  const vertices = [
  // windshield
  { pos: [-1,  0,  2], norm: [ 0,  0,  1], uv: [0, 0], },
  { pos: [ 1, 0,  2], norm: [ 0,  0,  1], uv: [1, 0], },
  { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], },
 
  { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], },
  { pos: [ 1,  0,  2], norm: [ 0,  0,  1], uv: [1, 0], },
  { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [1, 1], },
  
  //hood
  
  { pos: [-1, -0.5,  3], norm: [ 0,  0,  1], uv: [0, 0], },
  { pos: [ 1, -0.5,  3], norm: [ 0,  0,  1], uv: [1, 0], },
  { pos: [-1,  0,  2], norm: [ 0,  0,  1], uv: [0, 1], },
 
  { pos: [-1,  0,  2], norm: [ 0,  0,  1], uv: [0, 1], },
  { pos: [ 1, -0.5,  3], norm: [ 0,  0,  1], uv: [1, 0], },
  { pos: [ 1,  0,  2], norm: [ 0,  0,  1], uv: [1, 1], },
  
  //front
  { pos: [-1, -1,  3], norm: [ 0,  0,  1], uv: [0, 0], },
  { pos: [ 1, -1,  3], norm: [ 0,  0,  1], uv: [1, 0], },
  { pos: [-1,  -0.5,  3], norm: [ 0,  0,  1], uv: [0, 1], },
 
  { pos: [-1,  -0.5,  3], norm: [ 0,  0,  1], uv: [0, 1], },
  { pos: [ 1, -1,  3], norm: [ 0,  0,  1], uv: [1, 0], },
  { pos: [ 1,  -0.5,  3], norm: [ 0,  0,  1], uv: [1, 1], },
  // right
  { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [0, 0], },
  { pos: [ 1, -1, -2], norm: [ 1,  0,  0], uv: [1, 0], },
  { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 1], },
 
  { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 1], },
  { pos: [ 1, -1, -2], norm: [ 1,  0,  0], uv: [1, 0], },
  { pos: [ 1,  1, -1], norm: [ 1,  0,  0], uv: [1, 1], },
  
  { pos: [ 1,  1,  -1], norm: [ 1,  0,  0], uv: [0, 1], },
  { pos: [ 1, -1, -2], norm: [ 1,  0,  0], uv: [1, 0], },
  { pos: [ 1,  0.3, -2], norm: [ 1,  0,  0], uv: [1, 1], },
  //right door
  { pos: [ 1, -1,  3], norm: [ 1,  0,  0], uv: [0, 0], },
  { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [1, 0], },
  { pos: [ 1,  0,  2], norm: [ 1,  0,  0], uv: [0, 1], },
 
  { pos: [ 1,  0,  2], norm: [ 1,  0,  0], uv: [0, 1], },
  { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [1, 0], },
  { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [1, 1], },
  
  { pos: [ 1,  -1,  3], norm: [ 1,  0,  0], uv: [0, 1], },
  { pos: [ 1, 0,  2], norm: [ 1,  0,  0], uv: [1, 0], },
  { pos: [ 1,  -0.5,  3], norm: [ 1,  0,  0], uv: [1, 1], },
  
  
  // back
  { pos: [ 1, -1, -2], norm: [ 0,  0, -1], uv: [0, 0], },
  { pos: [-1, -1, -2], norm: [ 0,  0, -1], uv: [1, 0], },
  { pos: [ 1,  0.3, -2], norm: [ 0,  0, -1], uv: [0, 1], },
 
  { pos: [ 1,  0.3, -2], norm: [ 0,  0, -1], uv: [0, 1], },
  { pos: [-1, -1, -2], norm: [ 0,  0, -1], uv: [1, 0], },
  { pos: [-1,  0.3, -2], norm: [ 0,  0, -1], uv: [1, 1], },
  
  // rear window
  { pos: [ 1,  0.3, -2], norm: [ 0,  0, -1], uv: [0, 0], },
  { pos: [-1,  0.3, -2], norm: [ 0,  0, -1], uv: [1, 0], },
  { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 1], },
 
  { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 1], },
  { pos: [-1,  0.3, -2], norm: [ 0,  0, -1], uv: [1, 0], },
  { pos: [-1,  1, -1], norm: [ 0,  0, -1], uv: [1, 1], },
  
  // left
  { pos: [-1, -1, -2], norm: [-1,  0,  0], uv: [0, 0], },
  { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 0], },
  { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 1], },
 
  { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 1], },
  { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 0], },
  { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [1, 1], },
  
  { pos: [-1, -1, -2], norm: [-1,  0,  0], uv: [0, 1], },
  { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [1, 0], },
  { pos: [-1,  0.3, -2], norm: [-1,  0,  0], uv: [1, 1], },
  
  // left door
  { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [0, 0], },
  { pos: [-1, -1,  3], norm: [-1,  0,  0], uv: [1, 0], },
  { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [0, 1], },
 
  { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [0, 1], },
  { pos: [-1, -1,  2], norm: [-1,  0,  0], uv: [1, 0], },
  { pos: [-1,  0,  2], norm: [-1,  0,  0], uv: [1, 1], },
  
  { pos: [-1,  0,  2], norm: [-1,  0,  0], uv: [0, 1], },
  { pos: [-1, -1,  3], norm: [-1,  0,  0], uv: [1, 0], },
  { pos: [-1,  -0.5,  3], norm: [-1,  0,  0], uv: [1, 1], },
  
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
    
    rgb[0], rgb[1], rgb[2],  //hood
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    
    rgb[0], rgb[1], rgb[2], //front
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    
    rgb[0], rgb[1], rgb[2],  //right
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],
    
    rgb[0], rgb[1], rgb[2],  //right door
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],
    
    rgb[0], rgb[1], rgb[2], //back
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    
    0, 0, 0, //rear window
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    
    rgb[0], rgb[1], rgb[2],  //left
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],
    
    rgb[0], rgb[1], rgb[2],  //left door
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],
    
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
    rgb[0], rgb[1], rgb[2],  
    rgb[0], rgb[1], rgb[2],
  ])
  
  geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3, true) );
    
  geometry.scale(7,5,6);
  
  return geometry;
}

export default class Car3d extends THREE.Mesh {
  
  constructor(args) {
    let hexColor=args.color.toString(16);
    while (hexColor.length<6) {
      hexColor = "00"+hexColor;
    }
    //hexColor="ff0000"
    const aRgbHex = hexColor.match(/.{1,2}/g);
    const rgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    
    
    const geometry = getGeometry(rgb);
    
    
    const material = new THREE.MeshPhongMaterial( {vertexColors: THREE.VertexColors });
    

    
    super(geometry, material);
    
    this.position.y=6;
    
  }
  
  
  
}

