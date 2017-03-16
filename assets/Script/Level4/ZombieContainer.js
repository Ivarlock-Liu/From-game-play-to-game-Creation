cc.Class({
    extends: cc.Component,

    properties: {
        zombie: cc.Prefab,
        spawnDuration: 3,  
    },

    // use this for initialization
    onLoad: function () {
        this.winSize = cc.winSize;
        this.spawnZombie();
    },

    spawnZombie: function(){
        var randomX = Math.random() > 0.5 ? 10 : 950;  
        var randomY = Math.random() * (this.winSize.height - 260) + 260;
        var newZombie = cc.instantiate(this.zombie);
        newZombie.setPosition(randomX,randomY);
        this.node.addChild(newZombie);
        this.schedule(this.spawnZombie,this.spawnDuration);
    },

});
