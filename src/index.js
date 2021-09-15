import Phaser from 'phaser';
import Game from "./scenes/Game"
import RaceOver from "./scenes/RaceOver"
import UI from "./scenes/UI"
import Menu from "./scenes/Menu"


const config = {
    type: Phaser.AUTO,
    parent: 'phaserContainer',
    //width: 800,
    //height: 600,
    transparent:true,
    
    scale: {
      parent: 'phaser-example',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600
    }, 
    physics: {
      default: 'matter',
      matter: {
          debug:true
      }
  },
    scene: [
      Menu,
      Game,
      RaceOver,
      UI
    ]
};

const thisgsme = new Phaser.Game(config);
