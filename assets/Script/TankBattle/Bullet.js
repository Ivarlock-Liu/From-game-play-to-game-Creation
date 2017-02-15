cc.Class({
    extends: cc.Component,

    properties: {
        flyDuration:0,
        pickRadius:0,
    },

    // use this for initialization
    onLoad: function () {
        this.moveLeft=this.moveAction(cc.p(-960,0));
        this.moveRight=this.moveAction(cc.p(960,0));
        this.moveUp=this.moveAction(cc.p(0,960));
        this.moveDown=this.moveAction(cc.p(0,-960));
        this.owner = null;
		//this.node.runAction(this.moveAction(cc.p(960,0)));
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.owner == "player"){
            if(this.getEnemyDistance(this.game.enemy1.position)<this.pickRadius){
                this.onPicked(this.game.enemy1);
                return;
            }
            if(this.getEnemyDistance(this.game.enemy2.position)<this.pickRadius){
                this.onPicked(this.game.enemy2);
                return;
            }
        }else{
            if(this.getEnemyDistance(this.game.player.position)<this.pickRadius){
                this.onPicked(this.game.player);
                return;
            }
        }
        
        var bulletTilePos = this.game.getTilePosByCanvasPos(this.node.position);
        if(this.game.getTileType(this.game.barrierLayer, bulletTilePos) == "wall"){
            this.destroyWall(bulletTilePos);
            this.node.destroy();
        }
        if(this.game.getTileType(this.game.barrierLayer, bulletTilePos) == "steel"){
            this.node.destroy();
        }
    },
    getEnemyDistance:function(enemyPos){
      var dist = cc.pDistance(this.node.position,enemyPos);
      return dist;
    },
    moveAction:function(destinationPos){
        var move=cc.moveBy(this.flyDuration,destinationPos);
        var callback=cc.callFunc(this.deleteBullet,this);
        return cc.sequence(move,callback);
    },
    
    deleteBullet:function(){
        this.node.destroy();
    },
    
    destroyWall:function(wallPos){
        this.game.barrierLayer.removeTileAt(wallPos);
        this.game.metaLayer.removeTileAt(wallPos);
    },
    onPicked:function(enemy){
		enemy.destroy();
        if(this.owner != "player"){
            this.game.gameOver();
        }else{
            this.game.gainScore();
        }
        this.node.destroy();
        //cc.log("you kill a enemy!!!");
    }
});
