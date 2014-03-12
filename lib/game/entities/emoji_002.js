/**
 * Green Emoji
 */
ig.module(
	'game.entities.emoji_002'
).requires(
	'game.entities.emoji'
).defines(function(){
	Emoji_002 = Emoji.extend({
		emojiType: 2,
		animSheet: new ig.AnimationSheet( 'media/emoji_002.png', 115, 115 ),
	});
});