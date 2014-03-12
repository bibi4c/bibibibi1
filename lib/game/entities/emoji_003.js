/**
 * Red Emoji
 */
ig.module(
	'game.entities.emoji_003'
).requires(
	'game.entities.emoji'
).defines(function(){
	Emoji_003 = Emoji.extend({
		emojiType: 3,
		animSheet: new ig.AnimationSheet( 'media/emoji_003.png', 115, 115 ),
	});
});