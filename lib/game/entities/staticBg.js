/**
 * Arrow entity
 */
ig.module(
	'game.entities.staticBg'
).requires(
	'impact.entity'
).defines(
	function() {
		StaticBg = ig.Entity.extend({
			zIndex: 1,
			type: ig.Entity.TYPE.NONE, // Player friendly group
		  	checkAgainst: ig.Entity.TYPE.NONE,
		  	collides: ig.Entity.COLLIDES.PASSIVE,
			init: function(x, y, settings){
		        this.size = {x: settings.imgWidth, y: settings.imgHeight};
		        this.animSheet = new ig.AnimationSheet(settings.imgPath, settings.imgWidth, settings.imgHeight);
		        delete settings.imgPath;
		        delete settings.imgWidth;
		        delete settings.imgHeight;
		        this.parent( x, y, settings );
				this.addAnim( 'idle', 10, [0] );
		        this.currentAnim = this.anims.idle.rewind();
			}
		});
	}
);