// collect stars, no enemies
class level2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level2' });
        // Put global variable here
        this.starCount = 0;
        this.score = 0
    }
    
    
    
    preload() {
        // map2 made with Tiled in JSON format
        this.load.tilemapTiledJSON('map2', 'assets/level2.json'); 

        this.load.spritesheet('tiles', 'assets/new.png', {frameWidth: 70, frameHeight: 70});
        
        this.load.image('coin', 'assets/coinGold.png');

        this.load.atlas('mermaid', 'assets/mermaid.png', 'assets/mermaid.json');

        this.load.image('element', 'assets/gameelements.png');

        this.load.image('shell', 'assets/lostShell.png');

        this.load.audio('blaster', 'assets/blaster.mp3');
    }
    
    create() {this.coinLayer
    
        this.blasterSnd = this.sound.add('blaster');
    
        // load the map2 
        this.map2 = this.make.tilemap({key: 'map2'});
    

        // tiles for the ground layer
        var groundTiles = this.map2.addTilesetImage('new','tiles');
        // create the ground layer
        this.groundLayer = this.map2.createDynamicLayer('groundLayer',groundTiles, 0, 0);
          
        
         // coin image used as tileset
          var coinTiles = this.map2.addTilesetImage('coinGold','coin');
          // add coins as tiles
          this.coinLayer = this.map2.createDynamicLayer('coinLayer', coinTiles, 0, 0);
    

          // element image used as tileset
         var elementTiles = this.map2.addTilesetImage('gameelements', 'element');
         // add elements as tiles
         this.elementLayer = this.map2.createDynamicLayer('elementLayer', elementTiles, 0, 0);


           // crown image used as tileset
           var shellTiles = this.map2.addTilesetImage('lostShell','shell');
           // add crown as tiles
           this.shellLayer = this.map2.createDynamicLayer('shellLayer', shellTiles, 0, 0);
   

    
        // this.startPoint = this.map2.findObject("objectLayer", obj => obj.name === "startPoint");
        // this.endPoint = this.map2.findObject("objectLayer", obj => obj.name === "endPoint");
   
        // set the boundaries of our game world
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;
    
        // create the player_level2 sprite    
        this.player_level2 = this.physics.add.sprite(200, 200, 'mermaid');
        this.player_level2.setCollideWorldBounds(true); // don't go out of the map2    
        
        // small fix to our player_level2 images, we resize the physics body object slightly
        this.player_level2.body.setSize(this.player_level2.width*.6, this.player_level2.height*.6);

        window.player_level2 = this.player_level2;
    
        this.elementLayer.setTileIndexCallback(1, this.collectCoin2, this);
        // when the player_level2 overlaps with a tile with index 17, collectCoin2 
        // will be called    
        this.physics.add.overlap(this.player_level2, this.coinLayer);
    
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
  this.physics.add.collider(this.groundLayer,this.player_level2);
  this.physics.add.collider(this.groundLayer,this.mummies);
  this.physics.add.collider(this.player_level2,this.mummies);
  // this.physics.add.collider(this.mummies,this.mummies);
  
    
    this.coinLayer.setTileIndexCallback(10, this.collectCoin2, this);
    this.physics.add.overlap(this.player_level2, this.coinLayer);
    
    this.elementLayer.setTileIndexCallback(1, this.hitElement2, this);
    this.physics.add.overlap(this.player_level2,  this.elementLayer);
    
    this.shellLayer.setTileIndexCallback(417, this.hitshell2, this);
    this.physics.add.overlap(this.player_level2, this.shellLayer);
    

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, this.map2.widthInPixels, this.map2.heightInPixels);
        // make the camera follow the this.player_level2
        this.cameras.main.startFollow(this.player_level2);
    
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
            this.player_level2.body.setVelocityX(-200);
            this.player_level2.anims.play('walk', true); // walk left
            this.player_level2.flipX = true; // flip the sprite to the left
        }
        else if (this.cursors.right.isDown)
        {
            this.player_level2.body.setVelocityX(200);
            this.player_level2.anims.play('walk', true);
            this.player_level2.flipX = false; // use the original sprite looking to the right
        } 
        else if (this.cursors.up.isDown )
        {
            this.player_level2.body.setVelocityY(-100);  
            this.player_level2.anims.play('walk', true);      
        } 
        else if (this.cursors.down.isDown ) 
        {
            this.player_level2.body.setVelocityY(100);  
            this.player_level2.anims.play('walk', true);    
        } 
        else 
        {
            this.player_level2.body.setVelocityX(0);
            this.player_level2.body.setVelocityY(0);
            this.player_level2.anims.play('idle', true);
        }
    }
    
    // this function will be called when the this.player_level2 touches a coin
    collectCoin2(sprite, tile) {
        this.coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
        this.blasterSnd.play();  
        this.score++; // add 10 points to the score
        this.text.setText(this.score); // set the text to show the current score
        return false;
    }
    
    // this function will be called when the this.player_level2 touches a coin
       hitElement2(sprite, tile) {
        this.elementLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin

        this.cameras.main.shake(100);
    
    
        return false;
    }
        hitshell2(sprite, tile) {
            this.scene.stop("level2");
            this.scene.start("level3");


    
    
        return false;
    }

    

}