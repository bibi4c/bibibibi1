/**
 * Pause button
 */
ig.module(
	'game.entities.playerHP'
).requires(
	'impact.entity'
).defines(
	function(){
		PlayerHP = ig.Entity.extend({
			size: {x: 377, y: 25},
			type: ig.Entity.TYPE.NONE,
		  	checkAgainst: ig.Entity.TYPE.NONE,
		  	collides: ig.Entity.COLLIDES.PASSIVE,
		  	newWidth: 377,
		  	animSheet: new ig.AnimationSheet('media/playerHealthFull.png', 377, 25),
		  	resizing: false,
		  	increase: false,
		  	decrease: false,
		  	deltaX: 1,
			init: function(x, y, settings){
				this.addAnim( 'idle', 10, [0] );
		        this.currentAnim = this.anims.idle.rewind();
		        this.parent( x, y, settings );
		        ig.game.player = this;
			},
			update: function() {
				if(ig.game.pause) {
					this.newWidth = this.size.x;
					this.parent();
					return;
				}
				if(this.newWidth >= 0 && this.newWidth <= 377) {
					if(this.newWidth != this.size.x) {
						endResize = false;
						if(!this.increase && !this.decrease) {
							ig.game.movingEntities++;
							if(this.newWidth > this.size.x) {
								this.increase = true;
							} else {
								this.decrease = true;
							}
						}
						if(this.increase) {
							this.size.x += this.deltaX;
							if(this.size.x >= this.newWidth) endResize = true;
						} else if(this.decrease) {
							this.size.x -= this.deltaX;
							if(this.size.x <= this.newWidth) endResize = true;
						}
						if(endResize) {
							this.size.x = this.newWidth;
							ig.game.movingEntities--;
							this.increase = false;
							this.decrease = false;
						}
						this.currentAnim.sheet = new ig.AnimationSheet('media/playerHealthFull.png', this.size.x, 25);
					}
				} else {
					this.newWidth = this.size.x;
				}
			}
		});
	}
);