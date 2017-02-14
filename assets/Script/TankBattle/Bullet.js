cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        flyDuration:0,
        pickRadius:0,
    },

    // use this for initialization
    onLoad: function () {
        this.moveLeft=this.moveAction(cc.p(-960,0));
        this.moveRight=this.moveAction(cc.p(960,0));
        this.moveUp=this.moveAction(cc.p(0,960));
        this.moveDown=this.moveAction(cc.p(0,-960));
		//this.node.runAction(this.moveAction(cc.p(960,0)));
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.getEnemyDistance(this.game.enemy1.position)<this.pickRadius){
             this.onPicked(this.game.enemy1);
             return;
        }
        if(this.getEnemyDistance(this.game.enemy2.position)<this.pickRadius){
             this.onPicked(this.game.enemy2);
             return;
        }
        var bulletTilePos = this.game.getTilePosByCanvasPos(this.node.position);
        if(this.game.getTileType(this.game.barrierLayer, bulletTilePos) == "wall"){
            this.destroyWall(bulletTilePos);
            this.node.destroy();
        }
        if(this.game.getTileType(this.game.barrierLayer, bulletTilePos) == "steel"){
            this.node.destroy();
        }
        // switch(this.node.rotation){
        //     case 0:
        //         var nextPos = cc.p(bulletTilePos.x, bulletTilePos.y - 1);
        //         if(this.game.getTileType(this.game.barrierLayer, nextPos) == "wall"){
        //             this.destroyWall(nextPos);
        //             this.node.destroy();
        //         }
        //         if(this.game.getTileType(this.game.barrierLayer, nextPos) == "steel"){
        //             this.node.destroy();
        //         }
        //         break;
        //     case 90:
        //         var nextPos = cc.p(bulletTilePos.x + 1, bulletTilePos.y);
        //         if(this.game.getTileType(this.game.barrierLayer, nextPos) == "wall"){
        //             this.destroyWall(nextPos);
        //             this.node.destroy();
        //         }
        //         if(this.game.getTileType(this.game.barrierLayer, nextPos) == "steel"){
        //             this.node.destroy();
        //         }
        //         break;
        //     case 180:
        //         var nextPos = cc.p(bulletTilePos.x, bulletTilePos.y + 1);
        //         if(this.game.getTileType(this.game.barrierLayer, nextPos) == "wall"){
        //             this.destroyWall(nextPos);
        //             this.node.destroy();
        //         }
        //         if(this.game.getTileType(this.game.barrierLayer, nextPos) == "steel"){
        //             this.node.destroy();
        //         }
        //         break;
        //     case 270:
        //         var nextPos = cc.p(bulletTilePos.x - 1, bulletTilePos.y);
        //         if(this.game.getTileType(this.game.barrierLayer, nextPos) == "wall"){
        //             this.destroyWall(nextPos);
        //             this.node.destroy();
        //         }
        //         if(this.game.getTileType(this.game.barrierLayer, nextPos) == "steel"){
        //             this.node.destroy();
        //         }
        //         break;
        // }
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
        this.node.destroy();
        //cc.log("you kill a enemy!!!");
    }
});
