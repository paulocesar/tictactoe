var weapons = ['icon-x', 'icon-o'];
game = new Meteor.Stream('game');

game.on('start', function(username) {
	if(weapons.length) {
		console.log("%s has started the game!", username);
		game.emit('weapon', weapons.pop());
	} else {
		console.log("%s you can't start the game!", username);
	}
});

game.permissions.write(function(eventName) {
  return true;
});

game.permissions.read(function(eventName) {
  return true;
});