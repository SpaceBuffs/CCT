
/*
Collaborative Campaign Tool
GRAVITEAM by SPACEBUFFS

Chris Acuna, Heather Dykstra, Sierra Flynn, Semere Ghebrecristos, Hope Sanford, Josh Weaver

main.js is the file where we keep track of our functions

Version 3.0
4/10/2015
*/
//--------------------------------------------------------------


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
