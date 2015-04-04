/*



*/

Meteor.subscribe('ActivitiesModel');
Meteor.subscribe('ChatModel');
Meteor.subscribe('admin');
Meteor.subscribe('adminUser');

Meteor.startup(function () {
  Meteor.subscribe('users')
})


