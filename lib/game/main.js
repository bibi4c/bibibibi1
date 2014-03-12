ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'plugins.game_utilities',
	'plugins.entity_utilities',
	'game.entities.emoji_002',
	'game.entities.emoji_003',
	'game.entities.emoji_004',
	'game.entities.emoji_005',
	'game.entities.emoji_033',
	'game.entities.staticBg',
	'game.entities.arrow',
	'game.entities.pause',
	'game.entities.playerHP',
	'game.entities.enemy',
	'game.entities.enemyHP',
	'game.entities.cat'
)
.defines(function(){

GamePlay = ig.Game.extend({
	
  	// Load a font
  	font: new ig.Font( 'media/04b03.font.png' ),
  	
  	colNumb: 6,
  	rowNumb: 7,
  	marginLeft: 50,
  	marginTop: 240,
  	marginBottom: 20,
  	cellPadding: 5,
	emojiSize: 80,
	emojiList: [Emoji_002, Emoji_003, Emoji_004, Emoji_005, Emoji_033],
	
	playerHP: 100,
	enemyHP: 100,
	countDown: 3,
	
	startTouch: false,
	endTouch: false,
	movingEntities: 0,
	currentEmojiType: 0,
	selectedEmoji: [],
	lastPosition: {col: -1, row: -1},
	nearSelected: [],
	availableEmoji: [],
	emojiMap:[],

  	init : function() {
		// Initialize your game here; bind keys etc.
		ig.input.initMouse();
		ig.input.bind(ig.KEY.MOUSE1, 'lbtn');
		this.spawnEntity(StaticBg, 0, 0, {imgPath: 'media/BG_light.png', imgWidth: 605, imgHeight: 850});
		this.spawnEntity(StaticBg, this.marginLeft - 30, this.marginTop - 160, {imgPath: 'media/BG_islandonly.png', imgWidth: 280, imgHeight: 123});
		this.spawnEntity(StaticBg, this.marginLeft + 155, this.marginTop - 105, {imgPath: 'media/bom_chain.png', imgWidth: 106, imgHeight: 47});
		this.spawnEntity(StaticBg, this.marginLeft - 30, this.marginTop - 42, {imgPath: 'media/grid_bg.png', imgWidth: 565, imgHeight: 652});
		this.spawnEntity(StaticBg, this.marginLeft - 30, this.marginTop - 50, {imgPath: 'media/HP_back.png', imgWidth: 565, imgHeight: 49});
		this.spawnEntity(Pause, this.marginLeft, this.marginTop - 40);
		this.spawnEntity(StaticBg, this.marginLeft + 40, this.marginTop - 40, {imgPath: 'media/hp_text.png', imgWidth: 47, imgHeight: 25});
		this.spawnEntity(StaticBg, this.marginLeft + 90, this.marginTop - 40, {imgPath: 'media/playerHealthEmpty.png', imgWidth: 377, imgHeight: 25});
		this.spawnEntity(PlayerHP, this.marginLeft + 90, this.marginTop - 40);
		this.spawnEntity(StaticBg, this.marginLeft + 185, 0, {imgPath: 'media/enemy_type.png', imgWidth: 200, imgHeight: 85});
		this.spawnEntity(StaticBg, this.marginLeft + 382, 10, {imgPath: 'media/countdown_panel.png', imgWidth: 70, imgHeight: 69});
		// spawn enemy
		for(var i = 0; i < 4; i++) {
			this.spawnEntity(Enemy, this.marginLeft + 220 + 43 * i, this.marginTop - 158);
		}
		this.spawnEntity(StaticBg, this.marginLeft + 220, this.marginTop - 72, {imgPath: 'media/enemyHealthFrame.png', imgWidth: 208, imgHeight: 20});
		this.spawnEntity(EnemyHP, this.marginLeft + 224, this.marginTop - 70);
		// spawn emoji
		for(var i = 0; i < this.colNumb; i++) {
			this.emojiMap[i] = [];
			for(var j = 0; j < this.rowNumb; j++) {
				emjPos = Math.floor(Math.random() * 5);
				this.spawnEntity(this.emojiList[emjPos], this.marginLeft + (this.emojiSize + this.cellPadding) * i, this.marginTop + (this.emojiSize + this.cellPadding) * (this.rowNumb - j - 1), {emjPos:{col:i, row:j}});
				tmpList = this.getEntitiesByType(this.emojiList[emjPos]);
				this.emojiMap[i][j] = tmpList[tmpList.length - 1];
				this.emojiMap[i][j].newY = this.marginTop + (this.emojiSize + this.cellPadding) * (this.rowNumb - j - 1);
			}
		}
	},
	
	/**
	 * get emoji tree from position
	 */
	getAvailableEmoji: function(pos){
		emojiType = this.currentEmojiType;
		if(this.availableEmoji.indexOf(pos) == -1) {
			this.availableEmoji.push(pos);
			this.emojiMap[pos.col][pos.row].currentAnim = this.emojiMap[pos.col][pos.row].anims.available.rewind();
			for(var i=-1;i<=1;i++) {
				for(var j=-1;j<=1;j++) {
					if(i != 0 || j != 0) {
						col = pos.col + i;
						row = pos.row + j;
						if(col >= 0 && col < this.colNumb && row >= 0 && row < this.rowNumb) {
							currentPos = this.emojiMap[col][row].emjPos;
							if(this.emojiMap[col][row].emojiType == emojiType) this.getAvailableEmoji(currentPos);
						}
					}
				}
			}
		}
	},
	
	/**
	 * push emoji with same type near position to list
	 */
	pushNearEmoji: function(pos) {
		emojiType = this.currentEmojiType;
		for(var i = -1; i <= 1; i++) {
			for(var j = -1; j <= 1; j++) {
				if(i != 0 || j != 0) {
					col = pos.col + i;
					row = pos.row + j;
					if(col >= 0 && col < this.colNumb && row >= 0 && row < this.rowNumb) {
						currentPos = this.emojiMap[col][row].emjPos;
						if(this.emojiMap[col][row].emojiType == emojiType && this.nearSelected.indexOf(currentPos) == -1) {
							this.nearSelected.push(currentPos);
						}
					}
				}
			}
		}
	},
	
	/**
	 * draw arrow
	 */
	drawArrow: function(fromPos, toPos) {
		x = (this.emojiMap[fromPos.col][fromPos.row].pos.x + this.emojiMap[toPos.col][toPos.row].pos.x) / 2 + (this.emojiSize - Arrow.prototype.size.x + this.cellPadding) / 2;
		y = (this.emojiMap[fromPos.col][fromPos.row].pos.y + this.emojiMap[toPos.col][toPos.row].pos.y) / 2 + (this.emojiSize - Arrow.prototype.size.y + this.cellPadding) / 2;
		angle = this.emojiMap[fromPos.col][fromPos.row].angleTo(this.emojiMap[toPos.col][toPos.row]);
		this.spawnEntity(Arrow, x, y, {angle: angle});
	},
	
	/**
	 * add current position to selected tree
	 */
	connectPosition: function(pos) {
		emojiType = this.currentEmojiType;
		if(Math.abs(this.lastPosition.col - pos.col) <= 1 && Math.abs(this.lastPosition.row - pos.row) <= 1) {
			this.drawArrow(this.lastPosition, pos);
		} else {
			finish = false;
			for(var i = -1; i <= 1 && !finish; i++) {
				for(var j = -1; j <= 1 && !finish; j++) {
					if(i != 0 || j != 0) {
						col = pos.col + i;
						row = pos.row + j;
						if(col >= 0 && col < this.colNumb && row >= 0 && row < this.rowNumb) {
							currentPos = this.emojiMap[col][row].emjPos;
							if(this.selectedEmoji.indexOf(currentPos) != -1) {
								this.drawArrow(currentPos, pos);
								finish = true;
							}
						}
					}
				}
			}
		}
	},
	
	/**
	 * remove arrow
	 */
	removeArrow: function() {
		listArrow = this.getEntitiesByType(Arrow);
		for(var i = 0; i < listArrow.length; i++) {
			listArrow[i].kill();
		}
	},
	
	/**
	 * push emoji to selected list
	 */
	selectEmoji: function(pos) {
		if(this.selectedEmoji.length == 0) {
			this.selectedEmoji.push(pos);
			this.emojiMap[pos.col][pos.row].currentAnim = this.emojiMap[pos.col][pos.row].anims.select.rewind();
			this.lastPosition = pos;
			this.pushNearEmoji(pos);
		} else if(this.nearSelected.indexOf(pos) != -1) {
			if(this.selectedEmoji.indexOf(pos) == -1) {
				this.selectedEmoji.push(pos);
				this.connectPosition(pos);
				this.emojiMap[pos.col][pos.row].currentAnim = this.emojiMap[pos.col][pos.row].anims.select.rewind();
				this.pushNearEmoji(pos);
			}
			this.lastPosition = pos;
		}
	},
	
	/**
	 * remove emoji out of game
	 */
	removeEmoji: function(pos) {
		this.emojiMap[pos.col][pos.row].kill();
	},
	
	/**
	 * random emoji to fill grid
	 */
	fillGrid: function() {
		for(var i = 0; i < this.colNumb; i++) {
			j = 0;
			while(this.emojiMap[i][j] !== undefined) {
				if(this.emojiMap[i][j]._killed) {
					this.emojiMap[i].erase(this.emojiMap[i][j]);
				} else {
					this.emojiMap[i][j].emjPos.row = j;
					this.emojiMap[i][j].currentAnim = this.emojiMap[i][j].anims.idle.rewind();
					this.emojiMap[i][j].newY = this.marginTop + (this.emojiSize + this.cellPadding) * (this.rowNumb - j - 1);
					j++;
				}
			}
			newRow = 1;
			for(var j = this.emojiMap[i].length; j < this.rowNumb; j++) {
				emjPos = Math.floor(Math.random() * 5);
				this.spawnEntity(this.emojiList[emjPos], this.marginLeft + (this.emojiSize + this.cellPadding) * i, this.marginTop - (this.emojiSize + this.cellPadding) * newRow, {emjPos:{col:i, row:j}});
				newRow++;
				tmpList = this.getEntitiesByType(this.emojiList[emjPos]);
				this.emojiMap[i][j] = tmpList[tmpList.length - 1];
				this.emojiMap[i][j].newY = this.marginTop + (this.emojiSize + this.cellPadding) * (this.rowNumb - j - 1);
			}
		}
	},
	
  	update: function() {
  		this.sortEntities();
  		if(this.pause) {
  			this.parent();
  			return;
  		}
  		// Update all entities and backgroundMaps
  		if(this.endTouch) {
  			if(this.selectedEmoji.length > 1) {
  				for(var i=0;i<this.selectedEmoji.length;i++) {
  					this.removeEmoji(this.selectedEmoji[i]);
  				}
  				if(this.countDown == 1) {
  					this.countDown = 3;
  				} else {
  					this.countDown--;
  				}
  			}
  			this.currentEmojiType = 0;
  			this.availableEmoji = [];
  			this.selectedEmoji = [];
  			this.lastPosition = {col: -1, row: -1};
  			this.nearSelected = [];
  			this.fillGrid();
  			this.removeArrow();
  			this.endTouch = false;
  		}
  		this.parent();
  		// Add your own, additional update code here
  	}
  });

SplashLoading = ig.Game.extend({
	init : function() {
		// Initialize your game here; bind keys etc.
		this.spawnEntity( EntityCat, 300, 300 );
		
	},
	draw: function() {
		// draw background
		bgImg = new ig.Image('media/grid_bg.png');
		bgImg.draw(0, -9);
		this.drawEntities();
  	}
});

fps = 60;
myGame = GamePlay.prototype;
width = myGame.marginLeft * 2 + (myGame.emojiSize + myGame.cellPadding) * myGame.colNumb - myGame.cellPadding;
height = myGame.marginTop + myGame.marginBottom + (myGame.emojiSize + myGame.cellPadding) * myGame.rowNumb - myGame.cellPadding;
scale = 1;
ig.main( '#canvas', GamePlay, fps, width, height, scale );

});