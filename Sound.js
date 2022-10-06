

let SonarOut;
class Sound {
    constructor(originIN, rangeIN, soundIN) {
        this.origin = originIN;
        this.range = rangeIN;
        this.sound = new p5.SoundFile('Sounds/SonarOut.ogg');
        let grain = 0;
        let pts = [];

        this.hitbox = new cShape(this.origin.x, this.origin.y, [])

    }

    soundOff() {
        if (this.sound.isLoaded())
            this.sound.play();
        else print("not loaded")
    }
}