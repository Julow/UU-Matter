/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * game_canvas.js
 */

function GameCanvas(game)
{
	this.super(game);

	this.texture = {
		0: new ImageLoader(this.game.g.uu_image_src),
		1: new ImageLoader(this.game.g.iridium_image_src)
	};
	this.explosion_sprite = new Sprite(this.game.g.explosion_sprite_src, this.game.g.explosion_sprite_size, this.game.g.explosion_sprite_size, this.game.g.explosion_sprite_length);
	this.anims = [];

	var self = this;

	this.event('click', function(e)
	{
		self.click(e.offsetX, e.offsetY);
	}, false);
}
GameCanvas.prototype.explosion = function(x, y)
{
	this.anims.push(new Animation(this.game.g.explosion_duration, this.explosion_sprite, x, y));
};
GameCanvas.prototype.click = function(x, y)
{
	for (var i = 0, u, s = this.game.g.uu_size; i < this.game.party.uus.length; ++i)
	{
		u = this.game.party.uus[i];
		if (x > u.x && x < (u.x + s)
			&& y > u.y && y < (u.y + s))
		{
			u.click();
			return;
		}
	}
};
GameCanvas.prototype.is_load = function()
{
	return (this.texture[0].is_load && this.texture[0].is_load);
};
GameCanvas.prototype.render = function()
{
	if (!this.is_load())
		return;
	this.clear();
	for (var i = 0; i < this.anims.length; ++i)
	{
		this.anims[i].render(this.context);
		if (this.anims[i].is_finish)
			this.anims.splice(i--, 1);
	}
	for (var i = 0, u, s = this.game.g.uu_size; i < this.game.party.uus.length; ++i)
	{
		u = this.game.party.uus[i];
		this.context.drawImage(this.texture[u.id].image, 0, 0, s, s, u.x, u.y, s, s);
	}
};
fus.extend(GameCanvas, Canvas);
