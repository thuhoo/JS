class enemyStoryScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'enemyStoryScene' });
    }


    preload() {
        this.load.image('enemy','assets/enemyStoryScene.png');

    }

    create () {

        this.add.image(0, 0, 'enemy').setOrigin(0, 0);

        this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is enemyStoryScene");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1");
        this.scene.stop("enemyStoryScene");
        this.scene.start("level1");
        }, this );

    }

}
