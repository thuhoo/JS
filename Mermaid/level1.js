// collect stars, no enemies
class level1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level1' });
        // Put global variable here
        this.starCount = 0;
        this.score = 0
    }
    
    
    
    preload() {
        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('map', 'assets/level1.json'); 

        this.load.spritesheet('tiles', 'assets/new.png', {frameWidth: 70, frameHeight: 70});
        
        this.load.image('coin', 'assets/coinGold.png');

        this.load.atlas('mermaid', 'assets/mermaid.png', 'assets/mermaid.json');

        this.load.image('element', 'assets/gameelements.png');

        this.load.image('crown', 'assets/crown.png');
       
        this.load.audio('blaster', 'assets/blaster.mp3');
    }
    
    create() {this.coinLayer
    
        this.blasterSnd = this.sound.add('blaster');
    
        // load the map 
        this.map = this.make.tilemap({key: 'map'});
    
        // tiles for the ground layer
        var groundTiles = this.map.addTilesetImage('new','tiles');
        // create the ground layer
        this.groundLayer = this.map.createDynamicLayer('groundLayer',groundTiles, 0, 0);
          
        
            
         // coin image used as tileset
          var coinTiles = this.map.addTilesetImage('coinGold','coin');
          // add coins as tiles
          this.coinLayer = this.map.createDynamicLayer('coinLayer', coinTiles, 0, 0);
    

          // element image used as tileset
         var elementTiles = this.map.addTilesetImage('gameelements', 'element');
         // add elements as tiles
         this.elementLayer = this.map.createDynamicLayer('elementLayer', elementTiles, 0, 0);


         // crown image used as tileset
         var crownTiles = this.map.addTilesetImage('crown','crown');
         // add crown as tiles
         this.crownLayer = this.map.createDynamicLayer('crownLayer', crownTiles, 0, 0);

   
        // set the boundaries of our game world
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;
    
        // create the player sprite    
        this.player = this.physics.add.sprite(200, 200, 'mermaid');
        this.player.setCollideWorldBounds(true); // don't go out of the map    
        
        // small fix to our player images, we resize the physics body object slightly
        this.player.body.setSize(this.player.width*.6, this.player.height*.6);

        window.player = this.player;
    
        this.elementLayer.setTileIndexCallback(17, this.collectCoin, this);
        // when the player overlaps with a tile with index 17, collectCoin 
        // will be called    
        this.physics.add.overlap(this.player, this.coinLayer);
    
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
    
    //this.player will collide with the level tiles
    this.physics.add.collider(this.groundLayer,this.player);
    this.physics.add.collider(this.groundLayer,this.mummies);
    this.physics.add.collider(this.player,this.mummies);
    // this.physics.add.collider(this.mummies,this.mummies);
    
    this.coinLayer.setTileIndexCallback(416, this.collectCoin, this);
    this.physics.add.overlap(this.player, this.coinLayer);
    
    this.elementLayer.setTileIndexCallback(3, this.hitElement, this);
    this.physics.add.overlap(this.player,  this.elementLayerr);
    
    this.crownLayer.setTileIndexCallback(417, this.hitcrown, this);
    this.physics.add.overlap(this.player, this.crownLayer);
    

    
    
    
        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        // make the camera follow the this.player
        this.cameras.main.startFollow(this.player);
    
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
            this.player.body.setVelocityX(-200);
            this.player.anims.play('walk', true); // walk left
            this.player.flipX = true; // flip the sprite to the left
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(200);
            this.player.anims.play('walk', true);
            this.player.flipX = false; // use the original sprite looking to the right
        } 
        else if (this.cursors.up.isDown )
        {
            this.player.body.setVelocityY(-100);  
            this.player.anims.play('walk', true);      
        } 
        else if (this.cursors.down.isDown ) 
        {
            this.player.body.setVelocityY(100);  
            this.player.anims.play('walk', true);    
        } 
        else 
        {
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
            this.player.anims.play('idle', true);
        }
    }
    
    // this function will be called when the this.player touches a coin
    collectCoin(sprite, tile) {
        this.coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
        this.blasterSnd.play();  
        this.score++; // add 10 points to the score
        this.text.setText(this.score); // set the text to show the current score
        return false;
    }
    
    // this function will be called when the this.player touches a coin
       hitElement(sprite, tile) {
        this.elementLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin

        this.cameras.main.shake(100);
    
    
        return false;
    }
        hitcrown(sprite, tile) {
            this.scene.stop("level1");
            this.scene.start("level2");


    
    
        return false;
    }

    

}