const STATE=cc.Enum({
   level1_1:1,
   level1_2:2,
   level1_3:3,
   level1_4:4,
   level2_1:5,
   
});

module.exports={
    STATE:STATE,
    myState:STATE    
};

var controller=require('IntroductionController');

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
        }
    },

    // use this for initialization
    onLoad: function () {
        this.minesweeper.enabled=false;
        this.minesweeperRes.enabled=false;
        if(controller.myState!=STATE.level2_1){
            controller.myState=STATE.level1_1;
        }
        
        this.str1 = 'This game aim to teach you how to build games using Cocos Creator.'+
                    '\n\n There are three procedures in building a game using Cocos Creator.'+
                    '\n\n1. Collect/Create game resources'+
                    '\n2. Create user interface'+
                    '\n3. write some scripts and bind them with game components'+
                    "\n\nPress 'Enter' to continue.";
        this.str2 = 'This game has three levels.'+
                    ' In each level, you will simulate one of the three procedures to build three demo games.'+
                    "\n\nIn level1, you will simulate collecting images resources to build 'Minesweeper'."+
                    "The following is the demo interface."+
                    "\n\nPress 'Enter' to continue.";
        this.str3 = "In order to build 'Minesweeper', you have to collect a lot of image resources, such as numbers, boom, flag, etc."+
                    '\n\nFollowing is the image resources that you need to collect.'+
                    "\n\nPress 'Enter' to continue.";
        this.str4 = "In level1, you will become a jumping alien in this level, and you need to collect all image resources of minesweeper."+
                    "\n\nEach image resource will display for 3s, then it will disappear and you will lose 5 scores."+
                    "\n\nWhen you collect one resource, you gain 5 scores."+
                    "\n\nAt the end of this level, if you gain more than 40 scores, you will be able to play minesweeper as prize. Otherwise, you have to play again."+
                    "\n\nPress 'Enter' to try level1, Let's simulate this process now!";
        this.str5 = "In level2, you will do something.";
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
                        self.minesweeper.enabled=true;
                        break;
                }
            }
        },self.node);
    },
    
    state1_2:function(){
        this.text.string=this.str2;
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
                        self.minesweeperRes.enabled=true;
                        break;
                }
            }
        },self.node);
    },
    
    state1_3:function(){
        this.text.string=this.str3;
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
        this.text.string=this.str5;
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
    }
});