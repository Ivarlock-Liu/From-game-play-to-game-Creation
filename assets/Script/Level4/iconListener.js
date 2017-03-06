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
        btnNum:0,
        initPos:cc.p(0,0),
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        this.myBindKey = null;
        this.myBindKeyIcon = null;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.game.myCurrentBtn = self.btnNum;
            //cc.log("touch start");
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var x = event.getDeltaX()      
            var y = event.getDeltaY()     
            this.x+=x
            this.y+=y
            //cc.log("touch moving");
        });
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if(self.game.myCurrentKey != null){
                if(self.myBindKey != null){
                    self.resetKey(self.myBindKey);
                }
                self.myBindKey = self.game.myCurrentKey;
                self.myBindKeyIcon = self.game.myCurrentKey.getComponent(cc.Sprite).spriteFrame;
                self.game.bindKey(self.btnNum,self.game.myCurrentKey);
            }
            self.game.myCurrentBtn = 0;
            self.node.setPosition(self.initPos);
            //cc.log("touch end");
        });
    },
    resetKey:function(key){
        key.getComponent(cc.Sprite).spriteFrame = this.myBindKeyIcon;
        key.getComponent("keyProp").isBinded = false;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
