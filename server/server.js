var WEAPONS = ['icon-x', 'icon-o'];
var BOARD = [[],[],[]];

Game = new Meteor.Stream('game');

Game.permissions.write(function() { return true; });
Game.permissions.read(function() { return true; });

Game.on('initialize', function(username) {
	var limit = WEAPONS.length; 
	if(limit) {
		var turn = (limit % 2 == 0) ? true : false;
		var weapon = WEAPONS.pop();
		console.log("%s has started the game!", username);
		Game.emit('start', true, turn, weapon);
	} else {
		console.log("%s you can't start on this game!", username);
		Game.emit('start', false);
	}
});

Game.on('shoot', function(weapon, row, col) {
	console.log("Weapon: %s | Row: %s | Col: %s", weapon, row, col);
	Game.emit('update', weapon, row, col);
});