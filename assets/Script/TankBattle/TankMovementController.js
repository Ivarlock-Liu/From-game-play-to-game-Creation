cc.Class({
    extends: cc.Component,

    properties: {
        shootSpeed:0,//how long(s) for 1 shot
        moveSpeed:0
    },

    // use this for initialization
    onLoad: function () {
        this.setInputControl();
        this.canUp=true;
        this.canDown=true;
        this.canLeft=true;
        this.canRight=true;
        this.dir=0;//1 is up, 2 is down, 3 is left, 4 is right
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        switch (this.dir) {
        case 1:
                if(this.canUp)
                    this.node.y+=this.moveSpeed*dt;
                break;
            case 2:
                if(this.canDown)
                    this.node.y-=this.moveSpeed*dt;
                break;
            case 3:
                if(this.canLeft)
                    this.node.x-=this.moveSpeed*dt;
                break;
            case 4:
                if(this.canRight)
                    this.node.x+=this.moveSpeed*dt;
                break;
        }
    },
    setInputControl:function(){
        var self = this;
        var onKeyPressed = function(keyCode, event) {
            switch(keyCode) {
                case cc.KEY.a:
                    self.node.rotation=270;
                    self.dir=3;
                    break;
                case cc.KEY.d:
                    self.node.rotation=90;
                    self.dir=4;
                    break;
                case cc.KEY.w:
                    self.node.rotation=0;
                    self.dir=1;
                    break;
                case cc.KEY.s:
                    self.node.rotation=180;
                    self.dir=2;
                    break;
            }
        }
       var onKeyReleased = function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.d:
                    case cc.KEY.w:
                    case cc.KEY.s:
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
