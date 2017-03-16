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
        speed: 300,
        health: 70,
        bulletPrefab:{
            default:null,
            type:cc.Prefab
        },
        hpBg: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.setInputControl();
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.attack = false;

        this.myAnimator = this.getComponent(cc.Animation);
        let idle = this.myAnimator.getAnimationState('robotIdle');
        let run = this.myAnimator.getAnimationState('robotRun');
        let shoot = this.myAnimator.getAnimationState('robotShoot');
        let hurt = this.myAnimator.getAnimationState('robotHurt');
        shoot.speed = 1;
        idle.speed = 0.5;
        hurt.speed = 0.3;

        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = true;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.node.y <= 270 && this.moveUp)
            this.node.y += this.speed * dt;
        if(this.node.y >= -50 && this.moveDown)
			this.node.y -= this.speed * dt;
		if(this.node.x >= -450 && this.moveLeft)
			this.node.x -= this.speed * dt;
		if(this.node.x <= 440 && this.moveRight)
			this.node.x += this.speed * dt;
    },
    onCollisionEnter: function (other, self) {
        if(other.tag == 2){
            this.takeDamage();
        }
    },
    spawnNewBullet:function(){
        var newBullet=cc.instantiate(this.bulletPrefab);
        newBullet.setPosition(this.node.position);
        newBullet.getComponent('bulletPrefab').player=this;
        
        this.game.node.addChild(newBullet);
    },

    takeDamage:function(){
        this.health -= 10;
        this.hpBg.width -= 10;
        this.manager.enabled = false;
        if(this.health > 0){
            cc.eventManager.pauseTarget(this.node);
            this.stopMove();
            this.myAnimator.play("robotHurt");
        }
        else{
            cc.eventManager.pauseTarget(this.node);
            this.game.unschedule(this.game.updateTime);
            this.game.zombieContainer.active = false;
            this.stopMove();
            this.myAnimator.play("robotDead");
            cc.log("you dead!");
        }
    },
    resumeListener:function(){
        this.manager.enabled = true;
        this.myAnimator.play("robotIdle");
        cc.eventManager.resumeTarget(this.node);
    },
    stopMove:function(){
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.attack = false;
    },
    setInputControl: function () {
		var self = this;
		var onKeyPressed = function (keyCode, event) {
			switch (keyCode) {
			    case self.game.myUp:
                    self.moveUp = true;
                    if(self.attack != true)
                        self.myAnimator.play("robotRun");
				    break;
			    case self.game.myDown:
			        self.moveDown = true;
                    if(self.attack != true)
                        self.myAnimator.play("robotRun");
				    break;
				case self.game.myLeft:
				    self.moveLeft = true;
                    self.node.scaleX = -1;
                    if(self.attack != true)
                        self.myAnimator.play("robotRun");
				    break;
				case self.game.myRight:
			        self.moveRight = true;
                    self.node.scaleX = 1;
                    if(self.attack != true)
                        self.myAnimator.play("robotRun");
				    break;
				case self.game.myAttack:
                    self.attack = true;
                    self.myAnimator.play("robotShoot");
				    break;
			}
		};
		var onKeyReleased = function (keyCode, event) {
			switch (keyCode) {
			    case self.game.myUp:
                    self.moveUp = false;
                    break;
			    case self.game.myDown:
			        self.moveDown = false;
                    break;
				case self.game.myLeft:
				    self.moveLeft = false;
                    break;
				case self.game.myRight:
			        self.moveRight = false;
                    break;
				case self.game.myAttack:
                    self.attack = false;
                    self.myAnimator.stop("robotShoot");
				    break;
			}
			if(!self.moveUp && !self.moveDown && !self.moveLeft && !self.moveRight && !self.attack){
                self.myAnimator.play("robotIdle");			    
			}
		};
		    
	    cc.eventManager.addListener({
		    event: cc.EventListener.KEYBOARD,
		    onKeyPressed,
		    onKeyReleased,
		}, self.node);
		
	},
});
