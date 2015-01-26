<<<<<<< HEAD
Template.graviteam.logged_in = function(){
=======
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
>>>>>>> 91ecfe493fdf084a37d6b537c73081adcc5ff9bf
    return Meteor.user();
  };
