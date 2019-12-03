// collect stars, no enemies
class level3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level3' });
        // Put global variable here
        this.life = 3;
        this.score = 0
        this.isDead = false;
    }
    
    
    
    preload() {
        // map3 made with Tiled in JSON format
        this.load.tilemapTiledJSON('map3', 'assets/level3.json'); 

        this.load.image('background', 'assets/background.png');

        this.load.spritesheet('tilex', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
        
        this.load.image('coin', 'assets/coinGold.png');

        this.load.atlas('mermaid', 'assets/mermaid.png', 'assets/mermaid.json');

        this.load.image('element', 'assets/gameelements.png');

        this.load.image('gold', 'assets/gold.png');

        this.load.image('life', 'assets/life.png');

        this.load.audio('blaster', 'assets/blaster.mp3');

        this.load.audio('crash', 'assets/crash.mp3');

        this.load.audio('backgroundMusic3', 'assets/backgroundMusic3.mp3');
    }
    
    create() {this.coinLayer
    
        this.blasterSnd = this.sound.add('blaster');

        this.crashSnd = this.sound.add('crash');

        this.backgroundMusic3Snd = this.sound.add('backgroundMusic3');

        this.backgroundMusic3Snd.play();
    
        // load the map3 
        this.map3 = this.make.tilemap({key: 'map3'});

        // tiles for the background layer
        var backgroundTiles = this.map3.addTilesetImage('background','background');
        // create the ground layer
        this.backgroundLayer = this.map3.createDynamicLayer('backgroundLayer',backgroundTiles, 0, 0);
          

        // tiles for the ground layer
        var groundTiles = this.map3.addTilesetImage('tiles','tilex');
        // create the ground layer
        this.groundLayer = this.map3.createDynamicLayer('groundLayer',groundTiles, 0, 0);
          
        
         // coin image used as tileset
          var coinTiles = this.map3.addTilesetImage('coinGold','coin');
          // add coins as tiles
          this.coinLayer = this.map3.createDynamicLayer('coinLayer', coinTiles, 0, 0);
    

          // element image used as tileset
         var elementTiles = this.map3.addTilesetImage('gameelements', 'element');
         // add elements as tiles
         this.elementLayer = this.map3.createDynamicLayer('elementLayer', elementTiles, 0, 0);


           // crown image used as tileset
           var goldTiles = this.map3.addTilesetImage('gold','gold');
           // add crown as tiles
           this.goldLayer = this.map3.createDynamicLayer('goldLayer', goldTiles, 0, 0);
   


   
        // set the boundaries of our game world
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;
    
        // create the player_level3 sprite    
        this.player_level3 = this.physics.add.sprite(200, 200, 'mermaid');
        this.player_level3.setCollideWorldBounds(true); // don't go out of the map3    
        
        // small fix to our player_level3 images, we resize the physics body object slightly
        this.player_level3.body.setSize(this.player_level3.width*.6, this.player_level3.height*.6);

        window.player_level3 = this.player_level3;
    
        this.elementLayer.setTileIndexCallback(1, this.collectcoin3, this);
        // when the player_level3 overlaps with a tile with index 17, collectcoin3 
        // will be called    
        this.physics.add.overlap(this.player_level3, this.coinLayer);
    
        // idle with only one frame, so repeat is not neaded
        this.anims.create({
            key: 'idle',
            frames: [{key: 'mermaid', frame: 'mermaid_01'}],
            frameRate: 10,
        });
    
        // Walking animation
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('mermaid', {prefix: 'mermaid_', start: 1, end: 4, zeroPad: 2}),
            frameRate: 10,
            repeat: -1
        });
    
        this.cursors = this.input.keyboard.createCursorKeys();
    
        this.anims.create({
            key:'walk2',
            frames:this.anims.generateFrameNumbers('mummy'),
            frameRate:20,
            yoyo:true,
            repeat:-1
         });
    
    
     // create mummies physics group
    this.mummies=this.physics.add.group();
    
    
    // Iterate all the children and play the 'walk' animation
    this.mummies.children.iterate(mummy=> {
        mummy.play('walk2')
    })

    this.groundLayer.setCollisionByProperty({ground: true});
    
    //this.player_level3 will collide with the level tiles
    this.physics.add.collider(this.groundLayer,this.player_level3);
    this.physics.add.collider(this.groundLayer,this.mummies);
    this.physics.add.collider(this.player_level3,this.mummies);
    // this.physics.add.collider(this.mummies,this.mummies);
    
    this.coinLayer.setTileIndexCallback(10, this.collectcoin3, this);
    this.physics.add.overlap(this.player_level3, this.coinLayer);
    
    this.elementLayer.setTileIndexCallback(1, this.hitElement3, this);
    this.physics.add.overlap(this.player_level3,  this.elementLayer);
    
    this.goldLayer.setTileIndexCallback(411, this.hitgold3, this);
    this.physics.add.overlap(this.player_level3, this.goldLayer);
    

    
        // Add life image at the end 
        this.life1 = this.add.image(80,50, 'life').setScrollFactor(0);
        this.life2 = this.add.image(140,50,'life').setScrollFactor(0);
        this.life3 = this.add.image(200,50,'life').setScrollFactor(0);
    

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, this.map3.widthInPixels, this.map3.heightInPixels);
        // make the camera follow the this.player_level3
        this.cameras.main.startFollow(this.player_level3);
    
        // set background color, so the sky is not black    
        this.cameras.main.setBackgroundColor('#ccccff');
    
        // this text will show the score
        this.text = this.add.text(20, 15, '0', {
            fontSize: '20px',
            fill: '#ffffff'
            
        });
        // fix the text to the camera
        this.text.setScrollFactor(0);
    }
    
    update(time, delta) {
    
    // Make mummies walk at speed
    this.mummies.setVelocityX(80);
    
    // Check for end of screen at right , reset to left
    this.mummies.children.iterate(mummy=> {
        if ( mummy.x>this.physics.world.bounds.width+50 ) {
            mummy.x=-10;
          }
        });
    
        if (this.cursors.left.isDown)
        {
            this.player_level3.body.setVelocityX(-200);
            this.player_level3.anims.play('walk', true); // walk left
            this.player_level3.flipX = true; // flip the sprite to the left
        }
        else if (this.cursors.right.isDown)
        {
            this.player_level3.body.setVelocityX(200);
            this.player_level3.anims.play('walk', true);
            this.player_level3.flipX = false; // use the original sprite looking to the right
        } 
        else if (this.cursors.up.isDown )
        {
            this.player_level3.body.setVelocityY(-100);  
            this.player_level3.anims.play('walk', true);      
        } 
        else if (this.cursors.down.isDown ) 
        {
            this.player_level3.body.setVelocityY(100);  
            this.player_level3.anims.play('walk', true);    
        } 
        else 
        {
            this.player_level3.body.setVelocityX(0);
            this.player_level3.body.setVelocityY(0);
            this.player_level3.anims.play('idle', true);
        }
    }
    
    // this function will be called when the this.player_level3 touches a coin
    collectcoin3(sprite, tile) {
        this.coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
        this.blasterSnd.play();  
        this.score++; // add 10 points to the score
        this.text.setText(this.score); // set the text to show the current score
        return false;
    }
    
    // this function will be called when the this.player_level3 touches a coin
       hitElement3(sprite, tile) {
        this.elementLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
        this.crashSnd.play()

        this.cameras.main.shake(100);
        // element.disableBody(true, true);
     this.life -= 1;
     console.log('Hit element, deduct lives, balance is',this.life);
 
     // Default is 3 lives
     if ( this.life === 2) {
         // this.explodeSnd.play();
         this.cameras.main.shake(100);
         this.life3.setVisible(false);
     } else if ( this.life === 1) {
         // this.explodeSnd.play();
         this.cameras.main.shake(100);
         this.life2.setVisible(false);
     } else if ( this.life === 0) {
         // this.explodeSnd.play();
         this.cameras.main.shake(500);
         this.life1.setVisible(false);
         this.isDead = true;
     }

        // No more lives, shake screen and restart the game
 if ( this.isDead ) {
     console.log("Player is dead!!!")
     // delay 1 sec
     this.time.delayedCall(1000,function() {
         // Reset counter before a restart
         this.isDead = false;
         this.life = 3;
         this.scene.stop("level3");
         this.backgroundMusic3Snd.stop();
         this.scene.start("gameoverScene");
     },[], this);
     }
    
    
        return false;
    }
        hitgold3(sprite, tile) {
            this.scene.stop("level3");
            this.backgroundMusic3Snd.stop();
            this.scene.start("gamewonScene");
       

     
    
    
        return false;
    }


    

}