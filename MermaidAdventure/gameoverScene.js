class gameoverScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameoverScene' });
    }

    preload() {
        this.load.image('gameover','assets/gameoverScene.png');

        this.load.audio('lose', 'assets/lose.mp3');

       

    }

    create () {


        this.lose = this.sound.add('lose');

        this.lose.play();
        
        this.add.image(0, 0, 'gameover').setOrigin(0, 0);
        

        console.log("This is gameoverScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var aDown = this.input.keyboard.addKey('A');

        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, reply game");
        this.scene.stop("gameoverScene");
        this.scene.start("level1");
        }, this );

        aDown.on('down', function(){
            console.log("A pressed (main menu)");
            this.scene.stop("gameoverScene");
            this.lose.stop();
            this.scene.start("mainScene");
            }, this );

    }

}
