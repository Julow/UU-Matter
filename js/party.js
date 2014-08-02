/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * party.js
 */

function Party(game)
{
	this.game = game;

	this.uus = [];
	this.life = game.global.max_life;
	this.score = 0;
	this.to_spawn = 1;
	this.playing = false;
}
Party.prototype.start = function()
{
	this.game.menu_ui.hide();
	this.game.game_ui.update();
	this.playing = true;

	var self = this;

	var last_second = Date.now();

	var loop = function()
	{
		if(self.playing)
		{
			newFrame(loop);

			var now = Date.now();
			var diff = now - last_second;

			if (self.to_spawn >= 1 && diff > (900 / self.to_spawn))
			{
				--self.to_spawn;
				self.spawn_uu();
			}
			if (diff >= 1000)
				lastSecond = now;
			self.update();
		}
	};
	newFrame(loop);
	this.spawn_uu();
};
Party.prototype.stop = function()
{
	this.playing = false;
	if(this.score > this.game.best_score)
		this.game.set_best_score(this.score);
	this.game.menu_ui.update();
	this.game.menu_ui.show();
};
Party.prototype.update = function()
{
	for (var i = 0, uu; i < this.uus.length; ++i)
	{
		uu = this.uus[i];
		if (uu.removed)
		{
			this.uus.splice(i, 1);
			this.to_spawn += 1 / (this.score + 1) + (this.score / 500) + 0.97;
			--i;
		}
		else if (!uu.exploded)
		{
			uu.update();
			if (uu.collide(this.game.global.canvas_size))
			{
				uu.explode();
				this.damage(uu.damage);
			}
		}
	}
	this.game.game_ui.render();
};
Party.prototype.set_score = function(score)
{
	this.score = score;
	this.game.game_ui.update_score();
};
Party.prototype.damage = function(damage)
{
	this.life -= damage;
	if (this.life <= 0)
	{
		this.life = 0;
		this.stop();
	}
	this.game.game_ui.update();
};
Party.prototype.spawn_uu = function()
{
	var uu = (Math.random() <= this.game.global.iridium_chance)? new IridiumEntity(this) : new UUEntity(this);
	var pos = (this.game.global.canvas_size - 32) / 2;

	uu.setPos(pos, pos);
	this.uus.push(uu);
	this.game.game_ui.run_fabricator();
};