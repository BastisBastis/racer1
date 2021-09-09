import * as THREE from "three"
import Car3d from "../objects/Three/Car3d"

export default class Graphics3d {
  
  constructor() {
    console.log("hepp")
    
    const canvas = document.querySelector('#c');
    this.renderer = new THREE.WebGLRenderer({canvas});
  
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 150;
    this.camera.position.y=200;
    this.camera.position.x=150
    
    this.camera.lookAt(new THREE.Vector3( 50, 0, 50 ))
    
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xdfeacf );
    
    const getGround=()=>{
      const geometry = new THREE.PlaneGeometry( 400, 300 );
      const material = new THREE.MeshBasicMaterial( {color: 0x777777, side: THREE.DoubleSide} );
      const plane = new THREE.Mesh( geometry, material );
      plane.rotation.x=90*Math.PI/180;
      plane.position.x=200;
      plane.position.z=150;
      return plane;
    }
    
    
    
    const ground=getGround();
    this.car=new Car3d();
    
    this.scene.add(ground);
    this.scene.add(this.car);
    this.renderer.render(this.scene, this.camera);
  
  
   
    requestAnimationFrame(this.render);
    
    
    const color = 0xFFFFFF;
    const intensity = 1;
    const dirLight = new THREE.DirectionalLight(color, intensity);
    dirLight.position.set(-1, 2, 4);
    this.scene.add(dirLight);
    
    const ambLight = new THREE.AmbientLight( 0x202020 ); // soft white light
    this.scene.add( ambLight );
    
    alert()
  }
  
  render(time) {
  //camera.lookAt(new THREE.Vector3( car.position.x,car.position.y,car.position.z ))
  
 
    this.renderer.render(scene, camera);
   
    requestAnimationFrame(this.render);
  }
  
}