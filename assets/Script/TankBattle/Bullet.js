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
    },

    // use this for initialization
    onLoad: function () {
        this.moveLeft=this.moveAction(cc.p(-960,0));
        this.moveRight=this.moveAction(cc.p(960,0));
        this.moveUp=this.moveAction(cc.p(0,960));
        this.moveDown=this.moveAction(cc.p(0,-960));
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    moveAction:function(destinationPos){
        var move=cc.moveBy(this.flyDuration,destinationPos);
        var callback=cc.callFunc(this.deleteBullet,this);
        return cc.sequence(move,callback);
    },
    
    deleteBullet:function(){
        this.node.destroy();
    },
});
