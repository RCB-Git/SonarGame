class boat{
constructor(sx,sy)
{
this.x = sx;
this.y = sy;
this.v = createVector(0,0);
this.heading=0; 
this.controlled = true;
this.speed = .1; 
this.slewSpeed=.01;
this.friction = .97
this.fcooldown =100; 
this.pcooldown =100;
}
update(){
    this.v = limit(this.v);
    this.x+=this.v.x;
    this.y+=this.v.y;
    
    this.v.mult(this.friction)
    if(this.controlled)
this.controlls();

}
display(){
    let fork = p5.Vector.fromAngle(this.heading).mult(25);

    line(this.x, this.y, this.x+fork.x,this.y+fork.y);
}
controlls(){
   
    let add = createVector(0,0);
   
if(keyIsDown(87))// w
   add.add(p5.Vector.fromAngle(this.heading,this.speed))
    if (keyIsDown(83))//s
        add.add(p5.Vector.fromAngle(this.heading,-this.speed))
    if (keyIsDown(65))//a
        this.heading-=this.slewSpeed;
    if (keyIsDown(68))//d
        this.heading+=this.slewSpeed;
    
    this.v.add(add);
}

}

