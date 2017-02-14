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
        player:{
            default:null,
            type:cc.Node
        },
        bullet:{
            default:null,
            type:cc.Prefab
        },
        enemy1:{
             default:null,
            type:cc.Node
        },
        enemy2:{
             default:null,
            type:cc.Node
        },
        map:{
            default:null,
            type:cc.TiledMap,
        },
        barrierLayer:{
            default:null,
            type:cc.TiledLayer,
        },
        metaLayer:{
            default:null,
            type:cc.TiledLayer,
        },
        objs:{
            default:null,
            type:cc.TiledObjectGroup
        },
    },

    // use this for initialization
    onLoad: function () {
        this.setInputControl();
        this.isShooting=false;
        this.timer=0;
        this.loadMap();
    },
    loadMap:function(){
        var objects = this.objs.getObjects();
        var playerObj = objects[0];
        var enemy1Obj = objects[1];
        var enemy2Obj = objects[2];
       
        var playerPos = playerObj.getProperties();
        var enemy1Pos = enemy1Obj.getProperties();
        var enemy2Pos = enemy2Obj.getProperties();
        this.playerTile = this.getTilePos(playerPos);
        this.enemy1Tile = this.getTilePos(enemy1Pos);
        this.enemy2Tile = this.getTilePos(enemy2Pos);
        
        var pos = this.getCanvasPos(this.playerTile);
        var pos1 = this.getCanvasPos(this.enemy1Tile);
        var pos2 = this.getCanvasPos(this.enemy2Tile);
        this.player.setPosition(pos);
        this.enemy1.setPosition(pos1);
        this.enemy2.setPosition(pos2);
        //cc.log(pos.x + "------   " + pos.y);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.timer+=dt;
        if(this.isShooting&&this.timer>=this.player.getComponent("TankMovementController").shootSpeed){
            this.spawnNewBullet();
            this.timer=0;
        }
        var playerTilePos = this.getTilePosByCanvasPos(this.player.getPosition());
        switch(this.player.rotation){
            case 0:
                var nextPos = cc.p(playerTilePos.x, playerTilePos.y - 1);
                this.player.getComponent("TankMovementController").canUp = !this.getTileCollidable(this.metaLayer, nextPos);
                break;
            case 90:
                var nextPos = cc.p(playerTilePos.x + 1, playerTilePos.y);
                this.player.getComponent("TankMovementController").canRight = !this.getTileCollidable(this.metaLayer, nextPos);
                break;
            case 180:
                var nextPos = cc.p(playerTilePos.x, playerTilePos.y + 1);
                this.player.getComponent("TankMovementController").canDown = !this.getTileCollidable(this.metaLayer, nextPos);
                break;
            case 270:
                var nextPos = cc.p(playerTilePos.x - 1, playerTilePos.y);
                this.player.getComponent("TankMovementController").canLeft = !this.getTileCollidable(this.metaLayer, nextPos);
                break;
        }
    },
    getTilePos: function(posInPixel) {
        var mapSize = this.node.getContentSize();
        var tileSize = this.map.getTileSize();
        var x = Math.floor(posInPixel.x / tileSize.width);
        var y = Math.floor(posInPixel.y / tileSize.height);
        return cc.p(x, y);
    },
    getTilePosByCanvasPos: function(posInCanvas){
        var posInPixel = cc.p(posInCanvas.x + 400, 320 - posInCanvas.y);
        return this.getTilePos(posInPixel);
    },
    getCanvasPos: function(posInTile){
        return cc.p((-380 + posInTile.x * 40), (300 - posInTile.y * 40));
    },
    getNextPos:function(playerTilePos){
        var nextPos = playerTilePos;
        switch(this.player.rotation){
            case 0:
                nextPos = cc.p(playerTilePos.x, playerTilePos.y - 1);
                break;
            case 90:
                nextPos = cc.p(playerTilePos.x + 1, playerTilePos.y);
                break;
            case 180:
                nextPos = cc.p(playerTilePos.x, playerTilePos.y + 1);
                break;
            case 270:
                nextPos = cc.p(playerTilePos.x - 1, playerTilePos.y);
                break;
        }
        return nextPos;
    },
    getTileCollidable:function(layer,tile){
        var prop = this.map.getPropertiesForGID(layer.getTileGIDAt(tile));
        if(prop)
            return prop.collidable;
        else
            return false;
    },
    spawnNewBullet:function(){
        var newBullet=cc.instantiate(this.bullet);
        this.node.addChild(newBullet);
        newBullet.setPosition(this.player.position);
        newBullet.getComponent('Bullet').game=this;
        switch(this.player.rotation){
            case 0:
                newBullet.runAction(newBullet.getComponent('Bullet').moveUp);
                break;
            case 90:
                newBullet.runAction(newBullet.getComponent('Bullet').moveRight);
                break;
            case 180:
                newBullet.runAction(newBullet.getComponent('Bullet').moveDown);
                break;
            case 270:
                newBullet.runAction(newBullet.getComponent('Bullet').moveLeft);
                break;
        }
    },
    setInputControl:function(){
        var self = this;
        var onKeyPressed = function(keyCode, event) {
            switch(keyCode) {
                case cc.KEY.space:
                    self.isShooting=true;
                    break;
            }
        }
       var onKeyReleased = function(keyCode, event) {
            switch(keyCode) {
                case cc.KEY.space:
                    self.isShooting=false;
                    break;
            }
        }
        // add keyboard event listener
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed,
            onKeyReleased,
        }, self.node);
    },
});
