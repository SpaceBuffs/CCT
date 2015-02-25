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
ChatModel = new Mongo.Collection('chatMessage');

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
    chatMessage: function () {
		return ChatModel.find({});
	}
  });
  

  //timeline functionality defined here: sort each activity in order by start_date,
  //and only return the activities defined in a date range (hard coded for now)
  var stop = new Date(2020, 0, 0);
  var start = new Date(1970, 0, 0);
  Template.timeline.events({
	"submit .new-timerange": function(event){ 
	var yy = event.target.StartYear.value;
	var mm = event.target.StartMonth.value-1;
	var hh = event.target.StartHour.value;
	var dd = event.target.StartDay.value;
	var hms = event.target.StartHMS.value;
	start = new Date(yy,mm,hh,dd);
	var yy = event.target.StopYear.value;
	var mm = event.target.StartMonth.value-1;
	var hh = event.target.StopHour.value;
	var dd = event.target.StopDay.value;
	var hms = event.target.StopHMS.value;
	stop = new Date(yy,mm,hh,dd);

	event.target.StartYear.value = "";
	event.target.StartMonth.value = "";
	event.target.StartHour.value = "";
	event.target.StartDay.value = "";
	event.target.StartHMS.value = "";
	event.target.StopYear.value = "";
	event.target.StopMonth.value = "";
	event.target.StopHour.value = "";
	event.target.StopDay.value = "";
	event.target.StopHMS.value = "";

	return false;
  }});

  Template.timeline.activities = function(){  
	return ActivitiesModel.find({"start_date": {$gt: start, $lt: stop}},{sort:{"start_date": 1}});
  }
  Template.chat.chatMessage = function(){
	  return ChatModel.find();
  }

  //submit a new activity
  Template.aedactivity.events({
	"submit .new-activity": function(event){
	var instrument = event.target.instrument.value;
	var experiment = event.target.experiment.value;
	var startdate = event.target.startdate.value;
	var duration = event.target.duration.value;
	var notes = event.target.notes.value;
	
	ActivitiesModel.insert({
	instrument: instrument,
	createdAt : new Date(),
	experiment: experiment,
	start_date: new Date(startdate),
	duration: duration,
	notes:notes
        });

       //refresh form if submit is successful
       event.target.instrument.value = "";
       event.target.experiment.value = "";  
       event.target.startdate.value = "";
       event.target.duration.value = "";
       event.target.notes.value = "";

       alert("Activity Added!");
       window.location = "/timeline";
       return false;
  }});
  
   Template.chat.events({
	"submit .new-chatMessage": function(event){
	var chatMessage = event.target.chatMessage.value;
	
	ChatModel.insert({
		chatMessage: chatMessage,
		createdAt : new Date()
        });

       //refresh form if submit is successful
       event.target.chatMessage.value = "";

       alert("Chat pushed!");
       return false;
  }});

  //update and delete activities
  Template.activity.events({
    "submit .update_activity_form": function(event){
	var instrument = event.target.instrument.value;
	var experiment = event.target.experiment.value;
	var startdate = event.target.startdate.value;
	var duration = event.target.duration.value;
	var notes = event.target.notes.value;
        ActivitiesModel.update({_id:this._id},{$set: 
          {
	  instrument: instrument,
	  experiment: experiment,
	  start_date: new Date(startdate),
	  duration: duration,
	  notes:notes
          }}
        );
        alert("Activity Updated!");
	return false;
    },
    "click .delete": function(){
      var c = confirm("Delete Activity?");
      if (c) {
	alert("Activity Deleted!");
        ActivitiesModel.remove(this._id); 
      }
      else {
	alert("Activity Unmodified."); 
      }
      //return false;
     }
  });
} //end client code



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
