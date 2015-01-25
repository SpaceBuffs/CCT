/*
Collaborative Campaign Tool
GRAVITEAM by SPACEBUFFS

Chris Acuna, Heather Dykstra, Sierra Flynn, Semere Ghebrecristos, Hope Sanford, Josh Weaver

main.js is the file where we keep track of our functions

Version 2.01
1/25/2015
*/
//--------------------------------------------------------------
/*
  Template.login.events({
    'submit login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var emailVar = t.find('#login-email').value;
      var passwordVar = t.find('#login-password').value;
        // Trim and validate your fields here.... 
        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(emailVar, passwordVar);
     }
  });
*/
  Template.graviteam.logged_in = function(){
    return Meteor.user();
  };

  Template.Dashboard.events({
    'click #logout' : function(event, template){
	event.preventDefault();
	Meteor.logout();
    }  
  });

  Template.Register.events({
    'submit #registerform' : function(event, template) {
      //console.log('submit registration form.');
      event.preventDefault();
      var registerform = $(event.currentTarget),
        email = trimInput(registerform.find('#signinEmail').val().toLowerCase()),
        password = registerform.find('#signinPassword').val(),
        passwordConfirm = registerform.find('#signinPasswordConfirm').val();
	
	  if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {
     // var passwordVar = template.find('#account-password').value;
	// With Accounts.CreateUser, the passwrod is auto encrypted and the 
	//user is automatically logged in.
     //Accounts.createUser({email: emailVar, password : passwordVar});
    	Accounts.createUser({email: email, password: password}, function(err) {
          if (err) {
            if (err.message === 'Email already exists. [403]') {
              console.log('We are sorry but this email is already used.');
            } else {
              console.log('We are sorry but something went wrong.');
            }
          } else {
            console.log('Congratulations new SpaceBuff, you\'re in!');
          }
      });

    }
    return false;
	}
  });

Template.Signin.events({
  'submit #signinForm': function(event, template) {
    event.preventDefault();

    var signinForm = $(event.currentTarget),
          email = trimInput(signinForm.find('.email').val().toLowerCase()),
          password = signinForm.find('.password').val();

    if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {

      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {
          console.log('These credentials are not valid.');
        } else {
          console.log('Welcome back SpaceBuff!');
        }
      });

    }
    return false;
  },
});

Template.Signout.events({
  'click #signOut': function(event, template) {

    Meteor.logout(function() {
      console.log('Bye SpaceBuff! Come back whenever you want!');
    });

    return false;
  }
});

trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
    if (value && value !== ''){
        return true;
    }
    console.log('Please fill in all required fields.');
    return false;
};

isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    console.log('Please enter a valid email address.');
    return false;
};

isValidPassword = function(password) {
    if (password.length < 6) {
        console.log('Your password should be 6 characters or longer.');
        return false;
    }
    return true;
};

areValidPasswords = function(password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirm) {
        console.log('Your two passwords are not equivalent.');
        return false;
    }
    return true;
};