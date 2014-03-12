ig.module(
	'game.entities.cat'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCat = ig.Entity.extend({
	size: {x: 170, y: 170},
	
	animSheet: new ig.AnimationSheet( 'media/UIAssets/Title/cat.png', 170, 170 ),
	secTimer: null,
	cateYe2: new ig.Image('media/UIAssets/Title/cat_eye2.png'),
	catImage: new ig.Image('media/UIAssets/Title/cat.png'),
	cateYe: new ig.Image('media/UIAssets/Title/cat_eye1.png'),
	
	init: function( x, y, settings ) {
		
		this.addAnim( 'idle', 1, [0] );
		this.parent( x, y, settings );
		
	},
	draw:function()
	{
		//draw cat
	    this.catImage.draw(70,210);    
	    //draw open cat eye
	    //this.cateYe.draw(120,840);
	},
	
	update:function(){
	   
	},
});
});
