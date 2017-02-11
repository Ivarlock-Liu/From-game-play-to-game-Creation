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
        pickRadius:0,
    },

    // use this for initialization
    onLoad: function () {
        var jumpAction=this.runToFolder();
        this.node.runAction(jumpAction);
        console.log(this.node.position);
        console.log(this.game.folder.position);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
         if(this.getFolderDistance()<this.pickRadius){
            this.onPicked();
            return;
        }
    },
    runToFolder:function(){
        var jump=cc.jumpTo(2,this.game.folder.position,50,4);
        return jump;
    },
    getFolderDistance:function(){
        var folderPos=this.game.folder.getPosition();
        var dist=cc.pDistance(this.node.position,folderPos);
        return dist;
    },
    
    onPicked:function(){
        this.node.destroy();
    }
});
