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
        sprites:{
            default:[],
            type:[cc.SpriteFrame]
        },
        actionDuration:3,
    },

    // use this for initialization
    onLoad: function () {
        this.btnNum = Math.floor(cc.random0To1() * 5);
        this.node.getComponent(cc.Sprite).spriteFrame = this.sprites[this.btnNum];
        var randomKey =  Math.floor(cc.random0To1() * 26);
        while(this.game.keys[randomKey].getComponent("keyProp").bindBtn!=0){
            randomKey =  Math.floor(cc.random0To1() * 26);
        }
        var move = cc.moveTo(this.actionDuration,this.game.keys[randomKey].position);
        var callback = cc.callFunc(function () {
                this.game.resetKey(this.btnNum + 1);
				//vistualize
				this.game.bindKey(this.btnNum+1,this.game.keys[randomKey]);
				this.node.destroy();
			}, this);
        this.node.runAction(cc.sequence(move,callback));
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
