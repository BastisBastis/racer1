import * as THREE from "three"

export default class Test extends THREE.Mesh {
  constructor() {
    console.log("hipp")
    super( new THREE.PlaneGeometry( 400, 300 ), new THREE.MeshBasicMaterial( {color: 0x777777, side: THREE.DoubleSide} ) );
    console.log("hippwti")
  }
}