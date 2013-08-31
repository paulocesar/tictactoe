if (Meteor.isClient) {
  Template.tictac.events({
    "click .col": function(event) {
      var x = $(event.target);
      var y = x.closest('.row');
      x.text('X');
      console.log("Row: %s | Col: %s", y.data('row'), x.data('col'));
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log('TicTacToe up and running!');
  });
}
