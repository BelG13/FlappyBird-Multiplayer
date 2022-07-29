/* PIPE */

function Pipe(x , top){

    /* --- Fields --- */

    this.w      = 20;              //pipe width
    this.x      = x;               //pipes's position
    this.top    = top;             //end of the up pipe
    this.bottom = this.top + 110   //top of the bottom pipe

    /* --- Methods --- */

    //print the entire pipe
    this.show = function(upPipeImg , downPipeImg){
        
        image(downPipeImg , this.x , 0           , this.w , this.top);              //downPipe
        image(upPipeImg   , this.x , this.bottom , this.w , height-this.bottom);    //up pipe

    }




}