/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * ui.js
 */

function MenuUI(game)
{
	this.super('div');

	this.game = game;
	this.best_score = new Builder('p')
		.className('uu-best');

	this.className('uu-menu')
		.append(new Builder('h1')
			.text('UU-Matter'))
		.append(this.best_score)
		.append(new Builder('a')
			.className('button')
			.text('Jouer')
			.event('click', function()
			{
				game.new_party();
			}))
		.append(new Builder('p')
			.className('uu-footer')
			.html(game.g.footer_text));
}
MenuUI.prototype.show = function()
{
	this.css('display', 'block');
};
MenuUI.prototype.hide = function()
{
	this.css('display', 'none');
};
MenuUI.prototype.update = function()
{
	if (this.game.party != null && this.game.party.score >= this.game.best_score)
		this.best_score.text('New best score: '+ this.game.party.score);
	else if (this.game.party != null && this.game.party.score > -1)
		this.best_score.text('Score: '+ this.game.party.score +' (Best: '+ this.game.best_score +')');
	else
		this.best_score.text('Best score: '+ this.game.best_score);
};
fus.extend(MenuUI, Builder);

function GameUI(game)
{
	this.super('div');

	this.game = game;
	this.fabricator_timeout = 0;
	this.background = new Background(game)
		.insert(this);
	this.fibre_cable = new Builder('div')
		.className('fibre-cable')
		.insert(this);
	this.game_canvas = new GameCanvas(game)
		.insert(this);
	this.uu_fabricator = new Builder('div')
		.className('uu-fabricator')
		.insert(this);
	this.score_span = new Builder('span')
		.className('uu-counter')
		.insert(this);

	this.className('uu-matter');
	this.background.generate();
}
GameUI.prototype.run_fabricator = function()
{
	var self = this;

	this.uu_fabricator.className('uu-fabricator on');
	this.fibre_cable.className('fibre-cable on');
	clearTimeout(this.fabricator_timeout);
	this.fabricator_timeout = setTimeout(function()
	{
		self.uu_fabricator.className('uu-fabricator');
		self.fibre_cable.className('fibre-cable');
	}, 350);
};
GameUI.prototype.render = function()
{
	this.game_canvas.render();
};
GameUI.prototype.update = function()
{
	this.update_score();
	this.background.render();
};
GameUI.prototype.update_score = function()
{
	this.score_span.text('x '+ this.game.party.score);
};
fus.extend(GameUI, Builder);
