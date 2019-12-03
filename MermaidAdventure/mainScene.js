class mainScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'mainScene' });
    }

    preload() {
        this.load.image('main','assets/mainScene.png');

        this.load.audio('intro', 'assets/intro.mp3');

    }

    create () {

        this.introSnd = this.sound.add('intro');

        this.introSnd.play(); 

        this.add.image(0, 0, 'main').setOrigin(0, 0);
        

        console.log("This is mainScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto main2Scene");
        this.scene.stop("mainScene");
        this.scene.start("main2Scene");
        this.introSnd.pause(); 
        }, this );

        var key1 = this.input.keyboard.addKey(49);
        var key2 = this.input.keyboard.addKey(50);
        var key3 = this.input.keyboard.addKey(51);

        key1.on('down', function(){
        this.scene.start("level1");
        }, this );

        key2.on('down', function(){
        this.scene.start("level2");
        }, this );

        key3.on('down', function(){
        this.scene.start("level3");
        }, this );


    }

}
