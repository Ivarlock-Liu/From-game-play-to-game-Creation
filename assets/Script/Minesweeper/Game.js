const GAME_STATE = cc.Enum({
    PREPARE:0,
    PLAY:1,
    DEAD:2,
    WIN:3
});
const TOUCH_STATE = cc.Enum({
    LEFT:0,
    RIGHT:1,
});
var introduction = require('IntroductionController');
cc.Class({
    extends: cc.Component,

    properties: {
        tilesLayout:cc.Node,
        tilePrefab:cc.Prefab,
        btnShow:cc.Node,
        tiles:[],//save all the tiles with a array
        picPrepare:cc.SpriteFrame,
        picPlay:cc.SpriteFrame,
        picDead:cc.SpriteFrame,
        picWin:cc.SpriteFrame,
        gameState:{
            default:GAME_STATE.PREPARE,
            type:GAME_STATE,
        },
        touchState:{
            default:TOUCH_STATE.LEFT,
            type:TOUCH_STATE,
        },
        row:0,
        col:0,
        bombNum:0,
        
    },

    onLoad: function () {
        this.tileScript=require("Tile");
        var self = this;
        for(var r=0;r<this.row;r++){
            for(var c=0;c<this.col;c++){
                var tile = cc.instantiate(this.tilePrefab);
                tile.tag = r*this.col+c;
                tile.on(cc.Node.EventType.MOUSE_UP,function(event){
                    if(event.getButton() === cc.Event.EventMouse.BUTTON_LEFT){
                        self.touchState = TOUCH_STATE.LEFT;
                    }else if(event.getButton() === cc.Event.EventMouse.BUTTON_RIGHT){
                        self.touchState = TOUCH_STATE.RIGHT;
                    }
                    self.onTouchTile(this);
                });
                this.tilesLayout.addChild(tile);
                this.tiles.push(tile);
            }
        }
        this.newGame();
    },

    newGame:function(){
        //init the tiles to blank
        for(var n=0;n<this.tiles.length;n++){
            this.tiles[n].getComponent("Tile").type = this.tileScript.TYPE.ZERO;
            this.tiles[n].getComponent("Tile").state = this.tileScript.STATE.NONE;
        }
        //add boom in random position
        var tilesIndex = [];
        for(var i=0;i<this.tiles.length;i++){
            tilesIndex[i] = i;
        }
        for(var j=0;j<this.bombNum;j++){
            var n = Math.floor(Math.random()*tilesIndex.length);
            this.tiles[tilesIndex[n]].getComponent("Tile").type = this.tileScript.TYPE.BOMB;
            tilesIndex.splice(n,1);//delete a element in position n
        }
        //set the number of the tiles around the boom.
        for(var k=0;k<this.tiles.length;k++){
            var tempBombNum = 0;
            if(this.tiles[k].getComponent("Tile").type == this.tileScript.TYPE.ZERO){
                var roundTiles = this.tileRound(k);
                for(var m=0;m<roundTiles.length;m++){
                    if(roundTiles[m].getComponent("Tile").type == this.tileScript.TYPE.BOMB){
                        tempBombNum++;
                    }
                }
                this.tiles[k].getComponent("Tile").type = tempBombNum;
            }
        }
    
        this.gameState = GAME_STATE.PLAY;
        this.btnShow.getComponent(cc.Sprite).spriteFrame = this.picPlay;
    },
    
    //get around tiles array by index
    tileRound:function(i){
        var roundTiles = [];
        if(i%this.col > 0){//left
            roundTiles.push(this.tiles[i-1]);
        }
        if(i%this.col > 0 && Math.floor(i/this.col) > 0){//top left
            roundTiles.push(this.tiles[i-this.col-1]);   
        }
        if(i%this.col > 0 && Math.floor(i/this.col) < this.row-1){//bottom left
            roundTiles.push(this.tiles[i+this.col-1]);
        }
        if(Math.floor(i/this.col) > 0){//top
            roundTiles.push(this.tiles[i-this.col]);
        }
        if(Math.floor(i/this.col) < this.row-1){//bottom
            roundTiles.push(this.tiles[i+this.col]);
        }
        if(i%this.col < this.col-1){//right
            roundTiles.push(this.tiles[i+1]);
        }
        if(i%this.col < this.col-1 && Math.floor(i/this.col) > 0){//top right
            roundTiles.push(this.tiles[i-this.col+1]);
        }
        if(i%this.col < this.col-1 && Math.floor(i/this.col) < this.row-1){//bottom right
            roundTiles.push(this.tiles[i+this.col+1]);
        }
        return roundTiles;
    },
    
    onTouchTile:function(touchTile){
        if(this.gameState != GAME_STATE.PLAY){
            return;
        }
        switch(this.touchState){
            case TOUCH_STATE.LEFT:
                if(touchTile.getComponent("Tile").type === 9){
                    touchTile.getComponent("Tile").state = this.tileScript.STATE.CLICKED;
                    this.gameOver();
                    return;
                }
                var testTiles = [];
                if(touchTile.getComponent("Tile").state === this.tileScript.STATE.NONE){
                    testTiles.push(touchTile);
                    while(testTiles.length){
                        var testTile = testTiles.pop();
                        if(testTile.getComponent("Tile").type === 0){
                            testTile.getComponent("Tile").state = this.tileScript.STATE.CLICKED;
                            var roundTiles = this.tileRound(testTile.tag);
                            for(var i=0;i<roundTiles.length;i++){
                                if(roundTiles[i].getComponent("Tile").state == this.tileScript.STATE.NONE){
                                    testTiles.push(roundTiles[i]);
                                }
                            }
                        }else if(testTile.getComponent("Tile").type > 0 && testTile.getComponent("Tile").type < 9){
                            testTile.getComponent("Tile").state = this.tileScript.STATE.CLICKED;
                        }
                    }
                    this.judgeWin();
                }
                break;
            case TOUCH_STATE.RIGHT:
                if(touchTile.getComponent("Tile").state == this.tileScript.STATE.NONE){
                    touchTile.getComponent("Tile").state = this.tileScript.STATE.FLAG;
                }else if(touchTile.getComponent("Tile").state == this.tileScript.STATE.FLAG){
                    touchTile.getComponent("Tile").state = this.tileScript.STATE.NONE;
                }
                break;
            default:break;
        }
        
    },
    
    judgeWin:function(){
        var confNum = 0;
     
        for(let i=0;i<this.tiles.length;i++){
            if(this.tiles[i].getComponent("Tile").state === this.tileScript.STATE.CLICKED){
                confNum++;
            }
        }
        if(confNum === this.tiles.length-this.bombNum){
            this.gameState = GAME_STATE.WIN;
            this.btnShow.getComponent(cc.Sprite).spriteFrame = this.picWin;
        }
    },
    
   gameOver:function(){
        this.gameState = GAME_STATE.DEAD;
        this.btnShow.getComponent(cc.Sprite).spriteFrame = this.picDead;
    },
    
    
    onBtnShow:function(){
        if(this.gameState === GAME_STATE.PREPARE){
            this.newGame();
        }
        if(this.gameState === GAME_STATE.DEAD){
            // this.bombNum--;
            this.newGame();
        }
        if(this.gameState === GAME_STATE.WIN){
            // this.bombNum++;
            this.newGame();
        }
    },
    
    enterLevel2:function(){
        introduction.myState=introduction.STATE.level2_1;
        cc.director.loadScene("Introduction");
    }

});
