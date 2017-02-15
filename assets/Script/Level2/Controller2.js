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
        folder:{
            default:null,
            type:cc.Node
        },
        tilesPrefab:{
            default:null,
            type:cc.Prefab,
        },
        dropSpeed:0,
    },

    // use this for initialization
    onLoad: function () {
        this.timer = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.timer += dt;
        if(this.timer >= this.dropSpeed){
             this.spawnNewTile();
             this.timer = 0;
        }
    },
     spawnNewTile:function(){
        var newTile=cc.instantiate(this.tilesPrefab);
        newTile.setPosition(this.folder.position);
        newTile.getComponent('Tiles').game=this;
        this.node.addChild(newTile);
    },
});
