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
        iconPrefab:{
            default:null,
            type:cc.Prefab
        },
        spawnDuration:0
    },

    // use this for initialization
    onLoad: function () {
        this.timer = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.timer+=dt;
        if(this.node.x>=430){
            this.node.scaleX = 1;
            this.speed = -Math.abs(this.speed);
        }
        if(this.node.x<=-430){
            this.node.scaleX = -1;
            this.speed = Math.abs(this.speed);
        }
        this.node.x+=this.speed*dt;
        if(this.timer>=this.spawnDuration){
            this.spawnNewSprite();
            this.timer = 0;
        }
    },
    spawnNewSprite:function(){
        var newIcon=cc.instantiate(this.iconPrefab);
        newIcon.setPosition(this.node.position);
        newIcon.getComponent('iconsPrefab').game=this.game;
        
        this.game.node.addChild(newIcon);
    },
});
