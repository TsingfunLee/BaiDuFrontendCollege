/**
 * Created by 李庆芳 on 2016/5/3.
 */
/**
 * A star search algorithm
 * based on javascript-astar https://github.com/bgrins/javascript-astar
 **/

var astar = function(star,end,graph){
    var open = [];
    var close = [];
    var star = star;
    var end = end;
    var current = new gridNode();
    var path = [];
    this.init = function(){
        close[0] = star;
        open = graph.getNeighbors(star);
        current = open[0];
        console.log(open)
    }
    this.search = function(){
        for (var i = 0; i < open.length; i++){   // 获得相邻点的F值
            open[i].F = this.getF(open[i]);
        }
        //var curIndex = this.getMinF();
        //current = open[curIndex];
        current = this.getMinF();
        console.log(current)
        path.push(current);
        for (var i = 0; i < open.length; i++) {
            //if (i != curIndex) {
                close.push(open[i]);
                //open.splice(i,1);
           // }
        }
        open = [];
        open = graph.getNeighbors(current);
        console.log(open)
        if (current.x!=end.x || current.y!=end.y){
            this.search();
            //console.log("meizhaodao")
            //return false;
        }else if(current.x == end.x&&current.y == end.y){
            //return path;
            return true;
        }
    }
    this.getF = function(current){   // get F value
        //var G = (current.x-star.x)*(current.x-star.x) + (current.y-star.y)*(current.y-star.y);
        var F = (current.x-end.x)*(current.x-end.x) + (current.y-end.y)*(current.y-end.y);
        //var F = G + H;

        return F;
    }
    this.getMinF = function(){   // get min F value
        var min = current;
        //var index = 0;
        for (var i = 0; i < open.length; i++){
            if (open[i].F <= min.F){
                min = open[i];
                //index = i;
            }
        }
        //console.log(min)
        return min;
    }
    this.pathTo = function(role){
        this.init();
        this.search()
        //path = this.search();
        //if ( path = this.search()){
            console.log(path);
            for (var i = 0;i<path.length;i++){
                //setTimeout(function(){
                    role.x = path[i].x;
                    role.y = path[i].y;
                    //i++;
               // },0)
            }
        //}else{
            //console.log("meiyouzhaodaolujing")
        //}
        return end;
    }
}

// create map
var Graph = function(gridL){  // parameter is the length of one grid
    this.grid = [];
    this.gridL = gridL;
    this.hGridNum = Math.floor(canW/this.gridL);
    this.vGridNum = Math.floor(canH/this.gridL);
    this.totalNum = this.hGridNum*this.vGridNum;
    for (var i = 0;i<this.hGridNum;i++){
        this.grid[i] = [];
        for (var j = 0;j<this.vGridNum;j++){
            var node = new gridNode(i*this.gridL,j*this.gridL,i,j,parseInt(Math.random()*10%2));
            this.grid[i][j] = node;
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
    for (var i = 0; i < this.hGridNum; i++) {
        for (var j = 0; j < this.vGridNum; j++){
            if (this.grid[i][j].block === 1){
                game_ctx.beginPath();
                game_ctx.fillStyle = "#402a03";
                game_ctx.rect(this.grid[i][j].x, this.grid[i][j].y, this.gridL, this.gridL);
                game_ctx.fill();
            }
        }

    }
    // 清除一部分block，否则生成的block过多，无法通过
    // 根据关卡难易，清除block的多少
    for (var i = 0;i<this.hGridNum*(1/level);i++){
        for (var j = 0;j<this.vGridNum*(1/level);j++){
            var iIndex = parseInt(Math.random()*this.hGridNum)
            var jIndex = parseInt(Math.random()*this.vGridNum)
            game_ctx.clearRect(this.grid[iIndex][jIndex].x,this.grid[iIndex][jIndex].y,this.gridL,this.gridL)
            this.grid[iIndex][jIndex].block = 0;
        }
    }
}
// 获得可以行走的grid
Graph.prototype.getMovableGrid = function(){
    this.movableGridNum = 0;
    var movableGrid = [];
    for (var i = 0;i<this.hGridNum;i++){
        for (var j = 0;j<this.vGridNum;j++){
            if (this.grid[i][j].block === 0){
                movableGrid[this.movableGridNum] = this.grid[i][j];
                this.movableGridNum++;
            }
        }
    }
    return movableGrid;
}
// 根据坐标x,y获得索引i,j
Graph.prototype.getIndex = function(x,y){
    for (var i = 0;i<this.hGridNum;i++){
        for (var j = 0;j<this.vGridNum;j++){
            if (this.grid[i][j].x == x&&this.grid[i][j].y == y){
                var index = [i,j];
                return index;
            }
        }
    }
}
// 获得相邻的8个gridNode
Graph.prototype.getNeighbors = function(curNode){
    var ret = [];
    var grid = this.grid;
    var i = curNode.i;
    var j = curNode.j;
    // west
    if (grid[i-1]&&grid[i-1][j]&&grid[i-1][j].block === 0){
        ret.push(grid[i-1][j]);
    }
    // north
    if (grid[i]&&grid[i][j-1]&&grid[i][j-1].block === 0){
        ret.push(grid[i][j-1]);
    }
    // east
    if (grid[i+1]&&grid[i+1][j]&&grid[i+1][j].block === 0){
        ret.push(grid[i+1][j])
    }
    // south
    if (grid[i]&&grid[i][j+1]&&grid[i][j+1].block === 0){
        ret.push(grid[i][j+1]);
    }
    // northwest
    if (grid[i-1]&&grid[i-1][j-1]&&grid[i-1][j-1].block === 0){
        ret.push(grid[i-1][j-1])
    }
    // northeast
    if (grid[i+1]&&grid[i+1][j-1]&&grid[i+1][j-1].block === 0){
        ret.push(grid[i+1][j-1])
    }
    // southwest
    if (grid[i-1]&&grid[i-1][j+1]&&grid[i-1][j+1].block === 0){
        ret.push(grid[i-1][j+1])
    }
    // southwest
    if (grid[i+1]&&grid[i+1][j+1]&&grid[i+1][j+1].block === 0){
        ret.push(grid[i+1][j+1])
    }

    return ret;
}

// node of graph
var gridNode = function(x,y,i,j,block){
    this.x = x;    // gridNode的坐标,位于grid的左上角
    this.y = y;
    this.i = i;    // gridNode在grid里的索引
    this.j = j;
    this.block = block;    // block 代表有无障碍，0  无 ，1  有
    this.F = 0;
}