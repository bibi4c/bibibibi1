/**
 * Arrow entity
 */
ig.module(
	'game.entities.arrow'
).requires(
	'impact.entity'
).defines(
	function() {
		Arrow = ig.Entity.extend({
			zIndex: 1,
			angle: 0,
			size: {x: 70, y: 49},
			type: ig.Entity.TYPE.NONE, // Player friendly group
		  	checkAgainst: ig.Entity.TYPE.NONE,
		  	collides: ig.Entity.COLLIDES.PASSIVE,
		  	animSheet: new ig.AnimationSheet('media/arrow.png', 70, 49),
			init: function(x, y, settings){
				this.addAnim( 'idle', 10, [0] );
		        this.currentAnim = this.anims.idle.rewind();
		        this.parent( x, y, settings );
			},
			update: function(){
				this.currentAnim.angle = this.angle;
				this.parent();
			}
		});
	}
);