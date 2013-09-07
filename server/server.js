var WEAPONS = ['icon-x', 'icon-o'];
var BOARD = [[],[],[]];

GameStream = new Meteor.Stream('game');
Users = new Meteor.Collection('users');

Meteor.publish('onlines', function() {
	return Users.find({});
});

GameStream.permissions.write(function() { return true; });
GameStream.permissions.read(function() { return true; });

GameStream.on('initialize', function(username) {
	Users.insert({name: username});
});

GameStream.on('request', function() {
	var limit = WEAPONS.length; 
	if(limit) {
		var turn = (limit % 2 == 0) ? true : false;
		var weapon = WEAPONS.pop();
		console.log("%s has started the game!", username);
		GameStream.emit('start', true, turn, weapon);
	} else {
		console.log("%s you can't start on this game!", username);
		GameStream.emit('start', false);
	}
});

GameStream.on('shoot', function(weapon, row, col) {
	console.log("Weapon: %s | Row: %s | Col: %s", weapon, row, col);
	GameStream.emit('update', weapon, row, col);
});