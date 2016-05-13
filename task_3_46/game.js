/**
 * Created by 李庆芳 on 2016/5/3.
 */

/**
 *  Game Logic
 **/

// get canvas
// game canvas
var game_canvas = document.getElementById("game-stage");
game_canvas.width = 720;
game_canvas.height = 1280;
canW = game_canvas.width;
canH = game_canvas.height;
var game_ctx = game_canvas.getContext("2d");
//grid canvas
var grid_canvas = document.getElementById("grid");
grid_canvas.width = 720;
grid_canvas.height = 1280;
var grid_ctx = grid_canvas.getContext("2d");

var L = 60;  // the width and height of one grid
var level = 1;   // game level

// create the role and target
var role = new roleobj();
var target = new targetobj();
// create grid map
var graph = new Graph(L);
// create gridNode mouse is clicking
var click = new gridNode();
// create pathfinder
var finder = new astar(role, click, graph, game_ctx);

// render game
var render = function () {
    role.draw();
    target.draw();
}

// init game
var init = function () {
    graph.init();
    graph.draw(level);
    role.init();
    target.init();
    addEventHandler(game_canvas, "click", getIndex);
}

// get clicking grid's x & y
var getIndex = function (e) {
    var x = parseInt(e.offsetX - e.offsetX % L);
    var y = parseInt(e.offsetY - e.offsetY % L);
    click.x = x;
    click.y = y;

    findPath();
}

// find path
var findPath = function () {
    //var end = finder.pathTo(role);
    finder.pathTo(role);
    if (click.x == target.x && click.y == target.y) {
        reset();
    }
}

var reset = function () {
    cancelAnimationFrame(main);
    game_ctx.clearRect(0, 0, canW, canH);
    level++;
    init();
    main();
}

var main = function () {
    render();

    requestAnimationFrame(main);
}

/** other ... **/
// the event of startbutton
var startButton = document.getElementById("begin-bt")
addEventHandler(startButton, "click", begin);

function begin() {
    var pages = document.getElementsByClassName("page");
    pages[0].style.display = "none";
    pages[1].style.display = "none";
    init();
    main()
}

// support Internet Explorer
function addEventHandler(element, event, fun) {
    if (element.addEventListener) {
        element.addEventListener(event, fun, false);
    } else if (element.attachEvent()) {
        element.attachEvent("on" + event, fun)
    } else {
        element["on" + event] = fun;
    }
}



