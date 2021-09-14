import Phaser from "phaser"
import mapData from "../assets/maps.json"

const fontFamily = "Monaco";
const mapLabelSize = "46px"

export default class Menu extends Phaser.Scene {
  
  
  constructor () {
      
      super({key:"Menu"});
  }

  preload () {
      
  }
  
  create () {
    const cam = this.cameras.main;
    
    this.add.rectangle(0,0,cam.width,cam.height,0xffffff,0.7).setOrigin(0,0);
    
    this.scene.launch("Game",{demo:true,show3d:false});
    this.scene.bringToTop()
    
    this.selectedMap=0;
    
    this.objects = [];
    this.mapLabels=[];
    this.showTitle()
    
    
  }
  
  
  
  showTitle() {
    const cam = this.cameras.main;
    const titleLetterWidth=190;
    const words = ["RÄJS","ÄR","JÄTTE","SKOJ!"]
    for (const [i,letter] of ["R","Ä","J","S"].entries()) {
      const x = cam.width/2 - titleLetterWidth*(1.5-i);
      
      this.objects.push(this.add.text(x,100,letter, {font: " 120px Monaco", fill:"#fff"}).setOrigin(0.5,0.5));
      this.objects.push(this.add.text(x,200,words[i], {font: " 64px Monaco", fill:"#000"}).setOrigin(0.5,0.5));
    }
    
    this.objects.push(this.add.text(cam.width/2,cam.height*0.7,"Tryck för att spela", {font: " 40px Monaco", fill:"#000"}).setOrigin(0.5,0.5));
    
    
    this.input.on("pointerup",()=> {
      this.input.removeListener("pointerup");
      
      this.clearObjects();
      this.showMapSelection();
      
    })
  }
  
  clearObjects() {
    for (const obj of this.objects) {
      obj.destroy();
    }
  }
  
  showMapSelection() {
    this.mapLabels=[];
    
    const cam = this.cameras.main;
    this.objects.push(this.add.text(cam.width/2,cam.height*0.1,"Välj bana:", {font: " 60px Monaco", fill:"#000"}).setOrigin(0.5,0.5));
    
    const mapY=cam.height*0.3;
    const mapDeltaY=cam.height*0.15;
    for (const [i, map] of mapData.entries()) {
      const selectedStyle= i==this.selectedMap ? "Bold ": "";
      const label=
      this.add.text(cam.width/2,mapY+mapDeltaY*i,map.title, {font: selectedStyle+mapLabelSize+" "+fontFamily , fill:"#000"}).setOrigin(0.5,0.5).setInteractive().on("pointerdown", () => {
        this.selectMap(i);
      });
      this.mapLabels.push(label);
    }
    
    this.objects.push(this.add.text(cam.width/2,cam.height*0.8,"Starta!", {font: "60px "+fontFamily , fill:"#000"}).setOrigin(0.5,0.5).setInteractive().on("pointerdown", () => {
        this.scene.start("Game",{demo:false,show3d:true, mapIndex:this.selectedMap});
      }));
  }
  
  selectMap(i) {
    if (i!= this.selectedMap) {
      this.mapLabels[this.selectedMap].setStyle({
        fontStyle:"",
      });
      this.selectedMap=i;
      this.mapLabels[i].setStyle({
        fontStyle:"Bold",
      });
      this.scene.stop("Game");
      this.scene.launch("Game",{demo:true,show3d:false,mapIndex:i});
      this.scene.bringToTop()
    }
  }
  
  
  update() {
      
  }
  
}