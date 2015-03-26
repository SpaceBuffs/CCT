Template._login.helpers({
  logged_in: function() {
    return Meteor.user();
  }
});

Template._login.events({
  'submit #sign-in-form': function(e) {
    var afterLogin, email, password;
    e.preventDefault();
    email = $('input[name="email"]').val();
    password = $('input[name="password"]').val();
    afterLogin = function(error) {
      if (error) {
        return alert(error);
      } else {
        return GraviTeam._go('home');
      }
    };
    if (_admin_user_exists()) {
      return Meteor.loginWithPassword(email, password, afterLogin);
    } else {
      return Accounts.createUser({
        email: email,
        password: password
      }, function(error) {
        if (error) {
          return afterLogin(error);
        }
        return becomeAdmin();
      });
    }
  },
  'click #logout': function(e) {
    e.preventDefault();
    Meteor.logout();
    return 'home';
  },
  'click #become-houston-admin': function(e) {
    e.preventDefault();
    return becomeAdmin();
  }
});

Template._login.rendered = function() {
  return $(window).unbind('scroll');
};