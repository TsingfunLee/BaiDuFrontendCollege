/**
 * Created by 李庆芳 on 2016/5/3.
 */
/**
 * A star search algorithm
 * based on javascript-astar https://github.com/bgrins/javascript-astar
 **/

var astar = function(){
    var open = [];
    var close = [];
}

astar.prototype.search = function(){

}

var Graph = function(gridL){  // parameter is the length of one grid
    this.grid = [];
    this.gridL = gridL;
    this.hGridNum = Math.floor(canW/this.gridL);
    this.vGridNum = Math.floor(canH/this.gridL);
    this.totalNum = this.hGridNum*this.vGridNum;
    for (var i = 0;i<this.hGridNum;i++){
        for (var j = 0;j<this.vGridNum;j++){
            var node = new gridNode(i*this.gridL,j*this.gridL,parseInt(Math.random()*10%2));
            this.grid.push(node);
        }
    }
}
Graph.prototype.draw = function(){
    // draw grid
    for (var i = 0;i<=this.hGridNum;i++){
        for (var j = 0;j<=this.vGridNum;j++){
            grid_ctx.beginPath();
            grid_ctx.strokeStyle = "#f6bf19";
            grid_ctx.moveTo(0,j*this.gridL);
            grid_ctx.lineTo(canW,j*this.gridL);
            grid_ctx.stroke();
        }
        grid_ctx.beginPath();
        grid_ctx.strokeStyle = "#f6bf19";
        grid_ctx.moveTo(i*this.gridL,0);
        grid_ctx.lineTo(i*this.gridL,canH);
        grid_ctx.stroke();
    }

    // draw blocks
    for (var i = 0; i < this.totalNum; i++) {
        if (this.grid[i].block === 1){
            game_ctx.beginPath();
            game_ctx.fillStyle = "#402a03";
            game_ctx.rect(this.grid[i].x, this.grid[i].y, this.gridL, this.gridL);
            game_ctx.fill();
        }
    }
    // 清除一部分block，否则生成的block过多，无法通过
    // 根据关卡难易，清除block的多少
    for (var i = 0;i<this.totalNum*(1/level);i++){
        var j = parseInt(Math.random()*this.totalNum)
        game_ctx.clearRect(this.grid[j].x,this.grid[j].y,this.gridL,this.gridL)
        this.grid[j].block = 0;
    }
}
// 获得可以行走的grid
Graph.prototype.movableGrid = function(){
    this.movableGridNum = 0;
    for (var i = 0;i<this.totalNum;i++){
        if (this.grid[i].block === 0){
            this.movableGridNum++;
            console.log(this.movableGridNum)
            return this.grid[i];
        }
    }
}

var gridNode = function(x,y,block){
    this.x = x;
    this.y = y;
    this.block = block;    // block 代表有无障碍，0  无 ，1  有
}