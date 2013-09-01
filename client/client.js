Meteor.startup(function() {
  Session.setDefault('player', 1);
  Deps.autorun(function() {
    Meteor.subscribe('shoot');
  });
});

Template.tictac.events({
  "click .col": function(event) {
    var x = $(event.target);
    var y = x.closest('.row');
    x.text('X');
    console.log("[Row: %s | Col: %s]", y.data('row'), x.data('col'));
  }
});