import Phaser from 'phaser';
import Game from "./scenes/Game"

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scale: {
      parent: 'phaser-example',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600
    },
    scene: [
      Game
    ]
};

const thisgsme = new Phaser.Game(config);
