//BELVAL GIOVANNI


require('dotenv').config(); // allow environment variable to be used


/*-- SERVER SETUPS-- */

var express = require("express");
var app     = express();

    // I create a server that will run on my routeur 
    // so that other people in the same wifi as me 
    // will be able to play with me at : {myNetworkAdress}:{PORT}

var server = app.listen(process.env.PORT , process.env.ADRESS , ()=> {
    console.log('Listening to port '+process.env.PORT);
});



app.use(express.static('public')); // get => my public directory

var socket = require('socket.io');

var io     = socket(server, {
  cors: {
    origin     : process.env.ORIGIN,
    methods    : ["GET", "POST"],
    credentials: true,
  },
}); 



/* GAME SERVER */

    // pipe's data
var dataPipe = {
    x   : parseInt(process.env.WIDTH),
    top : 200,
};

    //each connection
io.sockets.on('connection' , (socket) => {


        // link a 'move' with the client
    socket.on('move' , (data) => {
        socket.broadcast.emit('move' , data); 
        // send the current bird position to others clients
        
    })
    
        // call each time the client emit the 'pipe' message
    socket.on('pipe' , (data) => {
        

        dataPipe = update(dataPipe);        // shift the pipe to the left
        io.sockets.emit('pipe' , dataPipe)  // send the pipe updated

        // if a bird touches the pipe , we stop the game
        if(collide(data)) {
            io.sockets.emit('collided' , {stop:true});
        }
        else{
            io.sockets.emit('collided' , {stop:false});
        }
    })


})


/* PIPE'S METHODS*/

const update = (dataPipe) => {
    // the pipe shifts to the left

    dataPipe = {
        x   : dataPipe.x - process.env.XSPEED,
        top : dataPipe.top,
    }

    if( dataPipe.x + parseInt(process.env.W) < 0){

        //if the pipe is no longer on the screen , we reset his position.

        dataPipe = {
            x   : parseInt(process.env.WIDTH),
            top : random(parseInt(process.env.HEIGHT)*0.75),
        }
    }

    return dataPipe;
}


const collide = function(dataBird){

    //TODO : write a better collision function 


    if( dataBird.x + dataBird.r/2 > dataPipe.x && dataBird.x + dataBird.r/2 < dataPipe.x + parseInt(process.env.W) ){
        if(( dataBird.y - dataBird.r/2 ) < dataPipe.top || ( dataBird.y + dataBird.r/2 ) > dataPipe.top + 110 ){
            return true;
        }
    }

    return false;
}



/* UTILS */

function random(min = 0 , max = 1){

    if( min  < max ){
        temp = max;
        max  = min;
        min  = temp;
    }

    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

