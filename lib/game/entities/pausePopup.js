/**
 * Arrow entity
 */
ig.module(
	'game.entities.pausePopup'
).requires(
	'impact.entity',
	'game.entities.staticBg'
).defines(
	function() {
		PausePopup = ig.Entity.extend({
			size: {x: 605, y: 850},
			zIndex: 5,
			type: ig.Entity.TYPE.NONE, // Player friendly group
		  	checkAgainst: ig.Entity.TYPE.NONE,
		  	collides: ig.Entity.COLLIDES.PASSIVE,
		  	animSheet: new ig.AnimationSheet('media/overlay.png', 605, 850),
		  	startY: 0,
		  	maxVel: {x: 0, y: 1500},
		  	entitiesPos: [
		  	    {x: 20, y: 140},
		  	    {x: 192, y: 400},
		  	    {x: 192, y: 530}
		  	],
			init: function(x, y, settings){
		        this.parent( x, y, settings );
		        this.vel.y = this.maxVel.y;
		        this.startY = y;
				this.addAnim( 'idle', 10, [0] );
		        this.currentAnim = this.anims.idle.rewind();
		        ig.game.pausePopup = this;
		        ig.game.spawnEntity(StaticBg, x + this.entitiesPos[0].x, y + this.entitiesPos[0].y, {
		        	imgPath: 'media/pause_frame.png',
		        	imgWidth: 565,
		        	imgHeight: 556,
		        	name: 'popup_frame',
		        	zIndex: 10
		        });
		        ig.game.spawnEntity(StaticBg, x + this.entitiesPos[1].x, y + this.entitiesPos[1].y, {
		        	imgPath: 'media/resume_btn.png',
		        	imgWidth: 230,
		        	imgHeight: 85,
		        	name: 'popup_resume',
		        	zIndex: 10,
		        	update: function() {
		        		if(ig.input.pressed("lbtn") && this.isMouseInside()) ig.game.pausePopup.vel.y = -ig.game.pausePopup.maxVel.y;
		        	}
		        });
		        ig.game.spawnEntity(StaticBg, x + this.entitiesPos[2].x, y + this.entitiesPos[2].y, {
		        	imgPath: 'media/quit_btn.png',
		        	imgWidth: 230,
		        	imgHeight: 85,
		        	name: 'popup_quit',
		        	zIndex: 10,
		        	update: function() {
		        		// to do here
		        	}
		        });
			},
			update: function() {
				if(this.vel.y != 0) {
					console.log('moving', this.pos.y, this.vel.y);
					if(this.pos.y >= 0 && this.vel.y > 0) {
						console.log('stop', this.vel.y);
						this.vel.y = 0;
						this.pos.y = 0;
					} else if(this.pos.y <= this.startY && this.vel.y < 0) {
						console.log('kill', this.vel.y);
						ig.game.pause = false;
						this.kill();
						ig.game.getEntityByName('popup_frame').kill();
						ig.game.getEntityByName('popup_resume').kill();
						ig.game.getEntityByName('popup_quit').kill();
					}
				}
				if(!this._killed) {
					ig.game.getEntityByName('popup_frame').pos.y = this.pos.y + this.entitiesPos[0].y;
					ig.game.getEntityByName('popup_resume').pos.y = this.pos.y + this.entitiesPos[1].y;
					ig.game.getEntityByName('popup_quit').pos.y = this.pos.y + this.entitiesPos[2].y;
				}
				this.parent();
			}
		});
	}
);