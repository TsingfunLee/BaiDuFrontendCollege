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
    this.x = w/2
    this.y = 60
    this.radius = 30;
}
roleobj.prototype.draw = function(){
    //game_ctx.save();
    game_ctx.fillStyle = "green"
    game_ctx.beginPath();
    game_ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
    game_ctx.fill();
    //game_ctx.restore();
}