game = new Meteor.Stream('game');

Template.userInfo.events({
  "submit .form": function(event) {
    var user = $(event.target).find('input').val();
    console.log("Username: %s", user);
    Session.set('username', user);
    game.emit('start', user);
    event.preventDefault();
  }
});

game.on('weapon', function(weapon) {
  console.log("Weapon: %s", weapon);
  Session.set('weapon', weapon);
});

Template.userInfo.username = function() {
  return Session.get('username');
};

Template.gameBoard.events({
  "click .col": function(event) {
    if(Session.get('username')) {
      var weapon = Session.get('weapon');
      var x = $(event.target);
      var y = x.closest('.row');
      x.html('<i class="'+ weapon +'"></i>');
      console.log("[Row: %s | Col: %s]", y.data('row'), x.data('col'));
    } else {
      alert("First you need to enter your name!");
      $('.input').focus();
    }
  }
});