/**
 * Created by 李庆芳 on 2016/5/3.
 */

// create the role class
var roleobj = function(){
    this.x;
    this.y;
    this.radius;
}
roleobj.prototype.init = function(){
    var movableGrid = graph.movableGrid();
    var Index = parseInt(Math.random()*graph.movableGridNum)
    console.log(Index)
    //var yIndex = parseInt(Math.random()*graph.movableGridNum)
    this.x = movableGrid[Index].x-graph.gridL/2;
    this.y = movableGrid[Index].y-graph.gridL/2;
    this.radius = 30;
}
roleobj.prototype.draw = function(){
    game_ctx.fillStyle = "green"
    game_ctx.beginPath();
    game_ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
    game_ctx.fill();
}