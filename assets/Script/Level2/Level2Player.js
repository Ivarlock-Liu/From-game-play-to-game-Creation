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
        speed:0,
        man:{
            default:null,
            type:cc.SpriteFrame
        }
    },

    // use this for initialization
    onLoad: function () {
        this.anim = this.getComponent(cc.Animation);
        this.animState = this.anim.getAnimationState('running');
        this.animState.speed = 4;
        this.animState.repeatCount = Infinity;
        
        
        this.dir=0;//1 is left, 2 is right
		this.isTaking = false;
        this.setInputControl();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        switch(this.dir){
            case 1:
				if(this.node.x >= -400)
					this.node.x -= this.speed*dt;
                break;
            case 2:
				if(this.node.x <= 100)
					this.node.x += this.speed*dt;
				break;
        }
    },
    
    setInputControl:function(){
        var self = this;
        var onKeyPressed = function(keyCode, event) {
            switch(keyCode) {
                case cc.KEY.a:
                    self.dir=1;
                    self.node.scaleX = -1;
                    self.anim.play('running');
                    break;
                case cc.KEY.d:
                    self.dir=2;
                    self.node.scaleX = 1;
                    self.anim.play('running');
                    break;
            }
        }
       var onKeyReleased = function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.d:
                        self.anim.stop('running');
                        self.node.getComponent(cc.Sprite).spriteFrame = self.man;
                        self.dir=0;
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
