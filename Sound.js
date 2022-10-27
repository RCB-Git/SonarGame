let LoadedSounds = [];
let speedofsound = 100; // 
class Sound {
    constructor(headingIN, rangeIN, soundIN) {
       this.heading = headingIN;
       this.range = rangeIN;
       this.sound = new p5.Oscillator("square")
       this.maxDistance = 400

        this.pitchrange = 400; 
        this.pitchoffset = 500; 
        
        this.duration = 100; 

       this.vol =  ( this.maxDistance - this.range ) / this.maxDistance;
       this.delayt = this.range/speedofsound // in seconds
       this.pan = sin(this.heading)
       this.pitch = (cos(this.heading) - 1) *this.pitchrange + this.pitchoffset
       this.go();
    }
    go(){ 
        // this.sound.pan(this.pan)
         this.sound.amp(this.vol)
        // this.sound.freq(this.pitch)
        this.delay = new p5.Delay();
        this.sound.start();
        // this.delay.process(this.sound, this.delayt)
    }
    update(){
        this.duration -- ;
        if(this.duration <= 0)
        this.sound.stop();    
    }
}