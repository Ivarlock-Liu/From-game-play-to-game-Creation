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
        upIcon:{
            default:null,
            type:cc.Node
        },
        downIcon:{
            default:null,
            type:cc.Node
        },
        leftIcon:{
            default:null,
            type:cc.Node
        },
        rightIcon:{
            default:null,
            type:cc.Node
        },
        attackIcon:{
            default:null,
            type:cc.Node
        },
        codeLabel:{
            default:null,
            type:cc.Label
        },
        textLabel:{
            default:null,
            type:cc.Label
        },
    },

    // use this for initialization
    onLoad: function () {
        this.myCurrentKey = null;
        this.myCurrentBtn = 0;//default is 0, 1 is up, 2 is down, 3 is left, 4 is right, 5 is attack.
        this.upIcon.getComponent("iconListener").game = this;
        this.downIcon.getComponent("iconListener").game = this;
        this.leftIcon.getComponent("iconListener").game = this;
        this.rightIcon.getComponent("iconListener").game = this;
        this.attackIcon.getComponent("iconListener").game = this;
        this.myUp = null;
        this.myDown = null;
        this.myLeft = null;
        this.myRight = null;
        this.myAttack = null;
        this.init();
        this.setInputControl();
        //cc.log(this.keys[5].getComponent("keyProp").isBinded);
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
        key.getComponent("keyProp").isBinded = true;
        switch(btnNum){
            case 1:
                this.myUp = key.getComponent("keyProp").keyValue;
                key.getComponent(cc.Sprite).spriteFrame = this.btnSprites[0];
                this.codeLabel.string = "var onKeyPressed = function(keyCode){" +
                    "\nif(keyCode == UpKey){" +
                    "\nlet the character move up}\n}";
                this.textLabel.string = "The onKeyPressed function means if you press the key which is binded to up, then you can make the character move up!";
                break;
            case 2:
                this.myDown = key.getComponent("keyProp").keyValue;
                key.getComponent(cc.Sprite).spriteFrame = this.btnSprites[1];
                this.codeLabel.string = "var onKeyPressed = function(keyCode){" +
                    "\nif(keyCode == DownKey){" +
                    "\nlet the character move down}\n}";
                this.textLabel.string = "The onKeyPressed function means if you press the key which is binded to down, then you can make the character move down!";
                break;
            case 3:
                this.myLeft = key.getComponent("keyProp").keyValue;
                key.getComponent(cc.Sprite).spriteFrame = this.btnSprites[2];
                this.codeLabel.string = "var onKeyPressed = function(keyCode){" +
                    "\nif(keyCode == LeftKey){" +
                    "\nlet the character move left}\n}";
                this.textLabel.string = "The onKeyPressed function means if you press the key which is binded to left, then you can make the character move left!";
                break;
            case 4:
                this.myRight = key.getComponent("keyProp").keyValue;
                key.getComponent(cc.Sprite).spriteFrame = this.btnSprites[3];
                this.codeLabel.string = "var onKeyPressed = function(keyCode){" +
                    "\nif(keyCode == RightKey){" +
                    "\nlet the character move right}\n}";
                this.textLabel.string = "The onKeyPressed function means if you press the key which is binded to right, then you can make the character move right!";
                break;
            case 5:
                this.myAttack = key.getComponent("keyProp").keyValue;
                key.getComponent(cc.Sprite).spriteFrame = this.btnSprites[4];
                this.codeLabel.string = "var onKeyPressed = function(keyCode){" +
                    "\nif(keyCode == AttackKey){" +
                    "\nlet the character attack}\n}";
                this.textLabel.string = "The onKeyPressed function means if you press the key which is binded to attack, then you can make the character attack!";
                break;
            default: break;
        }
    },
    setInputControl: function () {
		var self = this;
		var onKeyPressed = function (keyCode, event) {
			switch (keyCode) {
			    case self.myUp:
			        cc.log("i am up!");
				    break;
			    case self.myDown:
			        cc.log("i am down!");
				    break;
				case self.myLeft:
			        cc.log("i am left!");
				    break;
				case self.myRight:
			        cc.log("i am right!");
				    break;
				case self.myAttack:
			        cc.log("i am attacking!");
				    break;
			}
		}
		var onKeyReleased = function (keyCode, event) {
			switch (keyCode) {
			    case self.myUp:
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
    testMode:function(){
        cc.director.loadScene("level4"); 
    },
});
