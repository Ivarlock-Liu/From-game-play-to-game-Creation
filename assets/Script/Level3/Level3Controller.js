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

var introduction = require('IntroductionController');
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
		Icons:{
			default:[],
			type:[cc.Node]
		},
		labels:{
			default:[],
			type:[cc.Node]
		},
		nextBtn:{
			default:null,
			type:cc.Node
		},
		danceDuration:0,
    },

    // use this for initialization
    onLoad: function () {
        this.nextBtn.active = false;
		this.modeTest();
		this.setInputControl();
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
			if(this.score >= 30){
				this.monster.stopAllActions();
				this.infoDisplay.string = "Congradulations! Now you can enter next level, click the 'next' button on the top right corner";
				this.nextBtn.active = true;
				this.enabled = false;
			}
		}
    },
	resetColor:function(){
		for(var i =0; i<this.Icons.length; i++){
			this.Icons[i].color = new cc.Color(255,255,255);
		}
		for(var i =0; i<this.labels.length; i++){
			this.labels[i].color = new cc.Color(226,235,19);
		}
	},
	onMove:function(){
		if(this.myMode == MODE.PLAY)
			this.myState = STATE.MOVE;
		else{
			this.initMonster();
			this.resetColor();
			this.Icons[0].color = new cc.Color(70,230,60);
			this.infoDisplay.string = "this.monster.runAction(cc.moveBy(duration,destination));" +
									"\n'this.monster' refer to the monster object in this screen, 'runAction' executes an action, and returns the action that is executed. "+
									"cc.moveBy is the action in Cocos Creator that you can make a node to move around. Duration and destination are two parameters which can define how long this action can last and where this node will move to.";
			this.labels[0].getComponent(cc.Label).string = "this.monster.runAction(cc.moveBy(1,cc.p(320,0)))";
			this.labels[1].getComponent(cc.Label).string = "this.monster.runAction(cc.moveBy(2,cc.p(-640,0)))";
			this.labels[2].getComponent(cc.Label).string = "this.monster.runAction(cc.moveBy(1,cc.p(320,0)))";
			var callback1 = cc.callFunc(function () {
				this.labels[2].color = new cc.Color(226,235,19);
				this.labels[0].color = new cc.Color(70,230,60);
			}, this);
			var callback2 = cc.callFunc(function () {
				this.labels[0].color = new cc.Color(226,235,19);
				this.labels[1].color = new cc.Color(70,230,60);
			}, this);
			var callback3 = cc.callFunc(function () {
				this.labels[0].color = new cc.Color(226,235,19);
				this.labels[1].color = new cc.Color(226,235,19);
				this.labels[2].color = new cc.Color(70,230,60);
			}, this);

			var move1 = cc.moveBy(this.danceDuration/4,cc.p(320,0));
			var move2 = cc.moveBy(this.danceDuration/2,cc.p(-640,0));
			var move3 = cc.moveBy(this.danceDuration/4,cc.p(320,0));
			this.monster.runAction(cc.repeatForever(cc.sequence(callback1,move1,callback2,move2,callback3,move3)));
		}
	},
	onRotate:function(){
		if(this.myMode == MODE.PLAY)
			this.myState = STATE.ROTATE;
		else{
			this.initMonster();
			this.resetColor();
			this.Icons[1].color = new cc.Color(70,230,60);
			this.infoDisplay.string = "this.monster.runAction(cc.rotateBy(duration,degree));"+
									"\n'this.monster' refer to the monster object in this screen, 'runAction' executes an action, and returns the action that is executed. "+
									"cc.rotateBy is the action in Cocos Creator that you can make a node to rotate. Duration and degree are two parameters which can define how long this action can last and what degree the node will rotate.";
			this.labels[0].getComponent(cc.Label).string = "this.monster.runAction(cc.rotateBy(1,360))";
			this.labels[1].getComponent(cc.Label).string = "this.monster.runAction(cc.rotateBy(2,-720))";
			this.labels[2].getComponent(cc.Label).string = "this.monster.runAction(cc.rotateBy(1,360))";
			var callback1 = cc.callFunc(function () {
				this.labels[2].color = new cc.Color(226,235,19);
				this.labels[0].color = new cc.Color(70,230,60);
			}, this);
			var callback2 = cc.callFunc(function () {
				this.labels[0].color = new cc.Color(226,235,19);
				this.labels[1].color = new cc.Color(70,230,60);
			}, this);
			var callback3 = cc.callFunc(function () {
				this.labels[0].color = new cc.Color(226,235,19);
				this.labels[1].color = new cc.Color(226,235,19);
				this.labels[2].color = new cc.Color(70,230,60);
			}, this);
			var rotate1 = cc.rotateBy(this.danceDuration/4,360);
			var rotate2 = cc.rotateBy(this.danceDuration/2,-720);
			var rotate3 = cc.rotateBy(this.danceDuration/4,360);
			this.monster.runAction(cc.repeatForever(cc.sequence(callback1,rotate1,callback2,rotate2,callback3,rotate3)));
		}
	},
	onScale:function(){
		if(this.myMode == MODE.PLAY)
			this.myState = STATE.SCALE;
		else{
			this.initMonster();
			this.resetColor();
			this.Icons[2].color = new cc.Color(70,230,60);
			this.infoDisplay.string ="this.monster.runAction(cc.scaleBy(duration, x, y));"+
									"\n'this.monster' refer to the monster object in this screen, 'runAction' executes an action, and returns the action that is executed. "+
									"cc.scaleBy is the action in Cocos Creator that you can make a node to scale. Duration, x and y are three parameters which can define how long this action can last and the scale multiple of x and y in coordinate system.";
			this.labels[0].getComponent(cc.Label).string = "this.monster.runAction(cc.scaleBy(1, 2, 2))";
			this.labels[1].getComponent(cc.Label).string = "this.monster.runAction(cc.scaleBy(2, 0.25, 0.25))";
			this.labels[2].getComponent(cc.Label).string = "this.monster.runAction(cc.scaleBy(1, 2, 2))";
			var callback1 = cc.callFunc(function () {
				this.labels[2].color = new cc.Color(226,235,19);
				this.labels[0].color = new cc.Color(70,230,60);
			}, this);
			var callback2 = cc.callFunc(function () {
				this.labels[0].color = new cc.Color(226,235,19);
				this.labels[1].color = new cc.Color(70,230,60);
			}, this);
			var callback3 = cc.callFunc(function () {
				this.labels[0].color = new cc.Color(226,235,19);
				this.labels[1].color = new cc.Color(226,235,19);
				this.labels[2].color = new cc.Color(70,230,60);
			}, this);
			var scale1 = cc.scaleBy(this.danceDuration/4, 2, 2);
			var scale2 = cc.scaleBy(this.danceDuration/2, 0.25, 0.25);
			var scale3 = cc.scaleBy(this.danceDuration/4, 2, 2);
			this.monster.runAction(cc.repeatForever(cc.sequence(callback1,scale1,callback2,scale2,callback3,scale3)));
		}
	},
	onSkew:function(){
		if(this.myMode == MODE.PLAY)
			this.myState = STATE.SKEW;
		else{
			this.initMonster();
			this.resetColor();
			this.Icons[3].color = new cc.Color(70,230,60);
			this.infoDisplay.string ="this.monster.runAction(cc.skewBy(duration, x, y));"+
									"\n'this.monster' refer to the monster object in this screen, 'runAction' executes an action, and returns the action that is executed. "+
									"cc.scaleBy is the action in Cocos Creator that you can make a node to scale. Duration, x and y are three parameters which can define how long this action can last and the skew degree of x and y in coordinate system.";
			this.labels[0].getComponent(cc.Label).string = "this.monster.runAction(cc.skewBy(1, 45, 45))";
			this.labels[1].getComponent(cc.Label).string = "this.monster.runAction(cc.skewBy(2, -90, -90))";
			this.labels[2].getComponent(cc.Label).string = "this.monster.runAction(cc.skewBy(1, 45, 45))";
			var callback1 = cc.callFunc(function () {
				this.labels[2].color = new cc.Color(226,235,19);
				this.labels[0].color = new cc.Color(70,230,60);
			}, this);
			var callback2 = cc.callFunc(function () {
				this.labels[0].color = new cc.Color(226,235,19);
				this.labels[1].color = new cc.Color(70,230,60);
			}, this);
			var callback3 = cc.callFunc(function () {
				this.labels[0].color = new cc.Color(226,235,19);
				this.labels[1].color = new cc.Color(226,235,19);
				this.labels[2].color = new cc.Color(70,230,60);
			}, this);
			var skew1 = cc.skewBy(this.danceDuration/4, 45, 45);
			var skew2 = cc.skewBy(this.danceDuration/2, -90, -90);
			var skew3 = cc.skewBy(this.danceDuration/4, 45, 45);
			this.monster.runAction(cc.repeatForever(cc.sequence(callback1,skew1,callback2,skew2,callback3,skew3)));
		}
	},
	onJump:function(){
		if(this.myMode == MODE.PLAY)
			this.myState = STATE.JUMP;
		else{
			this.initMonster();
			this.resetColor();
			this.Icons[4].color = new cc.Color(70,230,60);
			this.infoDisplay.string = "this.monster.runAction(cc.jumpBy(duration, destination,jumpHeight,jumpTimes));"+
									"\n'this.monster' refer to the monster object in this screen, 'runAction' executes an action, and returns the action that is executed. "+
									"cc.jumpBy is the action in Cocos Creator that you can make a node jump. Duration, destination, jumpHeight and jumpTimes are four parameters which can define how long this action can last, the destination of the node in coordinate system, the height and frequency of jump.";
			this.labels[0].getComponent(cc.Label).string = "this.monster.runAction(cc.jumpBy(1, cc.p(300, 0), 100, 2))";
			this.labels[1].getComponent(cc.Label).string = "this.monster.runAction(cc.jumpBy(2, cc.p(-600, 0), 100, 4))";
			this.labels[2].getComponent(cc.Label).string = "this.monster.runAction(cc.jumpBy(1, cc.p(300, 0), 100, 2))";
			var callback1 = cc.callFunc(function () {
				this.labels[2].color = new cc.Color(226,235,19);
				this.labels[0].color = new cc.Color(70,230,60);
			}, this);
			var callback2 = cc.callFunc(function () {
				this.labels[0].color = new cc.Color(226,235,19);
				this.labels[1].color = new cc.Color(70,230,60);
			}, this);
			var callback3 = cc.callFunc(function () {
				this.labels[0].color = new cc.Color(226,235,19);
				this.labels[1].color = new cc.Color(226,235,19);
				this.labels[2].color = new cc.Color(70,230,60);
			}, this);
			var jump1 = cc.jumpBy(this.danceDuration/4, cc.p(300, 0), 100, 2);
			var jump2 = cc.jumpBy(this.danceDuration/2, cc.p(-600, 0), 100, 4);
			var jump3 = cc.jumpBy(this.danceDuration/4, cc.p(300, 0), 100, 2);
			this.monster.runAction(cc.repeatForever(cc.sequence(callback1,jump1,callback2,jump2,callback3,jump3)));
		}
	},
	onBlink:function(){
		if(this.myMode == MODE.PLAY)
			this.myState = STATE.BLINK;
		else{
			this.initMonster();
			this.resetColor();
			this.Icons[5].color = new cc.Color(70,230,60);
			this.infoDisplay.string ="this.monster.runAction(cc.fadeTo(duration, opacity));"+
									"\n'this.monster' refer to the monster object in this screen, 'runAction' executes an action, and returns the action that is executed. "+
									"cc.fadeTo is the action in Cocos Creator that you can modifies the opacity. Duration and opacity are two parameters which can define how long this action can last and the opacity that the node will be.";
			this.labels[0].getComponent(cc.Label).string = "this.monster.runAction(cc.fadeTo(0.6, 0))";
			this.labels[1].getComponent(cc.Label).string = "this.monster.runAction(cc.fadeTo(0.6, 255))";
			this.labels[2].getComponent(cc.Label).string= "";
			var callback1 = cc.callFunc(function () {
				this.labels[1].color = new cc.Color(226,235,19);
				this.labels[0].color = new cc.Color(70,230,60);
			}, this);
			var callback2 = cc.callFunc(function () {
				this.labels[0].color = new cc.Color(226,235,19);
				this.labels[1].color = new cc.Color(70,230,60);
			}, this);
			var blink1 = cc.fadeTo(this.danceDuration/6, 0);
			var blink2= cc.fadeTo(this.danceDuration/6, 255);
			this.monster.runAction(cc.repeatForever(cc.sequence(callback1,blink1,callback2,blink2)));
		}
	},	
	dance:function(){
		var move1 = cc.moveBy(this.danceDuration/4,cc.p(320,0));
		var move2 = cc.moveBy(this.danceDuration/2,cc.p(-640,0));
		var move3 = cc.moveBy(this.danceDuration/4,cc.p(320,0));
		
		var rotate1 = cc.rotateBy(this.danceDuration/4,360);
		var rotate2 = cc.rotateBy(this.danceDuration/2,-720);
		var rotate3 = cc.rotateBy(this.danceDuration/4,360);
		
		var scale1 = cc.scaleBy(this.danceDuration/4, 2, 2);
		var scale2 = cc.scaleBy(this.danceDuration/2, 0.25, 0.25);
		var scale3 = cc.scaleBy(this.danceDuration/4, 2, 2);
			
		var skew1 = cc.skewBy(this.danceDuration/4, 45, 45);
		var skew2 = cc.skewBy(this.danceDuration/2, -90, -90);
		var skew3 = cc.skewBy(this.danceDuration/4, 45, 45);
		
		var jump1 = cc.jumpBy(this.danceDuration/4, cc.p(300, 0), 100, 2);
		var jump2 = cc.jumpBy(this.danceDuration/2, cc.p(-600, 0), 100, 4);
		var jump3 = cc.jumpBy(this.danceDuration/4, cc.p(300, 0), 100, 2);
		
		var blink1 = cc.fadeTo(this.danceDuration/6, 0);
		var blink2 = cc.fadeTo(this.danceDuration/6, 255);
		
		var callback1 = cc.callFunc(function () {
			this.resetColor();
			this.Icons[this.monsterState - 1].color = new cc.Color(70,230,60);
		}, this);
		
		var callback2 = cc.callFunc(function () {
			var randomNum = Math.floor(cc.random0To1() * 6) + 1; 
			this.monsterState = randomNum;
			this.monster.runAction(this.dance());
		}, this);
		switch(this.monsterState){
			case 1: 
				return cc.sequence(callback1,move1,move2,move3,callback2);
			case 2:
				return cc.sequence(callback1,rotate1,rotate2,rotate3,callback2);
			case 3:
				return cc.sequence(callback1,scale1,scale2,scale3,callback2);
			case 4:
				return cc.sequence(callback1,skew1,skew2,skew3,callback2);
			case 5:
				return cc.sequence(callback1,jump1,jump2,jump3,callback2);
			case 6:
				return cc.sequence(callback1,blink1,blink2,blink1,blink2,blink1,blink2,callback2);
		}
	},
	initMonster:function(){
		this.monster.stopAllActions();
		this.monster.setPosition(cc.p(0,-200));
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
		var randomNum = Math.floor(cc.random0To1() * 6) + 1; 
		this.monsterState = randomNum;
		this.initMonster();
		this.monster.setPosition(cc.p(0,-130));
		this.monster.runAction(this.dance());
	},
	loseScore:function(){
		this.score--;
		this.myState = STATE.DEFAULT;
		this.scoreDisplay.string = "Score: "+this.score.toString();
		cc.audioEngine.playEffect(this.wrongAudio,false);
		var randomNum = Math.floor(cc.random0To1() * 6) + 1; 
		this.monsterState = randomNum;
		this.initMonster();
		this.monster.setPosition(cc.p(0,-130));
		this.monster.runAction(this.dance());
	},
	modeTest:function(){
		this.initMonster();
		this.resetColor();
		for(var i =0; i<this.labels.length; i++){
			this.labels[i].active = true;
		}
		this.myMode = MODE.TEST;
		this.myState = STATE.DEFAULT;
		this.monsterState = STATE.DEFAULT;
		this.score = 0;
		this.scoreDisplay.string = "Score: "+this.score.toString();
		this.infoDisplay.string = "In test mode, you can try 6 basic actions in cocos creator. Click the action buttons to see what will happen!"
	},
	modePlay:function(){
		this.initMonster();
		this.monster.setPosition(cc.p(0,-130));
		this.resetColor();
		for(var i =0; i<this.labels.length; i++){
			this.labels[i].active = false;
		}
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
    
     next:function(){
        introduction.myState=introduction.STATE.level4_1;
        cc.director.loadScene("Introduction");  
     },
});
