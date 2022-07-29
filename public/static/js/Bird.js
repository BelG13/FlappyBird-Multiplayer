function Bird(x , y , r) {

    /* --- fields --- */

    this.x       = x;
    this.y       = y;
    this.r       = r;
    this.yspeed  = 1;
    this.gravity = 1.1;

    /* --- Methods --- */

    this.show = function(img){
        // we print the bird img
        image(img , this.x-this.r/2 , this.y-this.r/2 , this.r , this.r)

    }


    //position update due to gravity 

    this.update = function(){

        // the bird falls
        this.y      += this.yspeed;
        this.yspeed += this.gravity;

        // the bird stay on the canvas
        if( this.y > height-this.r){
            this.y = height-this.r;
        }
    }

    // called when the user press "SPACE"
    // the bird goes up

    this.up = function(){
        this.yspeed = -10;
    }

}


