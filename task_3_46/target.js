/**
 * Created by 李庆芳 on 2016/5/3.
 */

// create target class
var targetobj = function(){
    this.x;
    this.y;
    this.sideLength;
}

targetobj.prototype.init = function(){
    this.x = w/2;
    this.y = 1200;
    this.sideLength = 30;
}

targetobj.prototype.draw = function(){
    var del = this.sideLength/2*1.732;   // half height of triangle
    game_ctx.fillStyle = "yellow";
    game_ctx.beginPath();
    game_ctx.moveTo(this.x-this.sideLength/2,this.y-del);
    game_ctx.lineTo(this.x+this.sideLength,this.y-del);
    game_ctx.lineTo(this.x,this.y+del);
    game_ctx.fill()
}