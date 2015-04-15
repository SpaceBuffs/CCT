/*   
  Event handler to the signIn template
  Catch the form submission and retrieve
  Check if the email and the password are valid.
*/
/*
Template.main.helpers({
    showForgotPassword: function() {
        return Session.get('showForgotPassword');
    }
});
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
                    Session.set('alert', 'Credentials are not valid.');
                    return false; //***
                } else {
                    Sesson.set('alert', 'Welcome back to GraviTeam!');
		    set_session(); //***
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

set_session = function() {
    //****************
    //find out if a project manager currently exists.
    var pmexists = false;
    var pm = "none";
        Meteor.users.find({}).forEach(function(myDocument) {
            if (myDocument.profile.isAdmin == true) { 
                pmexists = true; 
                pm = myDocument.profile.Name;
            };
        });
    //if no PM exists, ask the user if they want to be one and start a new session.
    if (pmexists == false) {
        if (confirm("Currently no one is Project Manager for this session.\nDo you want to be Project Manager?")) {
            Meteor.users.update(Meteor.userId(),{$set:{'profile.isAdmin': true}});
            var session_time = new Date();
            var pm = Meteor.user().profile.Name; //***won't work if not initialized!
            //alert(session_time);
            //alert(pm);
            SessionsModel.insert({
                createdAt: session_time,
                sec: Date.parse(session_time), //for easier sorting
                ProjectManager: pm
            });
        } else { //else, just let them log in without starting a session.
            Meteor.users.update(Meteor.userId(),{$set:{'profile.isAdmin': false}});
        }
    } //if PM exists, let the user know.
    else {
        alert("Currently "+pm+" is project manager.\nYour activities will need to be approved by them.");
    }
    //****************
};

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
            name = signUpForm.find('#signUpName').val(),
            email = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase()),
            password = signUpForm.find('#signUpPassword').val(),
            passwordConfirm = signUpForm.find('#signUpPasswordConfirm').val();
	    //make sure they provide a name! and initialize admin as false
            if (isNotEmpty(name) && isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {
                Accounts.createUser({'profile.name': name, email: email, password: password, 'profile.isAdmin': false}, function(err) {
                     if (err) { //***changed username to profile.name
                          if (err.message === 'Email already exists. [403]') {
                               Session.set('alert', 'Email already exists.');
            		       return false; //***
                           } else {
                               Session.set('alert', 'Something went wrong. Please try again.');
           	               return false; //***
                           }
                    } else {
                        Session.set('alert', 'Welcome to GraviTeam!'); //does get called
                        set_session(); //***
                    }
                });
            } //endif
            return false;
      }
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
	    if (Meteor.user().profile.isAdmin == true) {
	       if (confirm("If you sign out, you will no longer be Project Manager and your session will end.\nContinue?")) {
		    Meteor.users.update(Meteor.userId(),{$set:{'profile.isAdmin': false}});
		    //Meteor.users.update(Meteor.userId(),{$set:{'profile.Name': false}}); No! what?
	       } else {
		    return false;
	       }
	    }
	    Meteor.logout(function() {
		Session.set('alert', 'You have been logged out.');
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
            //email= signInForm.find('.email').val().toLowerCase();
            email = trimInput(forgotPasswordForm.find('forgotPasswordForm').val().toLowerCase());
            //password= signInForm.find('.password').val();

        if (isNotEmpty(email) && isEmail(email)) {
                Accounts.forgotPassword({email: email}, function(err){
                //Accounts.changePassword(password, 123456, function(err){
                if(err) {
                    if(err.message --- 'User not found [403]') {
                        Session.set('alert','Email does not exist.');
                    } else {
                        Session.set('alert','Something went wrong. Please try again.');
                    }
                } else {

                    Session.set('alert', 'Email sent, please check your email.');
                }
            });
        }
        return false;
    }
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
