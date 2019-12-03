class controlScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'controlScene' });
    }


    preload() {
        this.load.image('control','assets/controlScene.png');

        this.load.audio('intro', 'assets/intro.mp3');

    }

    create () {

        this.introSnd = this.sound.add('intro');

        this.introSnd.play(); 

        this.add.image(0, 0, 'control').setOrigin(0, 0);


        console.log("This is controlScene");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1");
        this.scene.stop("controlScene");
        this.introSnd.stop(); 
        this.scene.start("darcyScene");
        }, this );

    }

}
