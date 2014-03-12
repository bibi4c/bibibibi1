ig.module(
	'game.entities.sunlight'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntitySunlight = ig.Entity.extend({

	size: {x: 94, y: 94},
	type: ig.Entity.TYPE.NONE,
	animSheet: new ig.AnimationSheet( 'media/UIAssets/BackGround/sun.png', 94, 94 ),
	sun: new ig.Image('media/UIAssets/BackGround/sun2.png'),
	//bounceCounter: 0,
	
	init: function( x, y, settings ) {
		this.addAnim( 'idle', 1, [0] );
		
		this.parent(x, y, settings);
	},
	
	update: function() {
		this.currentAnim.angle += ig.system.tick;
	},
		
});
});
