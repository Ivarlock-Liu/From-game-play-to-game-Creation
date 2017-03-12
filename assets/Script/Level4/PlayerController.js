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
        speed:0,
        bulletPrefab:{
            default:null,
            type:cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.dir = 0;//o is default, 1 is up, 2 is down, 3 is left, 4 is right
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.myAnimator = this.getComponent(cc.Animation);
        this.idle = this.myAnimator.getAnimationState('robotIdle');
        this.run = this.myAnimator.getAnimationState('robotRun');
        this.shoot = this.myAnimator.getAnimationState('robotShoot');
        
        
        this.idle.speed = 0.5;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.moveUp && this.node.y <= 270)
            this.node.y += this.speed*dt;
        if(this.node.y >= -50 && this.moveDown)
			this.node.y -= this.speed*dt;
		if(this.node.x >= -450 && this.moveLeft)
			this.node.x -= this.speed*dt;
		if(this.node.x <= 440 && this.moveRight)
			this.node.x += this.speed*dt;
    },
    
    spawnNewBullet:function(){
        var newBullet=cc.instantiate(this.bulletPrefab);
        newBullet.setPosition(this.node.position);
        newBullet.getComponent('bulletPrefab').player=this;
        
        this.game.node.addChild(newBullet);
    },
});
