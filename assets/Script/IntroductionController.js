const STATE=cc.Enum({
   level1_1:1,
   level1_2:2,
   level1_3:3,
   level1_4:4,
   level2_1:5,
   level2_2:6,
   level2_3:7,
   level3_1:8,
   level3_2:9,
   level4_1:10,
   
});

module.exports={
    STATE:STATE,
    myState:STATE    
};

var controller=require('IntroductionController');

cc.Class({
    extends: cc.Component,

    properties: {
        text:{
            default: null,
            type: cc.Label
        },
        minesweeper:{
            default:null,
            type:cc.Sprite
        },
        minesweeperRes:{
            default:null,
            type:cc.Sprite
        },
		tankbattle:{
            default:null,
            type:cc.Sprite
        },
        tankbattleRes1:{
            default:null,
            type:cc.Sprite
        },
		tankbattleRes2:{
            default:null,
            type:cc.Sprite
        },
		tankbattleRes3:{
            default:null,
            type:cc.Sprite
        },
    },

    // use this for initialization
    onLoad: function () {
        this.minesweeper.enabled=false;
        this.minesweeperRes.enabled=false;
		this.tankbattle.enabled = false;
		this.tankbattleRes1.enabled = false;
		this.tankbattleRes2.enabled = false;
		this.tankbattleRes3.enabled = false;
        if(controller.myState!=STATE.level2_1 && controller.myState!=STATE.level3_1  && controller.myState!=STATE.level4_1){
            controller.myState=STATE.level3_1;
        }
        
        this.str1 = 'This game aims to make you be familiar with the procedures of building games using Cocos Creator.'+
                    '\n\nGenerally, there are three procedures in building a game using Cocos Creator.'+
                    '\n\n1. Collect/Create game resources'+
                    '\n2. Create user interface'+
                    '\n3. Write some scripts and bind them with game components'+
                    "\n\nPress 'Enter' to continue.";
        this.str2 = 'This game has three levels.'+
                    ' In each level, you will create a part of demo game by playing a game.'+
                    "\n\nIn level1, you need to collect images resources to build 'Minesweeper'."+
                    "The following is the interface of Minesweeper."+
                    "\n\nPress 'Enter' to continue.";
        this.str3 = "In order to build 'Minesweeper', you have to collect a lot of image resources, such as numbers, boom, flag, etc."+
                    '\n\nThe followings are the image resources that you need to collect.'+
                    "\n\nPress 'Enter' to continue.";
        this.str4 = "Then you will become a jumping alien in this level, and you need to collect all image resources of minesweeper."+
                    "\n\nEach image resource will display for 3s, then it will disappear and you will lose 5 scores."+
                    "\n\nWhen you collect one resource, you gain 5 scores."+
                    "\n\nAt the end of this level, if you gain more than 40 scores, you will be able to play minesweeper as a reward. Otherwise, you have to play again."+
                    "\n\nPress 'Enter' to try level1, Let's collect the game resources now!";
        this.str2_1 = "In level2, you need to create user interface for 'Tank Battle'." +
					"\n\nThe following is the interface of 'Tank Battle'."+
					"\n\nPress 'Enter' to continue.";
		this.str2_2 = "In order to build 'Tank Battle', you have to design the user interface (map), and drag the resources to the screen."+
                    '\n\nThe followings are three maps that you need to create.'+
                    "\n\nPress 'Enter' to continue.";
		this.str2_3 = "Then you will become a running man in this level, and you need to collect and throw the image tile of 'Tank Battle' to correct position."+
                    "\n\nThese image tiles include water, wall, steel and grass. They will be droped randomly by a folder."+
                    "\n\nWhen you throw one tile into correct position, you gain 1 score. Otherwise, you lose 1 score."+
                    "\n\nThere is a time limit of 300 seconds, if you complete creating the three maps in 300s, you will be able to play tankbattle as a reward. Otherwise, you have to play again."+
                    "\n\nPress 'Enter' to try level2, Let's create the user interface now!";
		this.str3_1 = "In level3, you will be familiar with 6 basic actions in Cocos Creator. " +
		              "\n\nThey are Move, Rotate, Scale, Skew, Jump and Blink actions. " +
		              "\n\nFor each action, you will be able to view the code and see what happens by execting the code."+
		              "\n\nPress 'Enter' to continue.";
		this.str3_2 = "There are two modes in this level, they are test mode and play mode. " +
		              "\n\nIn test mode, you will be able to view the code and see what happens by execting the code when you click the corresponding buttons. "+
		              "\n\nAfter you are familiar with these actions, you can enter play mode, in which you could test if you really know what these actions can do. " +
		              "\n\nPress 'Enter' to try level3, Let's check these actions now!";
		this.str4_1 = "In level4, you need to do something about key bindings";
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        console.log(controller.myState);
        if(controller.myState==STATE.level1_1){
            this.state1_1();
        }else if(controller.myState==STATE.level1_2){
            this.state1_2();
        }else if(controller.myState==STATE.level1_3){
            this.state1_3();
        }else if(controller.myState==STATE.level1_4){
            this.state1_4();
        }else if(controller.myState==STATE.level2_1){
            this.state2_1();
        }else if(controller.myState==STATE.level2_2){
            this.state2_2();
        }else if(controller.myState==STATE.level2_3){
            this.state2_3();
        }else if(controller.myState==STATE.level3_1){
            this.state3_1();
        }else if(controller.myState==STATE.level3_2){
            this.state3_2();
        }else if(controller.myState==STATE.level4_1){
            this.state4_1();
        }
    },
    
    state1_1:function(){
        this.text.string=this.str1;
        var self=this;
        cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode,event){
                switch(keyCode){
                    case cc.KEY.enter:
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.enter:
                        controller.myState=STATE.level1_2;
                        break;
                }
            }
        },self.node);
    },
    
    state1_2:function(){
        this.text.string=this.str2;
		this.minesweeper.enabled=true;
        var self=this;
        cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode,event){
                switch(keyCode){
                    case cc.KEY.enter:
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.enter:
                        controller.myState=STATE.level1_3;
                        self.minesweeper.enabled=false;
                        break;
                }
            }
        },self.node);
    },
    
    state1_3:function(){
        this.text.string=this.str3;
        this.minesweeperRes.enabled=true;
		var self=this;
        cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode,event){
                switch(keyCode){
                    case cc.KEY.enter:
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.enter:
                        controller.myState=STATE.level1_4;
                        self.minesweeperRes.enabled=false;
                        break;
                }
            }
        },self.node);
    },
    
    state1_4:function(){
        this.text.string=this.str4;
        var self=this;
        cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode,event){
                switch(keyCode){
                    case cc.KEY.enter:
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.enter:
                        cc.director.loadScene('level1');
                        break;
                }
            }
        },self.node);
    },
    
    state2_1:function(){
        this.text.string=this.str2_1;
		this.tankbattle.enabled = true;
        var self=this;
        cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode,event){
                switch(keyCode){
                    case cc.KEY.enter:
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.enter:
                        controller.myState=STATE.level2_2;
						self.tankbattle.enabled = false;
                        break;
                }
            }
        },self.node);
    },
	state2_2:function(){
        this.text.string=this.str2_2;
		this.tankbattleRes1.enabled = true;
		this.tankbattleRes2.enabled = true;
		this.tankbattleRes3.enabled = true;
        var self=this;
        cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode,event){
                switch(keyCode){
                    case cc.KEY.enter:
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.enter:
                        controller.myState=STATE.level2_3;
						self.tankbattleRes1.enabled = false;
						self.tankbattleRes2.enabled = false;
						self.tankbattleRes3.enabled = false;
                        break;
                }
            }
        },self.node);
    },
	state2_3:function(){
        this.text.string=this.str2_3;
        var self=this;
        cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode,event){
                switch(keyCode){
                    case cc.KEY.enter:
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.enter:
                        cc.director.loadScene('level2');
                        break;
                }
            }
        },self.node);
    },
	state3_1:function(){
        this.text.string=this.str3_1;
        var self=this;
        cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode,event){
                switch(keyCode){
                    case cc.KEY.enter:
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.enter:
                        controller.myState=STATE.level3_2;
                        break;
                }
            }
        },self.node);
    },
    state3_2:function(){
        this.text.string=this.str3_2;
        var self=this;
        cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode,event){
                switch(keyCode){
                    case cc.KEY.enter:
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.enter:
                        cc.director.loadScene('level3');
                        break;
                }
            }
        },self.node);
    },
    state4_1:function(){
        this.text.string=this.str4_1;
        var self=this;
        cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode,event){
                switch(keyCode){
                    case cc.KEY.enter:
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.enter:
                        cc.director.loadScene('level4');
                        break;
                }
            }
        },self.node);
    },
});
