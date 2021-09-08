import Phaser from "phaser"
import carImg from '../assets/car1.png';


export default class Test3d extends Phaser.Scene {
  
  
  constructor (data) {
      
      super({key:"Test3d"});
  }

  preload () {
      this.load.image('car', carImg);
  }
  
  create () {
    this.cameras.main.setBackgroundColor("#337733");
    this.add.text(50,300,"Hoppeti", {fontSize:50}).setScrollFactor(0);
    
    
  const vertices = [
          -1, 1, 
            1, 1, 
            -1, -1,
            1, -1,
        ];

        const uvs = [
            0, 0,
            1, 0,
            0, 1,
            1, 1
        ];

        const indicies = [ 0, 2, 1, 2, 3, 1 ];

        const mesh = this.add.mesh(400, 300, 'car');

        mesh.addVertices(vertices, uvs, indicies,true);

        mesh.panZ(7);

        this.debug = this.add.graphics();

        mesh.setDebug(this.debug);

        this.add.text(16, 16, 'Rotate with mouse (+ Shift to pan)\nWheel to zoom\nD to toggle debug');

        this.input.keyboard.on('keydown-D', () => {

            if (mesh.debugCallback)
            {
                mesh.setDebug();
            }
            else
            {
                mesh.setDebug(this.debug);
            }

        });

        const rotateRate = 1;
        const panRate = 1;
        const zoomRate = 4;

        this.input.on('pointermove', pointer => {

            if (!pointer.isDown)
            {
                return;
            }

            if (!pointer.event.shiftKey)
            {
                mesh.modelRotation.y += pointer.velocity.x * (rotateRate / 800);
                mesh.modelRotation.x += pointer.velocity.y * (rotateRate / 600);
            }
            else
            {
                mesh.panX(pointer.velocity.x * (panRate / 800));
                mesh.panY(pointer.velocity.y * (panRate / 600));
            }

        });

        this.input.on('wheel', (pointer, over, deltaX, deltaY, deltaZ) => {

            mesh.panZ(deltaY * (zoomRate / 600));

        });
    }

    update ()
    {
        this.debug.clear();
        this.debug.lineStyle(1, 0x00ff00);
    }
  
}