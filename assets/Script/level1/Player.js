cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight:0,
        jumpDuration:0,
        maxMoveSpeed:0,
        accel:0,
        
        jumpAudio:{
            default:null,
            url:cc.AudioClip
        },
    },

    // use this for initialization
    onLoad: function () {
        var jumpAction=this.setJumpAction();
        this.node.runAction(jumpAction);
        
        this.accLeft=false;
        this.accRight=false;
        this.xSpeed=0;
        this.setInputControl();

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.accLeft){
            this.xSpeed-=this.accel*dt;
        }else if(this.accRight){
            this.xSpeed+=this.accel*dt;
        }
        
        if(Math.abs(this.xSpeed)>this.maxMoveSpeed){
            this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed);
        }
        this.node.x+=this.xSpeed*dt;
        if(this.node.x>=480||this.node.x<=-480){
            this.node.x=-this.node.x;
        }
    },
    
    setJumpAction:function(){
        var jumpUp=cc.moveBy(this.jumpDuration,cc.p(0,this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown=cc.moveBy(this.jumpDuration,cc.p(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());
        var callback = cc.callFunc(this.playJumpSound, this);
        return cc.repeatForever(cc.sequence(jumpUp,jumpDown,callback));
    },
    
    playJumpSound:function(){
        cc.audioEngine.playEffect(this.jumpAudio,false);  
    },
    setInputControl:function(){
        var self=this;
        cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode,event){
                switch(keyCode){
                    case cc.KEY.a:
                        // var realUrl=cc.url.raw("Texture/alien.png");
                        // var texture = cc.textureCache.addImage(realUrl);
                        // self.getComponent(cc.Sprite).spriteFrame.setTexture(texture);
                        self.node.scaleX=1;
                        //self.game.token.scaleX=1;
                        self.accLeft=true;
                        self.accRight=false;
                        break;
                    case cc.KEY.d:
                        // var realUrl=cc.url.raw("Texture/alien2.png");
                        // var texture = cc.textureCache.addImage(realUrl);
                        // self.getComponent(cc.Sprite).spriteFrame.setTexture(texture);
                        self.node.scaleX=-1;
                        //self.game.token.scaleX=-1;
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                        self.accRight = false;
                        break;
                }
            }
        },self.node);
    },
});
