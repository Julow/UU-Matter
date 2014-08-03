/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * background.js
 */

function Background(game)
{
	this.super(game);

	this.blocks = [];

	var self = this;

	this.game.g.background_image.on_load = function()
	{
		self.render();
	};
}
Background.prototype.render = function()
{
	if (!this.game.g.background_image.is_load)
		return;
	this.clear();
	for (var y = 0, s = this.game.g.blocks_size,
		nether = (this.game.party != null)? this.game.party.life / this.game.party.max_life * this.blocks.length : 0
		; y < this.blocks.length; ++y)
	{
		for (var x = 0; x < this.blocks[y].length; ++x)
		{
			if (this.game.party != null && this.game.party.score > -1 && (y + 1 - nether) > Math.random())
				this.context.drawImage(this.game.g.background_image.image, 0, 0, s, s, x * s, y * s, s, s);
			else
				this.context.drawImage(this.game.g.background_image.image, this.blocks[y][x] * s, 0, s, s, x * s, y * s, s, s);
		}
	}
};
Background.prototype.generate = function()
{
	for (var y = 0, line, w = this.width / this.game.g.blocks_size,
		h = this.height / this.game.g.blocks_size; y < h; ++y)
	{
		line = [];
		for (var x = 0, rand; x < w; ++x)
		{
			rand = Math.random();
			for (var i = 0, b; i < this.game.g.rare_blocks.length; ++i)
			{
				b = this.game.g.rare_blocks[i];
				if (rand < b['chance'] && y >= b['min'] && y <= b['max'])
					line[x] = b['id'];
			}
			if (!line[x])
				line[x] = 1;
		}
		this.blocks[y] = line;
	}
	this.render();
};
fus.extend(Background, Canvas);
