class enemyStoryScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'enemyStoryScene' });
    }


    preload() {
        this.load.image('enemy','assets/enemyStoryScene.png');

        this.load.audio('intro', 'assets/intro.mp3');

    }

    create () {

        this.introSnd = this.sound.add('intro');

        this.introSnd.play(); 

        this.add.image(0, 0, 'enemy').setOrigin(0, 0);


        console.log("This is enemyStoryScene");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1");
        this.scene.stop("enemyStoryScene");
        this.introSnd.stop(); 
        this.scene.start("controlScene");
        }, this );

    }

}
