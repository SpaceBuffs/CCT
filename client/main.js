//--------------------------------------------------------------

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

  Template.Dashboard.events({
    'click .logout' : function(event){
	event.preventDefault();
	Meteor.logout();
    }
  });

  Template.register.events({
    'submit register-form' : function(event, template) {
      console.log('submit registration form.');
      event.preventDefault();
      var emailVar = template.find('#account-email').value;
      var passwordVar = template.find('#account-password').value;
	// With Accounts.CreateUser, the passwrod is auto encrypted and the 
	//user is automatically logged in.
      Accounts.createUser({email: emailVar, password : passwordVar});
    }
  });