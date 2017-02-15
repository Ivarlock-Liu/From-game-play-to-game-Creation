cc.Class({
	extends: cc.Component,

	properties: {
		player: {
		default:
			null,
			type: cc.Node
		},
		enemy1: {
		default:
			null,
			type: cc.Node
		},
		enemy2: {
		default:
			null,
			type: cc.Node
		},
		bullet: {
		default:
			null,
			type: cc.Prefab
		},
		
		enemyPrefab:{
			default:null,
			type:cc.Prefab
		},
		gameLabel: {
		default:
			null,
			type: cc.Label
		},
		map: {
		default:
			null,
			type: cc.TiledMap,
		},
		barrierLayer: {
		default:
			null,
			type: cc.TiledLayer,
		},
		metaLayer: {
		default:
			null,
			type: cc.TiledLayer,
		},
		objs: {
		default:
			null,
			type: cc.TiledObjectGroup
		},
	},

	// use this for initialization
	onLoad: function () {
		// this.enemy1 = cc.instantiate(this.enemyPrefab);
		// this.enemy2 = cc.instantiate(this.enemyPrefab);
		this.enemy1.getComponent("AIController").game = this;
		this.enemy2.getComponent("AIController").game = this;
		// this.node.addChild(this.enemy1);
		// this.node.addChild(this.enemy2);
		this.setInputControl();
		this.isShooting = false;
		this.timer = 0;
		this.loadMap();
		this.score = 0;
		this.gameLabel.string += '\n\nScore: ' + this.score.toString();
	},
	loadMap: function () {
		var objects = this.objs.getObjects();
		var playerObj = objects[0];
		var enemy1Obj = objects[1];
		var enemy2Obj = objects[2];

		var playerPos = playerObj.getProperties();
		var enemy1Pos = enemy1Obj.getProperties();
		var enemy2Pos = enemy2Obj.getProperties();
		this.playerTile = this.getTilePos(playerPos);
		this.enemy1Tile = this.getTilePos(enemy1Pos);
		this.enemy2Tile = this.getTilePos(enemy2Pos);

		var pos = this.getCanvasPos(this.playerTile);
		var pos1 = this.getCanvasPos(this.enemy1Tile);
		var pos2 = this.getCanvasPos(this.enemy2Tile);
		this.player.setPosition(pos);
		this.enemy1.setPosition(pos1);
		this.enemy2.setPosition(pos2);
		//cc.log(pos.x + "------   " + pos.y);
	},

	// called every frame, uncomment this function to activate update callback
	update: function (dt) {
		this.timer += dt;
		if (this.isShooting && this.timer >= this.player.getComponent("TankMovementController").shootSpeed) {
			this.spawnNewBullet();
			this.timer = 0;
		}

		if (this.score >= 2) {
			this.gameWin();
		}

		this.collidableCheck(this.player);
		// this.collidableCheck(this.enemy1, "enemy1");
		// this.collidableCheck(this.enemy2, "enemy2");
	},
	collidableCheck: function (node) {
		var playerTilePos1 = this.getTilePosByCanvasPos(cc.p(node.position.x - 19, node.position.y - 19));
		var playerTilePos2 = this.getTilePosByCanvasPos(cc.p(node.position.x + 19, node.position.y - 19));
		var playerTilePos3 = this.getTilePosByCanvasPos(cc.p(node.position.x - 19, node.position.y + 19));
		var playerTilePos4 = this.getTilePosByCanvasPos(cc.p(node.position.x + 19, node.position.y + 19));
		//var playerTilePos = this.getTilePosByCanvasPos(this.player.getPosition());

		switch (node.rotation) {
		case 0:
			var nextPos1 = cc.p(playerTilePos1.x, playerTilePos1.y - 1);
			var nextPos2 = cc.p(playerTilePos2.x, playerTilePos2.y - 1);
			if(node == this.player){
				this.player.getComponent("TankMovementController").canUp = !(this.getTileCollidable(this.metaLayer, nextPos1)
				 || this.getTileCollidable(this.metaLayer, nextPos2));
			}
			if(node == this.enemy1){
				this.enemy1.getComponent("AIController").canUp = !(this.getTileCollidable(this.metaLayer, nextPos1)
				 || this.getTileCollidable(this.metaLayer, nextPos2));
			}
			if(node == this.enemy2){
				this.enemy2.getComponent("AIController").canUp = !(this.getTileCollidable(this.metaLayer, nextPos1)
				 || this.getTileCollidable(this.metaLayer, nextPos2));
			}
			break;
		case 90:
			var nextPos1 = cc.p(playerTilePos1.x + 1, playerTilePos1.y);
			var nextPos3 = cc.p(playerTilePos3.x + 1, playerTilePos3.y);
			if(node == this.player){
				this.player.getComponent("TankMovementController").canRight = !(this.getTileCollidable(this.metaLayer, nextPos1)
				 || this.getTileCollidable(this.metaLayer, nextPos3));
			}
			if(node == this.enemy1){
				this.enemy1.getComponent("AIController").canRight = !(this.getTileCollidable(this.metaLayer, nextPos1)
				 || this.getTileCollidable(this.metaLayer, nextPos3));
			}
			if(node == this.enemy2){
				this.enemy2.getComponent("AIController").canRight = !(this.getTileCollidable(this.metaLayer, nextPos1)
				 || this.getTileCollidable(this.metaLayer, nextPos3));
			}
			break;
		case 180:
			var nextPos3 = cc.p(playerTilePos3.x, playerTilePos3.y + 1);
			var nextPos4 = cc.p(playerTilePos4.x, playerTilePos4.y + 1);
			if(node == this.player){
				this.player.getComponent("TankMovementController").canDown = !(this.getTileCollidable(this.metaLayer, nextPos3)
				 || this.getTileCollidable(this.metaLayer, nextPos4));
			}
			if(node == this.enemy1){
				this.enemy1.getComponent("AIController").canDown = !(this.getTileCollidable(this.metaLayer, nextPos3)
				 || this.getTileCollidable(this.metaLayer, nextPos4));
			}
			if(node == this.enemy2){
				this.enemy2.getComponent("AIController").canDown = !(this.getTileCollidable(this.metaLayer, nextPos3)
				 || this.getTileCollidable(this.metaLayer, nextPos4));
			}
			break;
		case 270:
			var nextPos2 = cc.p(playerTilePos2.x - 1, playerTilePos2.y);
			var nextPos4 = cc.p(playerTilePos4.x - 1, playerTilePos4.y);
			if(node == this.player){
				this.player.getComponent("TankMovementController").canLeft = !(this.getTileCollidable(this.metaLayer, nextPos2)
				 || this.getTileCollidable(this.metaLayer, nextPos4));
			}
			if(node == this.enemy1){
				this.enemy1.getComponent("AIController").canLeft = !(this.getTileCollidable(this.metaLayer, nextPos2)
				 || this.getTileCollidable(this.metaLayer, nextPos4));
				 //cc.log(this.enemy1.getComponent("AIController").canLeft);
			}
			if(node == this.enemy2){
				this.enemy2.getComponent("AIController").canLeft = !(this.getTileCollidable(this.metaLayer, nextPos2)
				 || this.getTileCollidable(this.metaLayer, nextPos4));
			}
			break;
		}

	},
	getTilePos: function (posInPixel) {
		var mapSize = this.node.getContentSize();
		var tileSize = this.map.getTileSize();
		var x = Math.floor(posInPixel.x / tileSize.width);
		var y = Math.floor(posInPixel.y / tileSize.height);
		return cc.p(x, y);
	},
	getTilePosByCanvasPos: function (posInCanvas) {
		var posInPixel = cc.p(posInCanvas.x + 400, 320 - posInCanvas.y);
		return this.getTilePos(posInPixel);
	},
	getCanvasPos: function (posInTile) {
		return cc.p((-380 + posInTile.x * 40), (300 - posInTile.y * 40));
	},
	getNextPos: function (playerTilePos) {
		var nextPos = playerTilePos;
		switch (this.player.rotation) {
		case 0:
			nextPos = cc.p(playerTilePos.x, playerTilePos.y - 1);
			break;
		case 90:
			nextPos = cc.p(playerTilePos.x + 1, playerTilePos.y);
			break;
		case 180:
			nextPos = cc.p(playerTilePos.x, playerTilePos.y + 1);
			break;
		case 270:
			nextPos = cc.p(playerTilePos.x - 1, playerTilePos.y);
			break;
		}
		return nextPos;
	},
	getTileCollidable: function (layer, tile) {
		var prop = this.map.getPropertiesForGID(layer.getTileGIDAt(tile));
		if (prop)
			return prop.collidable;
		else
			return false;
	},
	getTileType: function (layer, tile) {
		if (tile.x <= 19 && tile.x >= 0 && tile.y >= 0 && tile.y <= 15) {
			var prop = this.map.getPropertiesForGID(layer.getTileGIDAt(tile));
			if (prop)
				return prop.type;
			else
				return null;
		}
		return null;
	},
	spawnNewBullet: function () {
		var newBullet = cc.instantiate(this.bullet);
		this.node.addChild(newBullet);
		newBullet.setPosition(this.player.position);
		newBullet.getComponent('Bullet').game = this;
		newBullet.getComponent('Bullet').owner = "player";
		newBullet.rotation = this.player.rotation;
		switch (newBullet.rotation) {
		case 0:
			newBullet.runAction(newBullet.getComponent('Bullet').moveUp);
			break;
		case 90:
			newBullet.runAction(newBullet.getComponent('Bullet').moveRight);
			break;
		case 180:
			newBullet.runAction(newBullet.getComponent('Bullet').moveDown);
			break;
		case 270:
			newBullet.runAction(newBullet.getComponent('Bullet').moveLeft);
			break;
		}

	},
	setInputControl: function () {
		var self = this;
		var onKeyPressed = function (keyCode, event) {
			switch (keyCode) {
			case cc.KEY.space:
				self.isShooting = true;
				break;
			}
		}
		var onKeyReleased = function (keyCode, event) {
			switch (keyCode) {
			case cc.KEY.space:
				self.isShooting = false;
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
	gainScore: function () {
		this.score += 1;
		this.gameLabel.string = 'Welcome to Tank Battle!\n\nScore: ' + this.score.toString();
	},
	gameWin: function () {
		this.gameLabel.string = "Congradulations! you win!";
	},
	gameOver: function () {
		this.gameLabel.string = "Sorry, you lose!";
	},
	playAgain: function () {
		cc.director.loadScene("Tankbattle");
	},
	enterLevel2: function () {
		cc.director.loadScene("level3");
	},
});
