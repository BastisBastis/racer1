import Phaser from "phaser"

import logoImg from '../assets/logo.png';

export default class Game extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', logoImg);
    }
      
    create ()
    {
      this.cameras.main.setBackgroundColor("#aaff00")
      
        
        
        console.log("huop")
    }
    
    createMap() {
      
      const roadParts = [];
      
    }
}

