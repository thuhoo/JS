class main2Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'main2Scene' });
    }


    preload() {
        this.load.image('main2','assets/main2Scene.png');

        this.load.audio('intro', 'assets/intro.mp3');

    }

    create () {


        this.introSnd = this.sound.add('intro');

        this.introSnd.play(); 

        this.add.image(0, 0, 'main2').setOrigin(0, 0);


        console.log("This is main2Scene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto main2Scene");
        this.scene.stop("main2Scene");
        this.introSnd.pause();
        this.scene.start("storyScene");
        }, this );

    }

}
