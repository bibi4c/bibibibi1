/**
 * Heart Emoji
 */
ig.module(
	'game.entities.emoji_033'
).requires(
	'game.entities.emoji'
).defines(function(){
	Emoji_033 = Emoji.extend({
		emojiType: 33,
		animSheet: new ig.AnimationSheet( 'media/emoji_033.png', 115, 115 ),
	});
});