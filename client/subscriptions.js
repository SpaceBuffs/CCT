/*



*/

Meteor.subscribe('ActivitiesModel');
Meteor.subscribe('ChatModel');

Meteor.startup(function () {
  Meteor.subscribe('users')
})


