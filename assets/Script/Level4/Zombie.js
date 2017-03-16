cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        this.myAnimator = this.getComponent(cc.Animation);
        this.die = this.myAnimator.getAnimationState('zombieDead');
        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = true;
        if(this.node.position.x > 100){
            this.node.scaleX = -1;
            var move = cc.moveBy(6,cc.p(-1060,0));
        }else{
            var move = cc.moveBy(6,cc.p(1060,0));
        }
        this.node.runAction(move);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    onCollisionEnter: function (other, self) {
        this.manager.enabled = false;
        if(other.tag == 3){
            if(!this.die.isPlaying)
                this.takeDamage();
        }  
    },
    takeDamage:function(){
        this.node.stopAllActions();
        this.myAnimator.play("zombieDead");
    },
    disappear:function(){
        this.node.destroy();
    }
});
