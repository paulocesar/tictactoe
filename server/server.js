var players = [], i = 1;


Meteor.publish('shoot', function() {	
	players.push(i++);
	console.log(players);
});