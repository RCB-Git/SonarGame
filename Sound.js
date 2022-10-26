let LoadedSounds = [];
let speedofsound = 100; // 
class Sound {
    constructor(headingIN, rangeIN, soundIN) {
       this.heading = headingIN;
       this.range = rangeIN;
       this.soundIN = new P5.Oscillator("Square")
       this.maxDistance = 400

       this.vol = this.range/this.maxDistance;
       delay = 
       this.pan = sin(this.heading)
       this.pitch = cos(this.heading)
       this.go();
    }
    go(){ 
        

    

    }
}