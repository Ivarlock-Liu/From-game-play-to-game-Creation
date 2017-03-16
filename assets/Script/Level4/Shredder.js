cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    onCollisionEnter: function (other, self) {
        other.node.destroy();
    }
});
