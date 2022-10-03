class game{
constructor(){
this.activeLevel = "test.json"; 
this.thisSub = new boat(100,100);
this.thisSub.controlled = true; 
this.otherSubs;
}
update(){
this.thisSub.update();
this.thisSub.display();
this.otherSubs.forEach(update());
    
}

}

