/**
 * Blue Emoji
 */
ig.module(
	'game.entities.emoji_004'
).requires(
	'game.entities.emoji'
).defines(function(){
	Emoji_004 = Emoji.extend({
		emojiType: 4,
		animSheet: new ig.AnimationSheet( 'media/emoji_004.png', 115, 115 ),
	});
});