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
        pickRadius:0,
        
    },

    // use this for initialization
    onLoad: function () {
        this.timer=0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.getPlayerDistance()<this.pickRadius){
            this.onPicked();
            return;
        }
        var opacityRatio = 1 - this.timer/this.game.spriteDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
        if(this.timer>=this.game.spriteDuration){
            this.game.loseScore();
            this.game.spawnNewSprite();
            this.node.destroy();
            return;
        }
        this.timer+=dt;
    },
    
    getPlayerDistance:function(){
        var playerPos=this.game.player.getPosition();
        var dist=cc.pDistance(this.node.position,playerPos);
        return dist;
    },
    
    onPicked:function(){
        var spArray=this.game.sprites.getChildren();
        spArray[this.game.randomNum].destroy();
        this.game.spawnNewToken();
        //this.game.runToFolder();
        this.game.res.splice(this.game.randomNum,1);
        this.game.length--;
        if(this.game.length>0){
            this.game.delaySpawn();
        }
        this.game.gainScore();
        this.node.destroy();
    }
});
