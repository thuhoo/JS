class story3Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'story3Scene' });
    }


    preload() {
        this.load.image('story3','assets/story3Scene.png');

        this.load.audio('win', 'assets/win.mp3');

        // this.load.audio('won', 'assets/won.mp3');

    }

    create () {



        this.win = this.sound.add('win');

        this.win.play();

        // this.won = this.sound.add('won');

        // this.won.play();

        this.add.image(0, 0, 'story3').setOrigin(0, 0);

        console.log("This is story3Scene");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1");
        this.scene.stop("story3Scene");
        this.win.stop();
        // this.won.stop();
        this.scene.start("level3");
        }, this );

    }

}
