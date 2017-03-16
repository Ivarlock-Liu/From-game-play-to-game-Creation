cc.Class({
    extends: cc.Component,

    properties: {
        speed:0,
        range:0,
    },

    // use this for initialization
    onLoad: function () {
        if(this.player.node.scaleX == -1){
            this.speed *= -1;
            this.node.scaleX *= -1;
        }
        this.distance = 0;
        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = true;
    },
    onCollisionEnter: function (other, self) {
        if(other.tag == 2){
            //this.manager.enabled = false;
            this.node.destroy();
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.distance += Math.floor(Math.abs(this.speed*dt));
        this.node.x = this.node.x + this.speed*dt;
        if(this.distance >= this.range){
            this.node.destroy();
        }
    },
});
