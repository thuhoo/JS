class kingScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'kingScene' });
    }

    preload() {
        this.load.image('king','assets/kingScene.png');

        this.load.audio('intro', 'assets/intro.mp3');
    }

    create () {

        this.introSnd = this.sound.add('intro');

        this.introSnd.play(); 


        this.add.image(0, 0, 'king').setOrigin(0, 0);

        // this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is kingScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto story2Scene");
        this.scene.stop("kingScene");
        this.introSnd.pause(); 
        this.scene.start("enemyStoryScene");
        }, this );

    }

}
