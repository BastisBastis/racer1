import Phaser from 'phaser';
import Game from "./scenes/Game"
import RaceOver from "./scenes/RaceOver"
import UI from "./scenes/UI"
import Test3d from "./scenes/Test3d"

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scale: {
      parent: 'phaser-example',
      mode: Phaser.Scale.NONE,
      //autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600
    },
    physics: {
      default: 'matter',
      matter: {
          debug: false
      }
  },
    scene: [
      Game,
      RaceOver,
      UI
    ]
};

const thisgsme = new Phaser.Game(config);
