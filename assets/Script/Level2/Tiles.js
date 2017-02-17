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
        downDuration:0,
		index:-1,
		pickRadius:0,
    },

    // use this for initialization
    onLoad: function () {
		
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
		if(this.getPlayerDistance()<this.pickRadius){
            this.onPicked();
            return;
        }
    },
	getPlayerDistance:function(){
        var playerPos=this.game.player.getPosition();
        var dist=cc.pDistance(this.node.position,playerPos);
        return dist;
    },
    
    onPicked:function(){
		//this.node.stopAllActions();
		this.game.token.getComponent(cc.Sprite).spriteFrame = this.node.getComponent(cc.Sprite).spriteFrame;
		this.node.destroy();
		this.game.player.getComponent("Level2Player").isTaking = true;
    }
});
