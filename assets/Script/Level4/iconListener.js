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
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.game.myCurrentBtn = self.btnNum;
            //cc.log("touch start");
        },this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var x = event.getDeltaX();    
            var y = event.getDeltaY();    
            this.x+=x;
            this.y+=y;
            //cc.log("touch moving");
        });
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if(self.game.myCurrentKey != null){
                if(self.myBindKey != null){
                    self.resetKey(self.myBindKey);
                }
                if(self.game.myCurrentKey.getComponent("keyProp").bindBtn != 0){
                    self.resetBind(self.game.myCurrentKey);
                }
                self.myBindKey = self.game.myCurrentKey;
                self.game.bindKey(self.btnNum,self.game.myCurrentKey);
            }
            self.game.myCurrentBtn = 0;
            self.node.setPosition(self.initPos);
            //cc.log("touch end");
        });
    },
    resetKey:function(key){
        key.getComponent(cc.Sprite).spriteFrame = key.getComponent("keyProp").keySprite;
        key.getComponent("keyProp").bindBtn = 0;
    },
    resetBind:function(key){
        switch(key.getComponent("keyProp").bindBtn){
            case 1:
                this.game.myUp = 0;
                this.game.btnIcons[0].getComponent("iconListener").myBindKey = null;
                break;
            case 2:
                this.game.myDown = 0;
                this.game.btnIcons[1].getComponent("iconListener").myBindKey = null;
                break;
            case 3:
                this.game.myLeft = 0;
                this.game.btnIcons[2].getComponent("iconListener").myBindKey = null;
                break;
            case 4:
                this.game.myRight = 0;
                this.game.btnIcons[3].getComponent("iconListener").myBindKey = null;
                break;
            case 5:
                this.game.myAttack = 0;
                this.game.btnIcons[4].getComponent("iconListener").myBindKey = null;
                break;
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
