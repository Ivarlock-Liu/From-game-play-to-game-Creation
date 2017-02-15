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
        res:{
            default:[],
            type:[cc.SpriteFrame],
        },
        downDuration:0,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        var randomNum=Math.floor(cc.random0To1()*this.res.length);
        if(randomNum==this.res.length)
        randomNum=this.res.length;

        this.node.getComponent(cc.Sprite).spriteFrame=this.res[randomNum];
        var down = cc.moveBy(this.downDuration,cc.p(0,-640));
        var callback=cc.callFunc(function(){
            self.node.destroy();
        },this);
        this.node.runAction(cc.sequence(down,callback));
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
