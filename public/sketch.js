


/* Bird variables */ 

var bird = null; // my bird
var bird_ = null; // friend's bird

/* Pipe */
var pipe;

/* client server */
var socket;


function preload(){
    backgroundImg = loadImage("./static/images/decor.png");
    birdImg1      = loadImage("./static/images/bird.png");  
    birdImg2      = loadImage("./static/images/bird2.png");  
    upPipeImg     = loadImage("./static/images/upPipe.png");
    downPipeImg   = loadImage("./static/images/downPipe.png");
}

function setup(){

    createCanvas(400,400);

    // my bird
    bird = new Bird(30 , 30 , 30);

    // socket connection 
    socket = io.connect('0.0.0.0:3000')

    // we receive the second bird position
    socket.on('move' , (data) => {
        bird_ = new Bird(data.x , data.y , data.r);
    })

    // pipe position

    socket.on('pipe' , (data) => {
        pipe = new Pipe(data.x , data.top);
    })

    socket.on('collided' , (data) => {
        if(data.stop){
            frameRate(0);
        }
    })


}


// space pressed => the bird goes up
function keyPressed(){
    if (key === ' '){
        bird.up();
    }
}


function draw(){
    image(backgroundImg , 0 , 0);
    
    try {

        bird.show(birdImg1);        // draw the bird
        bird.update();              // update the bird's position
        socket.emit('move' , bird); // we send our bird position

    } catch (error) {
        console.log(error);
    }

    try {
        bird_.show(birdImg2);       // draw our friend's bird
    } catch (error) {
        console.log(error);
    }

    dataBird = {
        x:bird.x,
        y:bird.y,
        r:bird.r,
    }

    try {
        pipe.show(upPipeImg , downPipeImg);
        socket.emit('pipe' , dataBird);

    } catch (error) {
        socket.emit('pipe' , dataBird);
    }

    
    

    
}

