class gamewonScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gamewonScene' });
    }

    preload() {
        this.load.image('gamewon','assets/gamewonScene.png');

        this.load.audio('win', 'assets/win.mp3');

        this.load.audio('won', 'assets/won.mp3');

    }

    create () {

        this.win = this.sound.add('win');

        this.win.play();

        this.won = this.sound.add('won');

        this.won.play();


        this.add.image(0, 0, 'gamewon').setOrigin(0, 0);
        

        console.log("This is gamewonScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var aDown = this.input.keyboard.addKey('A');

        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, reply game");
        this.scene.stop("gamewonScene");
        this.win.stop();
        this.won.stop();
        this.scene.start("mainScene");
        }, this );

        aDown.on('down', function(){
            console.log("A pressed (main menu)");
            this.scene.stop("gamewonScene");
            this.win.stop();
            this.won.stop();
            this.scene.start("mainScene");
            }, this );

    }

}
