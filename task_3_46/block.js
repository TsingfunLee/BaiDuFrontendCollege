/**
 * Created by 李庆芳 on 2016/5/3.
 */

var blockobj = function(){ // block类声明
    this.x = [];
    this.y = [];
    this.width = [];
    this.height = [];
    this.bool = [];
    this.num;
}

//blockobj.prototype.init = function(){
//    for (var i = 0; i<w/n;i++){
//        this.x[i] =
//    }
//}
//
//blockobj.prototype.buildMap = function(){
//
//}

blockobj.prototype.num = 100;

blockobj.prototype.init = function(){ // 成员函数--初始化
    for(var i = 0 ; i < this.num ; i ++){
        this.x[i] = Math.floor( Math.random() * Math.floor(w/n) )* n;
        this.y[i] = Math.floor( Math.random() * Math.floor(h/40) + Math.floor(h/120) )* n;
        this.width[i] = Math.floor( Math.random() * 5 + 5 - Math.floor(level/5) )* n;
        this.height[i] = Math.floor( Math.random() * 5 + 5 - Math.floor(level/5) )* n;
        this.bool[i] = true;

        var nx1 = this.x[i];
        var nx2 = this.x[i] + this.width[i];
        var ny1 = this.y[i];
        var ny2 = this.y[i] + this.height[i];

        for(var j = 0 ; j < i ; j ++){
            var ox1 = this.x[j];
            var ox2 = this.x[j] + this.width[j];
            var oy1 = this.y[j];
            var oy2 = this.y[j] + this.height[j];

            if(nx1 <= ox1 && ny1 <= oy1 && ny2 >= oy1 && nx2 >= ox1 ||
                nx1 <= ox1 && ny1 >= oy1 && ny1 <= oy2 && nx2 >= ox1 ||
                nx1 >= ox1 && nx1 <= ox2 && ny1 <= oy1 && ny2 >= oy1 ||
                nx1 >= ox1 && nx1 <= ox2 || nx2 > w || ny2 > 5*h/6)
                this.bool[i] = false;
        }
    }
}

blockobj.prototype.draw = function(){//成员函数--绘制
    game_ctx.fillStyle = "#2E1E1E";

    for(var i = 0 ; i < this.num ; i ++){
        if(this.bool[i]){
            game_ctx.fillRect(this.x[i],this.y[i],this.width[i],this.height[i]);
        }
    }
}

blockobj.prototype.buildMap = function(){//成员函数--生成虚拟地图
    for(var i = 0 ; i < h/n ; i ++){
        map[i] = [];
        for(var j = 0 ; j < w/n ; j ++){
            map[i][j] = true;
            //console.log(i,j)
        }
    }

    for(var i = 0 ; i < this.num ; i ++){
        if(this.bool[i]){
            for(var j = this.y[i]/n ; j < (this.y[i] + this.height[i])/n ; j++){
                for(var k = this.x[i]/n ; k < (this.x[i] + this.width[i])/n ; k++){
                    //console.log(j,k)
                    map[j][k] = false;
                }
            }
        }
    }
}