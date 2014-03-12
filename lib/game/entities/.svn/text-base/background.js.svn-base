ig.module(
	'game.entities.background'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntityBackground = ig.Entity.extend({

	size: {x: 640, y: 940},
	title: new ig.Image( 'media/UIAssets/BackGround/iPhone5Splash.png' ),
	type: ig.Entity.TYPE.NONE,
		
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
	draw:function()
	{
	    this.title.draw(0,0);    
	},
	
});
});
