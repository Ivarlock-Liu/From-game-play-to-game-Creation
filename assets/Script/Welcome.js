cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'From game play\nto game creation',
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
    },

    // called every frame
    update: function (dt) {

    },
    
    startGame: function(){
        cc.director.loadScene('Introduction');    
    },
    
    quit: function(){
        cc.director.end();  
    },
});
