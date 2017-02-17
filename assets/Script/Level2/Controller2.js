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
		folder: {
		default:
			null,
			type: cc.Node
		},
		player: {
		default:
			null,
			type: cc.Node
		},
		token: {
		default:
			null,
			type: cc.Node
		},
		timeDisplay: {
		default:
			null,
			type: cc.Label
		},
		scoreDisplay: {
		default:
			null,
			type: cc.Label
		},
		mapDisplay: {
		default:
			null,
			type: cc.Label
		},
		feedbackDisplay: {
		default:
			null,
			type: cc.Label
		},
		mapContainer: {
		default:
			null,
			type: cc.Node
		},
		replayButton:{
            default:null,
            type:cc.Node
        },
		nextButton:{
            default:null,
            type:cc.Node
        },
		tankButton:{
            default:null,
            type:cc.Node
        },
		tilesPrefab: {
		default:
			null,
			type: cc.Prefab,
		},
		picRes: {
		default:
			[],
			type: [cc.SpriteFrame]
		},
		dropSpeed: 0,
		timeLimit:0,
		map1Num:0,
		map2Num:0,
		map3Num:0,
	},

	// use this for initialization
	onLoad: function () {
		this.timer = 0;
		this.score = 0;
		this.correctNum = 0;
		this.mapTiles = [];
		this.map();
		this.loadMap1();
		this.onSelect = -1;
		this.setInputControl();
		this.scoreDisplay.string="Score: "+this.score.toString();
		this.feedbackDisplay.enabled=false;
		this.replayButton.active=false;
		this.nextButton.active = false;
		this.tankButton.active = false;
	},

	// called every frame, uncomment this function to activate update callback
	update: function (dt) {
		this.timer += dt;
		this.timeLimit -= dt;
		if (this.timer >= this.dropSpeed) {
			this.spawnNewTile();
			this.timer = 0;
		}
		this.timeDisplay.string = "Time: " + Math.floor(this.timeLimit).toString();
		if(this.timeLimit <= 1){
			this.gameOver();
		}
		switch(this.correctNum){
			case this.map1Num:
				this.correctNum++;
				this.loadMap2();
				break;
			case this.map1Num+this.map2Num+1:
				this.correctNum++;
				this.loadMap3();
				break;
			case this.map1Num+this.map2Num+this.map3Num+2:
				this.win();
				break;
		}
	},
	spawnNewTile: function () {
		var newTile = cc.instantiate(this.tilesPrefab);
		newTile.setPosition(this.folder.position);
		newTile.getComponent('Tiles').game = this;
		var randomNum = Math.floor(cc.random0To1() * this.picRes.length);
		if (randomNum == this.picRes.length)
			randomNum = this.picRes.length - 1;
		newTile.getComponent(cc.Sprite).spriteFrame = this.picRes[randomNum];
		this.node.addChild(newTile);
		var down = cc.moveBy(newTile.getComponent("Tiles").downDuration, cc.p(0, -640));
		var callback = cc.callFunc(function () {
				newTile.destroy();
			}, this);
		newTile.runAction(cc.sequence(down, callback));
	},
	map: function () {
		var self = this;
		for (var col = 0; col < 8; col++) {
			for (var row = 0; row < 8; row++) {
				this.mapTiles[col * 8 + row] = cc.instantiate(this.tilesPrefab);
				this.mapTiles[col * 8 + row].getComponent("Tiles").index = col * 8 + row;
				this.mapTiles[col * 8 + row].setPosition(cc.p(180 + 40 * row, -20 - col * 40));
				this.mapTiles[col * 8 + row].color = new cc.Color(127.5, 127.5, 127.5);
				this.mapTiles[col * 8 + row].getComponent('Tiles').game = this;
				this.mapTiles[col * 8 + row].on(cc.Node.EventType.MOUSE_ENTER, this.onEnter, this.mapTiles[col * 8 + row]);
				this.mapTiles[col * 8 + row].on(cc.Node.EventType.MOUSE_LEAVE, this.onLeave, this.mapTiles[col * 8 + row]);
				this.mapContainer.addChild(this.mapTiles[col * 8 + row]);
			}
		}
	},
	onEnter:function (event) {
		this.color = new cc.Color(0, 255, 0);
		this.getComponent("Tiles").game.onSelect = this.getComponent("Tiles").index;
	},
	onLeave:function (event) {
		this.color = new cc.Color(127.5, 127.5, 127.5);
		this.getComponent("Tiles").game.onSelect = -1;
	},
	loadMap1: function () {
		var grassArr = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
		var wallArr = [1, 2, 5, 6, 9, 10, 13, 14];
		var steelArr = [40, 41, 42, 45, 46, 47, 48, 49, 50, 53, 54, 55, 56, 57, 58, 61, 62, 63];
		var waterArr = [32, 33, 34, 37, 38, 39];
		for (var x in grassArr) {
			this.mapTiles[grassArr[x]].getComponent(cc.Sprite).spriteFrame = this.picRes[0];
		}
		for (var x in wallArr) {
			this.mapTiles[wallArr[x]].getComponent(cc.Sprite).spriteFrame = this.picRes[1];
		}
		for (var x in waterArr) {
			this.mapTiles[waterArr[x]].getComponent(cc.Sprite).spriteFrame = this.picRes[2];
		}
		for (var x in steelArr) {
			this.mapTiles[steelArr[x]].getComponent(cc.Sprite).spriteFrame = this.picRes[3];
		}
	},
	loadMap2: function () {
		for(var i=0;i<64;i++){
			this.mapTiles[i].getComponent(cc.Sprite).spriteFrame=null;
			this.mapTiles[i].color = new cc.Color(127.5, 127.5, 127.5);
			this.mapTiles[i].on(cc.Node.EventType.MOUSE_ENTER, this.onEnter, this.mapTiles[i]);
			this.mapTiles[i].on(cc.Node.EventType.MOUSE_LEAVE, this.onLeave, this.mapTiles[i]);
		}
		var grassArr = [1,6,8,9,10,11,12,13,14,15,17,22,25,30,33,38,41,46,48,49,50,51,52,53,54,55,57,62];
		var wallArr = [27,28,35,36];
		var steelArr = [18,21,26,29,34,37,42,45];
		var waterArr = [43,44];
		
		for (var x in grassArr) {
			this.mapTiles[grassArr[x]].getComponent(cc.Sprite).spriteFrame = this.picRes[0];
		}
		for (var x in wallArr) {
			this.mapTiles[wallArr[x]].getComponent(cc.Sprite).spriteFrame = this.picRes[1];
		}
		for (var x in waterArr) {
			this.mapTiles[waterArr[x]].getComponent(cc.Sprite).spriteFrame = this.picRes[2];
		}
		for (var x in steelArr) {
			this.mapTiles[steelArr[x]].getComponent(cc.Sprite).spriteFrame = this.picRes[3];
		}
	},
	loadMap3: function () {
		for(var i=0;i<64;i++){
			this.mapTiles[i].getComponent(cc.Sprite).spriteFrame=null;
			this.mapTiles[i].color = new cc.Color(127.5, 127.5, 127.5);
			this.mapTiles[i].on(cc.Node.EventType.MOUSE_ENTER, this.onEnter, this.mapTiles[i]);
			this.mapTiles[i].on(cc.Node.EventType.MOUSE_LEAVE, this.onLeave, this.mapTiles[i]);
		}
		var grassArr = [53,54,55,61,62,63];
		var wallArr = [0,6,8,14,49,50,51,57,59];
		var steelArr = [3,11,16,17,18,19,20,21,22];
		var waterArr = [32,33,34,35,36,37,38,39];
		for (var x in grassArr) {
			this.mapTiles[grassArr[x]].getComponent(cc.Sprite).spriteFrame = this.picRes[0];
		}
		for (var x in wallArr) {
			this.mapTiles[wallArr[x]].getComponent(cc.Sprite).spriteFrame = this.picRes[1];
		}
		for (var x in waterArr) {
			this.mapTiles[waterArr[x]].getComponent(cc.Sprite).spriteFrame = this.picRes[2];
		}
		for (var x in steelArr) {
			this.mapTiles[steelArr[x]].getComponent(cc.Sprite).spriteFrame = this.picRes[3];
		}
	},
	gainScore: function () {
		this.score++;
		this.scoreDisplay.string = "Score: " + this.score;
		this.correctNum += 1;
		cc.log(this.correctNum);
	},
	loseScore: function () {
		this.score--;
		this.scoreDisplay.string = "Score: " + this.score;
	},
	gameOver:function(){
		this.feedbackDisplay.string = "Time out! Please try again!";
		this.feedbackDisplay.enabled=true;
		this.player.active = false;
		this.folder.active = false;
		this.replayButton.active=true;
		this.enabled = false;
	},
	win:function(){
		this.feedbackDisplay.string = "Congradulations! \nYou got "+this.score.toString()+" scores! \nNow you can play TankBattle or enter next level!";
		this.feedbackDisplay.enabled=true;
		this.player.active = false;
		this.folder.active = false;
		this.nextButton.active = true;
		this.tankButton.active = true;
		this.enabled = false;
	},
	setInputControl: function () {
		var self = this;
		var onKeyPressed = function (keyCode, event) {
			switch (keyCode) {
			case cc.KEY.space:
				break;
			}
		}
		var onKeyReleased = function (keyCode, event) {
			switch (keyCode) {
			case cc.KEY.space:
				if (self.player.getComponent("Level2Player").isTaking) {
					if (self.onSelect != -1) {
						self.moveAction(self.onSelect);
					}
				}
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
	moveAction: function (index) {
		var self = this;
		var tmp = cc.instantiate(this.token);
		tmp.setPosition(this.player.position);
		this.node.addChild(tmp);
		this.token.getComponent(cc.Sprite).spriteFrame = null;
		this.player.getComponent("Level2Player").isTaking = false;
		var move = cc.moveTo(1, this.mapTiles[index].position);
		if (tmp.getComponent(cc.Sprite).spriteFrame == this.mapTiles[index].getComponent(cc.Sprite).spriteFrame) {
			this.onSelect = -1;
			this.mapTiles[index].off(cc.Node.EventType.MOUSE_ENTER, this.onEnter, this.mapTiles[index]);
			this.mapTiles[index].off(cc.Node.EventType.MOUSE_LEAVE, this.onLeave, this.mapTiles[index]);
			var callback = cc.callFunc(function () {
					this.mapTiles[index].color = new cc.Color(255,255,255);
					this.gainScore();
					tmp.destroy();
				}, self);

		} else {
			var callback = cc.callFunc(function () {
					this.loseScore();
					tmp.destroy();
				}, self);
		}
		tmp.runAction(cc.sequence(move, callback));
	},
	replay:function(){
		cc.director.loadScene("level2");
	},
	tankBattle:function(){
		cc.director.loadScene("Tankbattle");
	},
	nextLevel:function(){
		introduction.myState=introduction.STATE.level3_1;
		cc.director.loadScene("Introduction");
	},
});
