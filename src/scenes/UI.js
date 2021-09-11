import Phaser from "phaser"
import EventsCenter from "../helpers/EventsCenter"

const showFrameRate =false;

export default class UI extends Phaser.Scene {
  constructor() {
    super({key:"UI"});
  }
  
  create(data) {
    
    
    
    
    this.elapsedTimeLabel=this.add.text(350,70,"0:00:00", {fontSize:50})
    this.lapTimeLabel=this.add.text(350,120,"", {fontSize:50});
    this.lapLabel=this.add.text(350,10,"Lap: 1/"+data.lapCount, {fontSize:50});
    
    this.steeringOrigin = this.add.circle(this.cameras.main.width-100,100,30,0x000000,0.0);
    this.steeringPoint = this.add.circle(50,50,10,0x882222,0);
    
    this.countdownLight = this.add.circle(this.cameras.main.width/2,140, 30, 0x0000ff,0);
    
    if (showFrameRate)
      this.frameRateLabel= this.add.text(50,500,"Frame rate: ", {fontSize:30});
    
    EventsCenter.on("setLapTimeLabel",this.setLapTimeLabel,this);
    EventsCenter.on("setElapsedTimeLabel",this.setElapsedTimeLabel,this);
    EventsCenter.on("setLapLabel",this.setLapLabel,this);
    
    EventsCenter.on("showCountdown",this.setShowCountdown,this);
    EventsCenter.on("setCountdownColor",this.setCountdownColor,this);
    
    EventsCenter.on("showSteering",this.setShowSteering,this);
    EventsCenter.on("adjustSteeringPosition", this.adjustSteeringPosition, this);
    
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
		EventsCenter.off("setLapTimeLabel",this.setLapTimeLabel,this);
    EventsCenter.off("setElapsedTimeLabel",this.setElapsedTimeLabel,this)
	})
  }
  
  setCountdownColor(clr) {
    
    this.countdownLight.fillColor=clr;
  }
  
  setShowCountdown(show) {
    this.countdownLight.fillAlpha = show?1:0;
  }
  
  adjustSteeringPosition(delta) {
    this.steeringPoint.x = this.steeringOrigin.x- delta.deltaX/2;
    this.steeringPoint.y = this.steeringOrigin.y- delta.deltaY/2;
  }
    
  setShowSteering(show) {
    if (show) {
      this.steeringOrigin.fillAlpha=0.3;
      this.steeringPoint.fillAlpha=1;
      this.steeringPoint.setPosition(this.steeringOrigin.x,this.steeringOrigin.y)
    } else {
      this.steeringOrigin.fillAlpha=0;
      this.steeringPoint.fillAlpha=0;
    }
  }
  
  setLapTimeLabel(time) {
      this.lapTimeLabel.text=time;
      if (time!=="") {
        setTimeout(()=>{
          this.setLapTimeLabel("")
        },2000)
      }
    }
    
  setElapsedTimeLabel(time) {
      this.elapsedTimeLabel.text=time;
    }
    
    setLapLabel(text) {
      this.lapLabel.text=text;
    }
  
  update(time,delta) {
    
    if (showFrameRate) {
      const fr=1000/delta;
      this.frameRateLabel.text="Frame rate: "+fr;
    }
    
  }
}