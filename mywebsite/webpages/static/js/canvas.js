var my_canvas = document.querySelector("canvas");
var c=my_canvas.getContext("2d");
my_canvas.width=window.innerWidth*0.5;
my_canvas.height=window.innerHeight*0.5;

function make_court(){
    
    c.clearRect(0,0,my_canvas.width,my_canvas.height);
}

function start_ball(){
   /*var my_canvas = document.querySelector("canvas");
    my_canvas.width=window.innerWidth*0.5;
    my_canvas.height=window.innerHeight*0.5;*/
    //my_canvas.height=400;
    //var c=my_canvas.getContext("2d");
    c.clearRect(0,0,my_canvas.width,my_canvas.height);
    var ball_color=document.getElementById("ball_color").value;
    var radius=parseInt(document.getElementById("ball_radius").value);
    var x=radius+parseInt(document.getElementById("initial_x").value)/100*(my_canvas.width-2*radius);
    var dx=parseInt(document.getElementById("x-velocity").value);
    var y=radius+parseInt(document.getElementById("initial_y").value)/100*(my_canvas.height-2*radius);
    var dy=parseInt(document.getElementById("y-velocity").value);
    var ay=1;
    console.log(radius);
    console.log(x);
    console.log(y);
    console.log(dx);
    console.log(dy);
    var fraction=0.9;
    function animate(){
        requestAnimationFrame(animate);
        c.clearRect(0,0,my_canvas.width,my_canvas.height);
        c.beginPath();
        c.arc(x,y,radius,0,Math.PI*2,false);
        c.fillStyle=ball_color;
        c.fill();
        x+=dx;
        y+=dy;
        dy+=ay;
        if (x+radius>my_canvas.width || x-radius<0){
            dx=-1*fraction*dx;
        }
        if (y+radius>my_canvas.height || y-radius<0){
            dy=-1*fraction*dy;
        }
    }
    animate(); 
}
