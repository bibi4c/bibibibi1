/**
 * Emoji class
 */
ig.module(
	'game.entities.emoji'
).requires(
	'impact.entity'
).defines(function(){
	Emoji = ig.Entity.extend({
		size: {x: 80, y: 80},
		offset: {x: 17, y: 17},
		type: ig.Entity.TYPE.NONE,
	  	checkAgainst: ig.Entity.TYPE.NONE,
	  	collides: ig.Entity.COLLIDES.PASSIVE,
	  	maxVel: {x: 0, y: 600},
		dropSpeed: 10000,
		moving: false,
	  	
	  	init: function( x, y, settings ) {
	        this.addAnim( 'idle', 10, [0] );
	        this.addAnim( 'available', 10, [1] );
	        this.addAnim( 'select', 0.015, [2,3,4,5,6,7,8,9,8,7,6,5,4,3,2], true );
	        this.currentAnim = this.anims.idle.rewind();
	        this.parent( x, y, settings );
	    },

	  	update: function(){
	  		if(ig.game.pause) {
	  			this.parent();
	  			return;
	  		}
	  		if(ig.input.pressed("lbtn") && ig.game.movingEntities == 0) {
	  			ig.game.startTouch = true;
	  		}
	  		if(ig.game.startTouch) {
		    	if(ig.input.state('lbtn')) {
		    		if(this.isMouseInside()) {
		    			if(ig.game.currentEmojiType != 0) {
		    				if(ig.game.currentEmojiType == this.emojiType) {
	    						ig.game.selectEmoji(this.emjPos);
		    				}
		    			} else {
		    				ig.game.currentEmojiType = this.emojiType;
		    				ig.game.getAvailableEmoji(this.emjPos);
		    			}
		    		}
		    	} else {
	    			ig.game.startTouch = false;
	    			ig.game.endTouch = true;
		    	}
	  		}
	    	if(this.newY != this.pos.y) {
	    		if(!this.moving) ig.game.movingEntities++;
		    	if(this.newY > this.pos.y) {
		    		this.vel.y = this.dropSpeed;
		    		this.moving = true;
		    	} else {
		    		this.vel.y = 0;
		    		this.pos.y = this.newY;
		    		if(this.moving) {
		    			this.moving = false;
		    			ig.game.movingEntities--;
		    		}
		    	}
	    	}
	    	this.parent(); 
	    }
	});
});