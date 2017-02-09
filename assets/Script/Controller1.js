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
        spritePrefab:{
            default:null,
            type:cc.Prefab
        },
        spriteDuration:0,
        ground:{
            default:null,
            type:cc.Node
        },
        player:{
            default:null,
            type:cc.Node
        },
        res:{
            default:[],
            type:[cc.SpriteFrame]
        },
        randomNum:0,
        length:0,
        sprites:{
            default:null,
            type:cc.Node
        },
        scoreDisplay:{
            default:null,
            type:cc.Label
        },
        collectionDisplay:{
            default:null,
            type:cc.Label
        },
        feedbackDisplay:{
            default:null,
            type:cc.Label
        },
        nextButton:{
            default:null,
            type:cc.Node
        },
        replayButton:{
            default:null,
            type:cc.Node
        },
        gameButton:{
            default:null,
            type:cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        this.feedbackDisplay.enabled=false;
        this.nextButton.active=false;
        this.replayButton.active=false;
        this.gameButton.active=false;
        this.groundY=this.ground.y+this.ground.height/2;
        this.spawnNewSprite();
        
        this.score=0;
        this.timer=0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.length>0 && this.timer>this.spriteDuration){
            this.loseScore();
            this.spawnNewSprite();
            return;
        }
        if(this.length==0){
            this.player.stopAllActions();
            this.player.getComponent("Player").enabled=false;
            this.length=-1;
            this.scoreDisplay.enabled=false;
            this.collectionDisplay.enabled=false;
            this.feedbackDisplay.enabled=true;
            this.nextButton.active=true;
            if(this.score>=40){
                this.feedbackDisplay.string="Congratulation! you collected all picture resources and you got "+this.score.toString()+
                " scores! Now you can play the Minesweeper or enter next level for create UI!";
                this.gameButton.active=true;
            }else{
                this.feedbackDisplay.string="That is a pity! you collected all picture resources but you just got "+this.score.toString()+
                " scores! Now you can replay the game or enter next level for create UI!";
                this.replayButton.active=true;
            }
        }
        this.timer+=dt;
    },
    
    gainScore:function(){
      this.score+=5;
      this.scoreDisplay.string="Score: "+this.score.toString();
        
    },
    
    loseScore:function(){
        this.score-=5;
        this.scoreDisplay.string="Score: "+this.score.toString();
    },
    
    delayOver:function(){
        this.unscheduleUpdate();
        
    },
    delaySpawn:function(){
        this.timer=-1;
        this.scheduleOnce(this.spawnNewSprite, 1);
    },
    spawnNewSprite:function(){
        this.timer=0;
        var newSprite=cc.instantiate(this.spritePrefab);
        
        this.randomNum=Math.floor(cc.random0To1()*this.length);
        if(this.randomNum==this.length)
        this.randomNum=this.length-1;

        //var realUrl=cc.url.raw("Texture/Minesweeper/"+this.res[this.randomNum]);
        //var texture = cc.textureCache.addImage(realUrl);
        newSprite.getComponent(cc.Sprite).spriteFrame=this.res[this.randomNum];
        newSprite.setPosition(this.getNewSpritePosition());
        newSprite.getComponent('Sprites').game=this;
        
        this.node.addChild(newSprite);
    },
    getNewSpritePosition:function(){
        var randX=0;
        var randY=this.groundY+cc.random0To1()*this.player.getComponent('Player').jumpHeight+50;
        var maxX=this.node.width/2;
        randX=cc.randomMinus1To1()*maxX;
        return cc.p(randX,randY);
    },
    
    nextLevel: function(){
        cc.director.loadScene('level2');    
    },
    
    replay: function(){
        cc.director.loadScene('level1');    
    },
    
    enterGame:function(){
        cc.director.loadScene('Minesweeper'); 
    }
});
