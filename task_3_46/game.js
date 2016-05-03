/**
 * Created by 李庆芳 on 2016/5/3.
 */
// get canvas
// game canvas
var game_canvas = document.getElementById("game-stage");
game_canvas.width = 720;
game_canvas.height = 1280;
w = game_canvas.width;
h = game_canvas.height;
var game_ctx = game_canvas.getContext("2d");
//grid canvas
var grid_canvas = document.getElementById("grid");
grid_canvas.width = 720;
grid_canvas.height = 1280;
var grid_ctx = grid_canvas.getContext("2d");
var n = 60;  // the width and height of one grid
var map = [];    // the array of the grid
var deltaTime,lateTime;
var level = 0;

// draw grid
var drawGrid = function(){
    for (var x = 0;x<= w;x = x+n){
        grid_ctx.strokeStyle = "#f6bf19";
        grid_ctx.lineWidth = 2;
        grid_ctx.beginPath();
        grid_ctx.moveTo(x,0);
        grid_ctx.lineTo(x,h);
        grid_ctx.stroke();
    }
    for (var y = 0;y <= h;y = y+n){
        grid_ctx.strokeStyle = "#f6bf19";
        grid_ctx.lineWidth = 2;
        grid_ctx.beginPath();
        grid_ctx.moveTo(0,y);
        grid_ctx.lineTo(w,y);
        grid_ctx.stroke();
    }
}

// create the role and target
var role = new roleobj();
var target = new targetobj();
var block = new blockobj();

var render = function () {
    role.draw();
    target.draw();
    block.draw();
    drawGrid();
}

var init = function(){
    role.init();
    target.init();
    block.init();
    block.buildMap();
    deltaTime = 0;
    lateTime = Date.now();
    game_canvas.addEventListener("click",moveTo,false);
}

var reset = function(){
    cancelAnimationFrame(main);
    main();
}

var main = function(){
    init();
    render();
    deltaTime = Date.now()-lateTime;
    lateTime = Date.now();

    requestAnimationFrame(main);
}

var startButton = document.getElementById("begin-bt")
startButton.addEventListener("click",begin,false);

function begin(){
    var pages = document.getElementsByClassName("page");
    pages[0].style.display = "none";
    pages[1].style.display = "none";
    main()
}



