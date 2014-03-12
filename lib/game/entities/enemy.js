/**
 * Arrow entity
 */
ig.module(
	'game.entities.enemy'
).requires(
	'impact.entity'
).defines(
	function() {
		Enemy = ig.Entity.extend({
			zIndex: 1,
			size: {x: 99, y: 96},
			type: ig.Entity.TYPE.NONE, // Player friendly group
		  	checkAgainst: ig.Entity.TYPE.NONE,
		  	collides: ig.Entity.COLLIDES.PASSIVE,
		  	animSheet: new ig.AnimationSheet('media/enemy.png', 99, 96),
			init: function(x, y, settings){
				this.addAnim( 'active', 1, [0, 1] );
		        this.currentAnim = this.anims.active.rewind();
		        this.parent( x, y, settings );
			},
			update: function(){
				this.currentAnim.angle = this.angle;
				this.parent();
			}
		});
	}
);