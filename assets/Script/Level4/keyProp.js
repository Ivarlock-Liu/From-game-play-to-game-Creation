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
        //isBinded:false,
        keyValue:0,
        keySprite:{
            default:null,
            type:cc.SpriteFrame
        },
        bindBtn:0,
    },

    // use this for initialization
    onLoad: function () {
        this.keyChar = "";
    },
    
    getKey:function(keyValue){
        var key = "";
        switch(keyValue-65){
            case 0:
                key = "a";
                break;
            case 1:
                key = "b";
                break;
            case 2:
                key = "c";
                break;
            case 3:
                key = "d";
                break;
            case 4:
                key = "e";
                break;
            case 5:
                key = "f";
                break;
            case 6:
                key = "g";
                break;
            case 7:
                key = "h";
                break;
            case 8:
                key = "i";
                break;
            case 9:
                key = "j";
                break;
            case 10:
                key = "k";
                break;
            case 11:
                key = "l";
                break;
            case 12:
                key = "m";
                break;
            case 13:
                key = "n";
                break;
            case 14:
                key = "o";
                break;
            case 15:
                key = "p";
                break;
            case 16:
                key = "q";
                break;
            case 17:
                key = "r";
                break;
            case 18:
                key = "s";
                break;
            case 19:
                key = "t";
                break;
            case 20:
                key = "u";
                break;
            case 21:
                key = "v";
                break;
            case 22:
                key = "w";
                break;
            case 23:
                key = "x";
                break;
            case 24:
                key = "y";
                break;
            case 25:
                key = "z";
                break;
        }
        return ("cc.KEY." + key);
        
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
