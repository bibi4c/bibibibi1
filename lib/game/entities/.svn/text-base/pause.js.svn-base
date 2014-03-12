/**
 * Pause button
 */
ig.module(
	'game.entities.pause'
).requires(
	'impact.entity',
	'game.entities.pausePopup'
).defines(
	function(){
		Pause = ig.Entity.extend({
			size: {x: 25, y: 25},
			type: ig.Entity.TYPE.NONE, // Player friendly group
		  	checkAgainst: ig.Entity.TYPE.NONE,
		  	collides: ig.Entity.COLLIDES.PASSIVE,
		  	animSheet: new ig.AnimationSheet('media/pause.png', 25, 25),
			init: function(x, y, settings){
				this.addAnim( 'idle', 10, [0] );
		        this.currentAnim = this.anims.idle.rewind();
		        this.parent( x, y, settings );
			},
			update: function(){
				if(ig.input.pressed("lbtn") && this.isMouseInside()) {
					ig.game.spawnEntity(PausePopup, 0, -700);
					ig.game.pause = !ig.game.pause;
				}
			}
		});
	}
);