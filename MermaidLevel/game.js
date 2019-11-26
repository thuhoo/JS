
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000055',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: true
        }
    },
    scene: [mainScene,main2Scene, storyScene, enemyStoryScene, level1, story2Scene, level2, story3Scene, level3, gameoverScene, gamewonScene]


};

let game = new Phaser.Game(config);



