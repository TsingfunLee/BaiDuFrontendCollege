/**
 * Created by 李庆芳 on 2016/5/3.
 */

// create the role class
var roleobj = function(){
    this.x;
    this.y;
    this.radius;
    this.i;
    this.j;
}
roleobj.prototype.init = function(){
    var movableGrid = graph.getMovableGrid();
    var Index = parseInt(Math.random()*graph.movableGridNum)
    this.x = movableGrid[Index].x;
    this.y = movableGrid[Index].y;
    this.radius = 30;
    this.i = graph.getIndex(this.x,this.y)[0];
    this.j = graph.getIndex(this.x,this.y)[1];
}
roleobj.prototype.draw = function(){
    game_ctx.fillStyle = "green"
    game_ctx.beginPath();
    game_ctx.arc(this.x+graph.gridL/2,this.y+graph.gridL/2,this.radius,0,2*Math.PI);
    game_ctx.fill();
}