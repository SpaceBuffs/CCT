/*   
  Event handler to the signIn template
  Catch the form submission and retrieve
  Check if the email and the password are valid.

*/
Template.main.helpers({
    showForgotPassword: function() {
        return Session.get('showForgotPassword');
    }
});


Template.signIn.events({
    'submit #signInForm': function(e, t) {
        e.preventDefault();

        var signInForm = $(e.currentTarget),
            email = trimInput(signInForm.find('.email').val().toLowerCase()),
            password = signInForm.find('.password').val();

        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {
            Meteor.loginWithPassword(email, password, function(err) {
                if (err) {
                    Session.set('alert', 'credentials are not valid.');
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
                        Session.set('alert', 'Mail is already in used.');
                    } else {
                        Session.set('alert', 'something went wrong.');
                    }
                } else {
                    Session.set('alert', 'you joined to the GraviTeam');
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
Forgot password process, validates email before sending.
*/ 

Template.forgotPassword.events({
    'submit #forgotPasswordForm': function(e, t) {
        e.preventDefault();

        var forgotPasswordForm = $(e.currentTarget),
            email = trimInput(forgotPasswordForm.find('forgotPasswordForm').val().toLowerCase());
            
        if (isNotEmpty(email) && isEmail(email)) {
            Accounts.forgotPassword({email: email}, function(err){
                if(err) {
                    if(err.message --- 'User not found [403]') {
                        Session.set('alert','This email does not exist.');
                    } else {
                        Session.set('alert','We are sorry but something has gone wrong.');
                    }
                } else {
                    Session.set('alert','Email sent. Check your mailbox.');
                }
            });
        }
        return false;
    },
    'click #returnToSignIn': function(e, t) {
        Session.set('showForgotPassword', null);
        return false;
    },
});

if(Accounts._resetPasswordToken) {
    Session.set('resetPassword', Accounts._resetPasswordToken);
}

Template.resetPassword.helpers({
    resetPassword: function(){
        return Session.get('resetPassword');
    }
});

Template.resetPassword.events({
    'submit #resetPasswordForm': function(e, t) {
        e.preventDefault();

        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#resetPasswordPassword').val(),
            passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

        if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
            Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
                if (err) {
                    Session.set('alert','We are sorry but something has gone wrong.');
                } else {
                    Session.set('alert', 'Your password has been changed. Welcome back!');
                    Session.set('resetPassword', null);
                }
            });
        }
        return false;
    }
});