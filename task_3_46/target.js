/**
 * Created by 李庆芳 on 2016/5/3.
 */

// create target class
var targetobj = function(){
    this.x;
    this.y;
    this.sideLength;
    this.i;
    this.j;
}

targetobj.prototype.init = function(){
    var movableGrid = graph.getMovableGrid();
    var Index = parseInt(Math.random()*graph.movableGridNum)
    this.x = movableGrid[Index].x;
    this.y = movableGrid[Index].y;
    if (this.x === role.x && this.y === role.y){   // 如果target的位置和role的位置重合，重新init
        init();
    }
    this.sideLength = 60;
    this.i = graph.getIndex(this.x,this.y)[0];
    this.j = graph.getIndex(this.x,this.y)[1];
}

targetobj.prototype.draw = function(){
    var del = this.sideLength/4*1.7;   // half height of triangle
    game_ctx.fillStyle = "yellow";
    game_ctx.beginPath();
    game_ctx.moveTo(this.x+graph.gridL/2-this.sideLength/2,this.y+graph.gridL/2-del);
    game_ctx.lineTo(this.x+graph.gridL/2+this.sideLength/2,this.y+graph.gridL/2-del);
    game_ctx.lineTo(this.x+graph.gridL/2,this.y+graph.gridL/2+del);
    game_ctx.fill()
}