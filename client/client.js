Users = new Meteor.Collection('users');

Meteor.startup(function() {
  Meteor.subscribe('onlines');
});

GameStream.on('start', function(play, turn, weapon) {
  if(play) {
    if(!Session.get('play')) {
      console.log("Weapon: %s | Turn: %s | Play: %s", weapon, turn, play);
      Session.set('weapon', weapon);
      Session.set('play', play);
      Session.set('turn', turn);
    }
  } else {
    if(!Session.get('play')) {
      alert("Sorry, you can't enter on this game.");
      Session.set('username', null);
    }
  }
});

GameStream.on('update', function(weapon, row, col) {
  if(Session.get('play')) {
    var board = $('.gameboard');
    var target = board.find('.row[data-row="'+ row +'"]');
    target = target.find('.col[data-col="'+ col +'"]');
    target.html('<i class="'+ weapon +'"></i>');
  }
});

Template.userInfo.events({
  "submit .form": function(event) {
    var user = $(event.target).find('.input').val();
    console.log("Username: %s", user);
    Session.set('username', user);
    GameStream.emit('initialize', user);
    event.preventDefault();
  }
});

Template.userInfo.onlines = function() {
  return Users.find({});
};

Template.userInfo.username = function() {
  return Session.get('username');
};

Template.gameBoard.events({
  "click .col": function(event) {
    if(Session.get('username')) {
      var weapon = Session.get('weapon');
      var col = $(event.target);
      var row = col.closest('.row');
      GameStream.emit('shoot', weapon, row.data('row'), col.data('col'));
    } else {
      alert("First you need to enter your name!");
      $('.input').focus();
    }
  }
});