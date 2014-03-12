/**
 * Pause button
 */
ig.module(
	'game.entities.enemyHP'
).requires(
	'impact.entity'
).defines(
	function(){
		EnemyHP = ig.Entity.extend({
			size: {x: 200, y: 14},
			type: ig.Entity.TYPE.NONE, // Player friendly group
		  	checkAgainst: ig.Entity.TYPE.NONE,
		  	collides: ig.Entity.COLLIDES.PASSIVE,
		  	animSheet: new ig.AnimationSheet('media/enemyHealthFull.png', 200, 14),
		  	newWidth: 200,
		  	resizing: false,
		  	deltaX: 1,
			init: function(x, y, settings){
				this.addAnim( 'idle', 10, [0] );
		        this.currentAnim = this.anims.idle.rewind();
		        this.parent( x, y, settings );
		        ig.game.enemy = this;
			},
			update: function() {
				if(ig.game.pause) {
					this.newWidth = this.size.x;
					this.parent();
					return;
				}
				if(this.newWidth >= 0 && this.newWidth <= 200) {
					if(this.newWidth != this.size.x) {
						if(!this.resizing) ig.game.movingEntities++;
						if(this.newWidth < this.size.x) {
							this.size.x -= this.deltaX;
							this.resizing = true;
						}
						if(this.newWidth >= this.size.x) {
							this.size.x = this.newWidth;
							if(this.resizing) {
								this.resizing = false;
								ig.game.movingEntities--;
							}
						}
						this.currentAnim.sheet = new ig.AnimationSheet('media/enemyHealthFull.png', this.size.x, 14);
					}
				} else {
					this.newWidth = this.size.x;
				}
			}
		});
	}
);