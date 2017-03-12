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
        keys:{
            default:[],
            type:[cc.Node]
        },
        btnSprites:{
            default:[],
            type:[cc.SpriteFrame]
        },
        btnIcons:{
            default:[],
            type:[cc.Node]
        },
        codeLabel:{
            default:null,
            type:cc.Label
        },
        textLabel:{
            default:null,
            type:cc.Label
        },
        robot:{
            default:null,
            type:cc.Node
        },
        bird:{
            default:null,
            type:cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.myCurrentKey = null;
        this.myCurrentBtn = 0;//default is 0, 1 is up, 2 is down, 3 is left, 4 is right, 5 is attack.
        for(var i in this.btnIcons){
            this.btnIcons[i].getComponent("iconListener").game = this;
        }
        this.myUp = 0;
        this.myDown = 0;
        this.myLeft = 0;
        this.myRight = 0;
        this.myAttack = 0;
        this.init();
        this.robot.active = false;
        this.currentMode = 0;//0 is test mode, 1 is play mode
        this.playerController =this.robot.getComponent("PlayerController");
        this.robot.getComponent("PlayerController").game = this;
        this.bird.getComponent("bird").game = this;
        this.bird.active = false;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        //cc.log(this.myCurrentBtn);
    },
    
    init:function(){
        var self = this;
        for(var i in this.keys)
        {
            this.keys[i].addComponent("keyProp");
            this.keys[i].getComponent("keyProp").keyValue = 65 + (i - 0);
            this.keys[i].getComponent("keyProp").keySprite = this.keys[i].getComponent(cc.Sprite).spriteFrame;
            this.keys[i].getComponent("keyProp").keyChar = this.keys[i].getComponent("keyProp").getKey(65 + (i - 0));
            this.keys[i].on(cc.Node.EventType.MOUSE_ENTER, function (event) {
                if(self.myCurrentBtn !== 0){
                    this.color = new cc.Color(0, 255, 0);
		            self.check(this);
                }
	        }, this.keys[i]);
		    this.keys[i].on(cc.Node.EventType.MOUSE_LEAVE, function (event) {
	            this.color = new cc.Color(255, 255, 255);
	    	    self.myCurrentKey = null;
            }, this.keys[i]);
        }
    },
    
    check:function(currentKeyNode){
        if(currentKeyNode != null){
            this.myCurrentKey = currentKeyNode;
        }
    },
    bindKey:function(btnNum,key){
        key.getComponent("keyProp").bindBtn = btnNum;
        switch(btnNum){
            case 1:
                this.myUp = key.getComponent("keyProp").keyValue;
                key.getComponent(cc.Sprite).spriteFrame = this.btnSprites[0];
                this.codeLabel.string = "var onKeyPressed = function(keyCode){" +
                    "\nif(keyCode == " +key.getComponent("keyProp").keyChar+"){" +
                    "\n[pseudocode]let the character move up}\n}";
                this.textLabel.string = "The onKeyPressed function means if you press the key which is binded to up, then you can make the character move up!";
                break;
            case 2:
                this.myDown = key.getComponent("keyProp").keyValue;
                key.getComponent(cc.Sprite).spriteFrame = this.btnSprites[1];
                this.codeLabel.string = "var onKeyPressed = function(keyCode){" +
                    "\nif(keyCode == " +key.getComponent("keyProp").keyChar+"){" +
                    "\n[pseudocode]let the character move down}\n}";
                this.textLabel.string = "The onKeyPressed function means if you press the key which is binded to down, then you can make the character move down!";
                break;
            case 3:
                this.myLeft = key.getComponent("keyProp").keyValue;
                key.getComponent(cc.Sprite).spriteFrame = this.btnSprites[2];
                this.codeLabel.string = "var onKeyPressed = function(keyCode){" +
                    "\nif(keyCode == " +key.getComponent("keyProp").keyChar+"){" +
                    "\n[pseudocode]let the character move left}\n}";
                this.textLabel.string = "The onKeyPressed function means if you press the key which is binded to left, then you can make the character move left!";
                break;
            case 4:
                this.myRight = key.getComponent("keyProp").keyValue;
                key.getComponent(cc.Sprite).spriteFrame = this.btnSprites[3];
                this.codeLabel.string = "var onKeyPressed = function(keyCode){" +
                    "\nif(keyCode == " +key.getComponent("keyProp").keyChar+"){" +
                    "\n[pseudocode]let the character move right}\n}";
                this.textLabel.string = "The onKeyPressed function means if you press the key which is binded to right, then you can make the character move right!";
                break;
            case 5:
                this.myAttack = key.getComponent("keyProp").keyValue;
                key.getComponent(cc.Sprite).spriteFrame = this.btnSprites[4];
                this.codeLabel.string = "var onKeyPressed = function(keyCode){" +
                    "\nif(keyCode == " +key.getComponent("keyProp").keyChar+"){" +
                    "\n[pseudocode]let the character attack}\n}";
                this.textLabel.string = "The onKeyPressed function means if you press the key which is binded to attack, then you can make the character attack!";
                break;
            default: break;
        }
    },
    resetKey:function(btnNum){
        switch(btnNum){
            case 1:
                this.myUp = 0;
                this.playerController.moveUp = false;
                break;
            case 2:
                this.myDown = 0;
                this.playerController.moveDown = false;
                break;
            case 3:
                this.myLeft = 0;
                this.playerController.moveLeft = false;
                break;
            case 4:
                this.myRight = 0;
                this.playerController.moveRight = false;
                break;
            case 5:
                this.myAttack = 0;
                break;
        }
        for(var i in this.keys){
            if(this.keys[i].getComponent("keyProp").bindBtn == btnNum){
                this.keys[i].getComponent("keyProp").bindBtn = 0;
                this.keys[i].getComponent(cc.Sprite).spriteFrame = this.keys[i].getComponent("keyProp").keySprite;
            }
        }
    },
    setInputControl: function () {
		var self = this;
		var onKeyPressed = function (keyCode, event) {
			switch (keyCode) {
			    case self.myUp:
                    self.playerController.moveUp = true;
                    self.playerController.myAnimator.play("robotRun");
				    break;
			    case self.myDown:
			        self.playerController.moveDown = true;
                    self.playerController.myAnimator.play("robotRun");
				    break;
				case self.myLeft:
				    self.playerController.moveLeft = true;
                    self.robot.scaleX = -1;
                    self.playerController.myAnimator.play("robotRun");
				    break;
				case self.myRight:
			        self.playerController.moveRight = true;
                    self.robot.scaleX = 1;
                    self.playerController.myAnimator.play("robotRun");
				    break;
				case self.myAttack:
                    self.playerController.myAnimator.play("robotShoot");
				    break;
			}
		};
		var onKeyReleased = function (keyCode, event) {
			switch (keyCode) {
			    case self.myUp:
                    self.playerController.moveUp = false;
                    break;
			    case self.myDown:
			        self.playerController.moveDown = false;
                    break;
				case self.myLeft:
				    self.playerController.moveLeft = false;
                    break;
				case self.myRight:
			        self.playerController.moveRight = false;
                    break;
				case self.myAttack:
                    self.playerController.myAnimator.play("robotRun");
				    break;
			}
			if(!self.playerController.moveUp && !self.playerController.moveDown && !self.playerController.moveLeft && !self.playerController.moveRight){
                self.playerController.myAnimator.play("robotIdle");			    
			}
		};
		if(this.currentMode){
		    // add keyboard event listener
	    	cc.eventManager.addListener({
		    	event: cc.EventListener.KEYBOARD,
		    	onKeyPressed,
		    	onKeyReleased,
		    }, self.node);
		}
	},
	allBinded:function(){
	    return (this.myUp && this.myDown&& this.myLeft&& this.myRight&& this.myAttack);
	},
    testMode:function(){
        cc.director.loadScene("level4"); 
    },
    playMode:function(){
        if(this.allBinded()){
            this.currentMode = 1; // enter play mode
            this.robot.active = true;
            this.textLabel.enabled = false;
            this.codeLabel.enabled = false;
            for(var i in this.btnIcons){
                this.btnIcons[i].active = false;
            }
            this.bird.active = true;
            this.setInputControl();
        }else{
            this.textLabel.string = "You have to bind all keys that needed!";
        }
    },
});
