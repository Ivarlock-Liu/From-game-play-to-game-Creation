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
		bullet: {
		default:
			null,
			type: cc.Prefab
		},
		shootSpeed: 0, //how long(s) for 1 shot
		moveSpeed: 0
	},

	// use this for initialization
	onLoad: function () {
		this.canUp = true;
		this.canDown = true;
		this.canLeft = true;
		this.canRight = true;
		this.dir = 0; //1 is up, 2 is down, 3 is left, 4 is right
		this.timer = 0;
		this.moveTimer = 0;
	},

	// called every frame, uncomment this function to activate update callback
	update: function (dt) {
		this.timer += dt;
		this.moveTimer += dt;
        if (this.timer >= this.shootSpeed) {
        	this.spawnNewBullet();
        	this.timer = 0;
        }
		if(this.moveTimer >= 0.3){
			this.dir = Math.floor(cc.random0To1()* 4) + 1;
			this.moveTimer = 0;
		}

		//this.dir=3;
		switch (this.dir) {
			case 1:
				this.node.rotation=0;
                if(this.canUp){
                    this.node.y+=this.moveSpeed*dt;
				}
                break;
            case 2:
				this.node.rotation=180;
                if(this.canDown){
                    this.node.y-=this.moveSpeed*dt;
				}
                break;
            case 3:
				this.node.rotation=270;
                if(this.canLeft){
                    this.node.x-=this.moveSpeed*dt;
				}
                break;
            case 4:
				this.node.rotation=90;
                if(this.canRight){
                    this.node.x+=this.moveSpeed*dt;
				}
                break;
        }
		this.game.collidableCheck(this.node);
	},
	spawnNewBullet: function () {
		var newBullet = cc.instantiate(this.bullet);
		this.game.node.addChild(newBullet);
		newBullet.setPosition(this.node.position);
		newBullet.getComponent('Bullet').game = this.game;
		newBullet.getComponent('Bullet').owner = "enemy";
		newBullet.rotation = this.node.rotation;
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
});
