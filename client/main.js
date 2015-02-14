
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
}

//Template.timeline.activities = function(){
//  return ActivitiesModel.find({});
//} ***moved to global.js. The below may need to be moved there too.
// Shouldn't this be placed in timeline.js?

Template.timeline.events({
  'click #new_activity': function() {
    ActivitiesModel.activities.create();
   },
   'click .delete_activity': function(){
    if(confirm("Are you sure you want to delete this activity?"))
       {
	  ActivitiesModel.activities.delete(this._id)
       }
   }
});
