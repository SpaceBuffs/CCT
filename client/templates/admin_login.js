Template.admin_login.helpers({
  notLoggedIn: function() {
    return !Meteor.user();
  },
  adminAccountNotExist: function() {
    return !Meteor.users.findOne({
      'profile.admin': true
    });
  }
});

Template.admin_login.events({
  'submit #sign-in-form': function(e) {
    var email, password;
    e.preventDefault();
    email = $('input[name="email"]').val();
    password = $('input[name="password"]').val();
    if (Meteor.users.findOne({
      'profile.admin': true
    })) {
      return Meteor.loginWithPassword(email, password);
    } else {
      return Accounts.createUser({
        email: $('input[name="email"]').val(),
        password: $('input[name="password"]').val(),
        profile: {
          admin: true
        }
      });
    }
  },
  'click .logout': function(e) {
    e.preventDefault();
    return Meteor.logout();
  }
});
