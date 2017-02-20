const STATE=cc.Enum({
	DEFAULT:0,
    MOVE:1,
    ROTATE:2,
    SCALE:3,
    SKEW:4,
    JUMP:5,
    BLINK:6,
});
const MODE=cc.Enum({
	TEST:0,
	PLAY:1
});
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
		monster:{
			default:null,
			type:cc.Node
		},
		scoreDisplay:{
			default:null,
			type:cc.Label
		},
		infoDisplay:{
			default:null,
			type:cc.Label
		},
		scoreAudio:{
            default:null,
            url:cc.AudioClip
        },
		wrongAudio:{
            default:null,
            url:cc.AudioClip
        },
		danceDuration:0,
    },

    // use this for initialization
    onLoad: function () {
		this.modeTest();
		this.setInputControl();
		//cc.audioEngine.playEffect(this.wrongAudio,true);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
		//cc.log(this.monsterState);
		if(this.myMode == MODE.PLAY){
			if(this.myState != STATE.DEFAULT){
				if(this.myState == this.monsterState){
					this.onPick();
				}else{
					this.loseScore();
				}
			}
			if(this.score >= 3){
				this.monster.stopAllActions();
				this.enabled = false;
				this.infoDisplay.string = "Congradulations!"
			}
		}
    },
	
	onMove:function(){
		if(this.myMode == MODE.PLAY)
			this.myState = STATE.MOVE;
		else{
			this.infoDisplay.string = "var move1 = cc.moveBy(duration,cc.p(320,0));" +
									"\nvar move2 = cc.moveBy(duration,cc.p(-640,0));"+
									"\nvar move3 = cc.moveBy(duration,cc.p(320,0));"+
									"\nthis.monster.runAction(cc.repeatForever(cc.sequence(move1,move2,move3)));"
			this.initMonster();
			var move1 = cc.moveBy(this.danceDuration/4,cc.p(320,0));
			var move2 = cc.moveBy(this.danceDuration/2,cc.p(-640,0));
			var move3 = cc.moveBy(this.danceDuration/4,cc.p(320,0));
			this.monster.runAction(cc.repeatForever(cc.sequence(move1,move2,move3)));
		}
	},
	onRotate:function(){
		if(this.myMode == MODE.PLAY)
			this.myState = STATE.ROTATE;
		else{
			this.initMonster();
			this.infoDisplay.string = "var rotate1 = cc.rotateBy(duration,360);"+
									"\nvar rotate2 = cc.rotateBy(duration,-720);"+
									"\nvar rotate3 = cc.rotateBy(duration,360);"+
									"\nthis.monster.runAction(cc.repeatForever(cc.sequence(rotate1,rotate2,rotate3)));"
			var rotate1 = cc.rotateBy(this.danceDuration/4,360);
			var rotate2 = cc.rotateBy(this.danceDuration/2,-720);
			var rotate3 = cc.rotateBy(this.danceDuration/4,360);
			this.monster.runAction(cc.repeatForever(cc.sequence(rotate1,rotate2,rotate3)));
		}
	},
	onScale:function(){
		if(this.myMode == MODE.PLAY)
			this.myState = STATE.SCALE;
		else{
			this.initMonster();
			this.infoDisplay.string ="var scale1 = cc.scaleBy(duration, 2, 2);"+
									"\nvar scale2 = cc.scaleBy(duration, 0.25, 0.25);"+
									"\nvar scale3 = cc.scaleBy(duration, 2, 2);"+
									"\nthis.monster.runAction(cc.repeatForever(cc.sequence(scale1,scale2,scale3)));";
			var scale1 = cc.scaleBy(this.danceDuration/4, 2, 2);
			var scale2 = cc.scaleBy(this.danceDuration/2, 0.25, 0.25);
			var scale3 = cc.scaleBy(this.danceDuration/4, 2, 2);
			this.monster.runAction(cc.repeatForever(cc.sequence(scale1,scale2,scale3)));
		}
	},
	onSkew:function(){
		if(this.myMode == MODE.PLAY)
			this.myState = STATE.SKEW;
		else{
			this.initMonster();
			this.infoDisplay.string ="var skew1 = cc.skewBy(duration, 90, 90);"+
									"\nvar skew2 = cc.skewBy(duration, -180, -180);"+
									"\nvar skew3 = cc.skewBy(duration, 90, 90);"+
									"\nthis.monster.runAction(cc.repeatForever(cc.sequence(skew1,skew2,skew3)));";
			var skew1 = cc.skewBy(this.danceDuration/4, 90, 90);
			var skew2 = cc.skewBy(this.danceDuration/2, -180, -180);
			var skew3 = cc.skewBy(this.danceDuration/4, 90, 90);
			this.monster.runAction(cc.repeatForever(cc.sequence(skew1,skew2,skew3)));
		}
	},
	onJump:function(){
		if(this.myMode == MODE.PLAY)
			this.myState = STATE.JUMP;
		else{
			this.initMonster();
			this.infoDisplay.string = "var jump1 = cc.jumpBy(duration, cc.p(300, 0), 100, 4);"+
									"\nvar jump2 = cc.jumpBy(duration, cc.p(-600, 0), 100, 8);"+
									"\nvar jump3 = cc.jumpBy(duration, cc.p(300, 0), 100, 4);"+
									"\nthis.monster.runAction(cc.repeatForever(cc.sequence(jump1,jump2,jump3)));";
			var jump1 = cc.jumpBy(this.danceDuration/4, cc.p(300, 0), 100, 2);
			var jump2 = cc.jumpBy(this.danceDuration/2, cc.p(-600, 0), 100, 4);
			var jump3 = cc.jumpBy(this.danceDuration/4, cc.p(300, 0), 100, 2);
			this.monster.runAction(cc.repeatForever(cc.sequence(jump1,jump2,jump3)));
		}
	},
	onBlink:function(){
		if(this.myMode == MODE.PLAY)
			this.myState = STATE.BLINK;
		else{
			this.initMonster();
			this.infoDisplay.string ="var blink1 = cc.fadeTo(duration, 0);"+
									"\nvar blink2= cc.fadeTo(duration, 255);"+
									"\nthis.monster.runAction(cc.repeatForever(cc.sequence(blink1,blink2)));";
			var blink1 = cc.fadeTo(this.danceDuration/6, 0);
			var blink2= cc.fadeTo(this.danceDuration/6, 255);
			this.monster.runAction(cc.repeatForever(cc.sequence(blink1,blink2)));
		}
	},	
	dance:function(){
		//var self = this;
		var move1 = cc.moveBy(this.danceDuration/4,cc.p(320,0));
		var move2 = cc.moveBy(this.danceDuration/2,cc.p(-640,0));
		var move3 = cc.moveBy(this.danceDuration/4,cc.p(320,0));
		
		var rotate1 = cc.rotateBy(this.danceDuration/4,360);
		var rotate2 = cc.rotateBy(this.danceDuration/2,-720);
		var rotate3 = cc.rotateBy(this.danceDuration/4,360);
		
		var scale1 = cc.scaleBy(this.danceDuration/4, 2, 2);
		var scale2 = cc.scaleBy(this.danceDuration/2, 0.25, 0.25);
		var scale3 = cc.scaleBy(this.danceDuration/4, 2, 2);
			
		var skew1 = cc.skewBy(this.danceDuration/4, 90, 90);
		var skew2 = cc.skewBy(this.danceDuration/2, -180, -180);
		var skew3 = cc.skewBy(this.danceDuration/4, 90, 90);
		
		var jump1 = cc.jumpBy(this.danceDuration/4, cc.p(300, 0), 100, 2);
		var jump2 = cc.jumpBy(this.danceDuration/2, cc.p(-600, 0), 100, 4);
		var jump3 = cc.jumpBy(this.danceDuration/4, cc.p(300, 0), 100, 2);
		
		var blink1 = cc.fadeTo(this.danceDuration/6, 0);
		var blink2 = cc.fadeTo(this.danceDuration/6, 255);

		var callback = cc.callFunc(function () {
			var randomNum = Math.floor(cc.random0To1() * 6) + 1; 
			this.monsterState = randomNum;
			this.monster.runAction(this.dance());
			}, this);
		switch(this.monsterState){
			case 1: 
				return cc.sequence(move1,move2,move3,callback);
			case 2:
				return cc.sequence(rotate1,rotate2,rotate3,callback);
			case 3:
				return cc.sequence(scale1,scale2,scale3,callback);
			case 4:
				return cc.sequence(skew1,skew2,skew3,callback);
			case 5:
				return cc.sequence(jump1,jump2,jump3,callback);
			case 6:
				return cc.sequence(blink1,blink2,blink1,blink2,blink1,blink2,callback);
		}
	},
	initMonster:function(){
		this.monster.stopAllActions();
		this.monster.setPosition(cc.p(25,-125));
		this.monster.rotation = 0;
		this.monster.scaleX = 1;
		this.monster.scaleY = 1;
		this.monster.skewX = 0;
		this.monster.skewY = 0;
		this.monster.opacity = 255;
		//this.monster.getComponent(cc.Sprite).enabled = true;
		
	},
	onPick:function(){
		this.score++;
		this.myState = STATE.DEFAULT;
		this.scoreDisplay.string = "Score: "+this.score.toString();
		cc.audioEngine.playEffect(this.scoreAudio,false); 
	},
	loseScore:function(){
		this.score--;
		this.myState = STATE.DEFAULT;
		this.scoreDisplay.string = "Score: "+this.score.toString();
		cc.audioEngine.playEffect(this.wrongAudio,false);
	},
	modeTest:function(){
		this.initMonster();
		this.myMode = MODE.TEST;
		this.myState = STATE.DEFAULT;
		this.monsterState = STATE.DEFAULT;
		this.score = 0;
		this.scoreDisplay.string = "Score: "+this.score.toString();
		this.infoDisplay.string = "In test mode, you can try 6 basic actions in cocos creator. Click the action buttons to see what will happen!"
	},
	modePlay:function(){
		this.initMonster();
		this.myMode = MODE.PLAY;
		this.myState = STATE.DEFAULT;
		var randomNum = Math.floor(cc.random0To1() * 6) + 1; 
		this.monsterState = randomNum;
		this.monster.runAction(this.dance());
		this.score = 0;
		this.scoreDisplay.string = "Score: "+this.score.toString();
		this.infoDisplay.string = "In play mode, the monster will run one of the six actions randomly. You need to identify which kind of action that the monster is running "+
								"and click the corresponding action buttons or keys! Try to get more than 30 scores!"+
								"Key 'Q' for move, 'W' for rotate, 'E' for scale, 'R' for skew, 'T' for jump and 'Y' for blink";
	},
	 setInputControl:function(){
        var self=this;
        cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode,event){
                switch(keyCode){
                    case cc.KEY.q:
                        //self.onMove();
                        break;
                    case cc.KEY.w:
                        //self.onRotate();
                        break;
					case cc.KEY.e:
                       // self.onScale();
                        break;
					case cc.KEY.r:
                       // self.onSkew();
                        break;
					case cc.KEY.t:
                       // self.onJump();
                        break;
					case cc.KEY.y:
                       // self.onBlink();
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.q:
                        self.onMove();
                        break;
                    case cc.KEY.w:
                        self.onRotate();
                        break;
					case cc.KEY.e:
                        self.onScale();
                        break;
					case cc.KEY.r:
                        self.onSkew();
                        break;
					case cc.KEY.t:
                        self.onJump();
                        break;
					case cc.KEY.y:
                        self.onBlink();
                        break;
                }
            }
        },self.node);
    },
});
