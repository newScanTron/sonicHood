namespace playerSpace {
   export class player {
      playerSprite: Phaser.Sprite;
      game: Phaser.Game;
      constructor(playerSprite: Phaser.Sprite, game: Phaser.Game, )
      {
         this.playerSprite = playerSprite;
         this.game = game;
      }

      addPlayer(startX: number, firstTime: boolean){

         this.playerSprite = this.game.add.sprite(startX, this.game.world.height - 450, 'dude1');
         this.game.physics.arcade.enable(this.playerSprite);
         this.playerSprite.body.bounce.y = 0.75;
         this.playerSprite.body.gravity.y = 500;
         this.playerSprite.body.mass = 100;
         this.playerSprite.animations.add('right', [0, 1, 2, 3, 5, 6], 5, true);
         if (firstTime == false)
         {
            this.playerSprite.animations.play('right');
         }
         return this.playerSprite;
      }

   }
}
