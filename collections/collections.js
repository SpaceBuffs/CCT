/*
Collaborative Campaign Tool
GRAVITEAM by SPACEBUFFS

Chris Acuna, Heather Dykstra, Sierra Flynn, Semere Ghebrecristos, Hope Sanford, Josh Weaver

global.js is the file where we keep track of our collections

Version 2.02
1/25/2015
*/
Messages = new Meteor.Collection('messages');
//UserAccounts = new Mongo.Collection('user');
ActivitiesModel = new Mongo.Collection('activities');
ChatModel = new Mongo.Collection('chatMessages');

/*
ActivitiesModel.insert({"instrument": "Spectrometer", "createdAt": new Date(), "experiment": "spectroscopy", "start_date": new Date(2015, 1, 1), "duration": "40:00:00" });
ActivitiesModel.insert({"instrument": "CDA", "createdAt": new Date(), "experiment": "dust collection", "start_date": new Date(2015, 2, 1), "duration": "40:00:00" });
ActivitiesModel.insert({ "instrument": "Scatterometer", "createdAt": new Date(), "experiment": "scatter", "start_date": new Date(2015, 0, 1), "duration": "40:00:00" });
*/

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    activities: function () {
      return ActivitiesModel.find({}); //might need to do db.activities.find({});
    }
    });
   Template.body.helpers({
    //Heather added to test something
    chatMessages: function () {
		return ChatModel.find({});
	}
  });
//--------------------------chat--------------------------------------------
  Template.chat.chatMessages = function(){
	  return ChatModel.find({});
  };

  /*
   Template.chat.events({
	"submit .new-chatMessage": function(event){
	var chatMessage = event.target.chatMessage.value;
	
	ChatModel.insert({
		chatMessage: chatMessage,
		createdAt : new Date(),
        user_name : Meteor.user().username
        });

       //refresh form if submit is successful
       event.target.chatMessage.value = "";

       //alert("Chat pushed!");
       return false;
  }});*/

//-----------------------activities--------------------------------------
  /*  Template.timeline.activities = function(){  
	return ActivitiesModel.find({"start_date": {$gt: start, $lt: stop}},{sort:{"start_date": 1}});
  }*/

  Template.timeline.activities = function(){  
	return ActivitiesModel.find({},{sort:{"startdate": 1}});
  };

  //submit a new activity
  Template.aedactivity.events({
	"submit .new-activity": function(event){
	var instrument = event.target.instrument.value;
	var experiment = event.target.experiment.value;
	var startdate = event.target.startdate.value;
	var stopdate = event.target.stopdate.value;
	//var duration = event.target.duration.value;
	var notes = event.target.notes.value;

	ActivitiesModel.insert({
	instrument: instrument,
	createdAt: new Date(),
	experiment: experiment,
	startdate: new Date(startdate),
	stopdate: new Date(stopdate),
	notes:notes
        });

/*
       //refresh form if submit is successful
       event.target.instrument.value = "";
       event.target.experiment.value = "";  
       event.target.startdate.value = "";
       event.target.stopdate.value = "";
       //event.target.duration.value = "";
       event.target.notes.value = "";
*/
       alert("Activity Added!");
       //window.location = "/timeline";
       return false;
  }});

  //update and delete activities
  Template.activity.events({
    "submit .update_activity_form": function(event){
	var instrument = event.target.instrument.value;
	var experiment = event.target.experiment.value;
	var startdate = event.target.startdate.value;
	var stopdate = event.target.stopdate.value;
	//var duration = event.target.duration.value;
	var notes = event.target.notes.value;
        ActivitiesModel.update({_id:this._id},{$set: 
          {
	  instrument: instrument,
	  experiment: experiment,
	  startdate: new Date(startdate),
	  stopdate: new Date(stopdate),
	  //duration: duration,
	  notes:notes
          }}
        );
        alert("Activity Updated!");
        //window.close();
        window.opener.location.reload();
	return false;
    },
    "click .delete": function(){
      var c = confirm("Delete Activity?");
      if (c) {
        ActivitiesModel.remove(this._id); 
        alert("Activity Deleted!");
	window.close();
        window.opener.location.reload();
      }
      else {
	alert("Activity Unmodified."); 
      }
      //return false;
     }
  });

//-----------------------------------------------profile

Template.profile.helpers({
    name: function() {return Meteor.users.find({}, {fields: {'name':1}})},
    username: function() {return Meteor.user().username},
    email: function() {return Meteor.user().emails[0].address},
    missions: function() {return Meteor.users.find({}, {fields: {'missions':1}})},
    isAdmin: function() {return Meteor.users.find({}, {fields: {'isAdmin':1}})}

});

Template.editprofile.events({
    "submit .user_info": function(event){
    alert("step 1");
    var isAdmin = event.target.isAdmin.value;
    
    Meteor.users.update({_id:this._id},{ $set:{'isAdmin':isAdmin}
                        
       // missions : missions,
    });
                     
    //refresh form if submit is successful
    //event.target.accountType.value = "";
    
    alert("updated user");
    return false;
}});

Template.editprofile.rendered=function() {
  alert("step 0");
};

//------------end profile code

} //-----------------------------------------------------end client code



/*
if (Meteor.isServer) {
ActivitiesModel.allow({
  update:function(userId, doc, fields, modifier) {
    //anyone can update the collection
    //you can write some filters to restrict the updating to only owner of the document
    return true;
    }
});
}*/ //THIS BROKE IT
