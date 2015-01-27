/*   
  Event handler to the signIn template
  Catch the form submission and retrieve
  Check if the email and the password are valid.

*/
Template.signIn.events({
    'submit #signInForm': function(e, t) {
        e.preventDefault();

        var signInForm = $(e.currentTarget),
            email = trimInput(signInForm.find('.email').val().toLowerCase()),
            password = signInForm.find('.password').val();

        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {
            Meteor.loginWithPassword(email, password, function(err) {
                if (err) {
                    Session.set('alert', 'We\'re sorry but these credentials are not valid.');
                } else {
                    Sesson.set('alert', 'Welcome back to GraviTeam!');
                }
            });
        }
        return false;
    },
    'click #showForgotPassword': function(e, t) {
        Session.set('showForgotPassword', true);
        return false;
    },
});

/*
 signUp template: 
                 catch and prevent the form submission.
 purpose: 
        retrieve the value of each input and check them with our validators 

        if then, call the Accounts.createUser function with a callback that will 
        tell us if the email is already used

        if error occurred and account is created, the user will be automatically logged in

*/

Template.signUp.events({
    'submit #signUpForm': function(e, t) {
        e.preventDefault();

        var signUpForm = $(e.currentTarget),
            email = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase()),
            password = signUpForm.find('#signUpPassword').val(),
            passwordConfirm = signUpForm.find('#signUpPasswordConfirm').val();

        if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {
            Accounts.createUser({email: email, password: password}, function(err) {
                if (err) {
                    if (err.message === 'Email already exists. [403]') {
                        Session.set('alert', 'We\'re sorry but this email is already used.');
                    } else {
                        Session.set('alert', 'We\'re sorry but something went wrong.');
                    }
                } else {
                    Session.set('alert', 'Congrats! You\'re now joined to the GraviTeam CCT!');
                }
            });
        }
        return false;
    },
});

/*   
this function is a helper function and returns the value 
of the sessions on the @user_validoter functions 
*/

Template.alert.helpers({
    alert: function() {
        return Session.get('alert');
    }
});

/* 
  Calling the Meteor.logout function that disconnect users from the application and display a message.  
  Click on the sign out link, the sign in and sign up form shoulld appear.

*/ 

Template.signOut.events({
    'click #signOut': function(e, t) {
        Meteor.logout(function() {
            Session.set('alert', 'We Hope you enjoyed the experimente for comments click here');
        });
        return false;
    }
});

/* 

*/ 

Template.forgotPassword.events({
    'submit #forgotPasswordForm': function(e, t) {
        e.preventDefault();
    }
});