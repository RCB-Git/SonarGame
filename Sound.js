
class Sound {
    constructor(originIN,  rangeIN, soundIN ) {
        this.origin = originIN;
        this.range = rangeIN;
        this.sound  = new p5.SoundFile('Sounds/SonarOut.ogg');
        this.sound.
    }
    
    soundOff(){
        if(this.sound.isLoaded())
        this.sound.play();
        else print("not loaded")
    }
}